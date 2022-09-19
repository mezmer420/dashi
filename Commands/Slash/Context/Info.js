const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
} = require("discord.js")

module.exports.data = new ContextMenuCommandBuilder()
	.setName("Info")
	.setType(ApplicationCommandType.User)

module.exports.category = "Info"

module.exports.run = async ({ client, interaction, Infraction }) => {
	await interaction.deferReply().catch((err) => {
		console.log(err)
	})

	const { guild, targetId } = interaction

	const target = await guild.members.cache.get(targetId)

	const avatar = target.user.displayAvatarURL({ size: 4096, dynamic: true })

	const createdts = new Date(target.user.createdTimestamp + 5 * 3600000)
	const createdtime = createdts.toLocaleString()

	const joinedts = new Date(target.joinedTimestamp + 5 * 3600000)
	const joinedtime = joinedts.toLocaleString()

	const nick = target.nickname ? target.nickname : target.user.username

	const boostingts = new Date(target.premiumSinceTimestamp + 6 * 3600000)
	const boostingtime = target.premiumSinceTimestamp
		? boostingts.toLocaleString()
		: "Not boosting"

	const bot = target.user.bot === true ? "Yes" : "No"

	const infractiondata = await Infraction.findAll({
		where: { memberid: target.id },
	})

	let infractions = []

	for (let obj of infractiondata) {
		infractions.push(obj)
	}

	const Embed = new EmbedBuilder()
		.setColor("Random")
		.setAuthor({ name: `${target.user.tag}`, iconURL: `${avatar}` })
		.addFields(
			{ name: "User ID", value: `${target.id}`, inline: true },
			{ name: "Server Nickname", value: `${nick}`, inline: true },
			{ name: "Bot", value: `${bot}`, inline: true },
			{
				name: "Account Created at",
				value: `${createdtime}`,
				inline: true,
			},
			{
				name: "Joined Server at",
				value: `${joinedtime}`,
				inline: true,
			},
			{
				name: "Highest Role",
				value: `${target.roles.highest}`,
				inline: true,
			},
			{
				name: "Boosting Server Since",
				value: `${boostingtime}`,
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
		Embed.addFields({
			name: "Server Permissions",
			value: `${perms}`,
			inline: false,
		})
	}

	return await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
