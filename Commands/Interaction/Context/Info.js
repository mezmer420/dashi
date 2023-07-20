const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
} = require("discord.js")

module.exports.category = "Context"

module.exports.data = new ContextMenuCommandBuilder()
	.setName("Info")
	.setType(ApplicationCommandType.User)

module.exports.run = async ({ client, interaction, Infraction }) => {
	const { guild, targetId } = interaction

	const target = await guild.members.cache.get(targetId)

	const avatar = target.user.displayAvatarURL({ size: 4096, dynamic: true })

	const createdTime = new Date(
		target.user.createdTimestamp + 5 * 3600000
	).toLocaleString()

	const joinedTime = new Date(
		target.joinedTimestamp + 5 * 3600000
	).toLocaleString()

	const nick = target.nickname ? target.nickname : target.user.username

	const boostingTime = target.premiumSinceTimestamp
		? new Date(target.premiumSinceTimestamp + 6 * 3600000).toLocaleString()
		: "Not boosting"

	const bot = target.user.bot === true ? "Yes" : "No"

	const infractionData = await Infraction.findAll({
		where: { memberid: target.id },
	})

	let infractions = []

	for (let obj of infractionData) {
		infractions.push(obj)
	}

	const embed = new EmbedBuilder()
		.setColor("Random")
		.setAuthor({ name: `${target.user.tag}`, iconURL: `${avatar}` })
		.addFields(
			{ name: "User ID", value: `${target.id}`, inline: true },
			{ name: "Server Nickname", value: `${nick}`, inline: true },
			{ name: "Bot", value: `${bot}`, inline: true },
			{
				name: "Account Created at",
				value: `${createdTime}`,
				inline: true,
			},
			{
				name: "Joined Server at",
				value: `${joinedTime}`,
				inline: true,
			},
			{
				name: "Highest Role",
				value: `${target.roles.highest}`,
				inline: true,
			},
			{
				name: "Boosting Server Since",
				value: `${boostingTime}`,
				inline: true,
			},
			{
				name: "Infractions",
				value: `${infractions.length}`,
				inline: true,
			}
		)
		.setThumbnail(avatar)

	const memberPerms = (await target.permissions).toArray()

	if (memberPerms.length > 0) {
		const perms = memberPerms.join(", ")
		embed.addFields({
			name: "Server Permissions",
			value: `${perms}`,
			inline: false,
		})
	}

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
