const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("user-info")
	.setDescription("View info of a member")
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("User to view info of")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction, Infractions }) => {
	const member = interaction.options.getMember("user")

	const avatar = member.user.avatarURL({ dynamic: true, size: 4096 })

	const createdts = new Date(member.user.createdTimestamp + 5 * 3600000)
	const createdtime = createdts.toLocaleString()

	const joinedts = new Date(member.joinedTimestamp + 5 * 3600000)
	const joinedtime = joinedts.toLocaleString()

	let nick = member.nickname

	if (!nick) {
		nick = `${member.user.username}`
	}

	const boostingts = new Date(member.premiumSinceTimestamp + 6 * 3600000)
	let boostingtime = boostingts.toLocaleString()

	if (!member.premiumSinceTimestamp) {
		boostingtime = "Not boosting"
	}

	let bot = "No"
	if (member.user.bot == true) {
		bot = "Yes"
	}

	const infractiondata = await Infractions.findAll({
		where: { memberid: member.id },
	})

	let infractions = []

	for (let obj of infractiondata) {
		infractions.push(obj)
	}

	const Embed = new MessageEmbed()
		.setColor("#9BDBF5")
		.setAuthor({ name: `${member.user.tag}`, iconURL: `${avatar}` })
		.addFields(
			{ name: "User ID", value: `${member.id}`, inline: true },
			{ name: "Server Nickname", value: `${nick}`, inline: true },
			{ name: "Bot", value: `${bot}`, inline: true },
			{
				name: "Account Created at",
				value: `${createdtime}`,
				inline: true,
			},
			{ name: "Joined Server at", value: `${joinedtime}`, inline: true },
			{
				name: "Highest Role",
				value: `${member.roles.highest}`,
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

	const memberPerms = (await member.permissions).toArray()

	if (memberPerms.length > 0) {
		const perms = memberPerms.join(", ").toLowerCase().replace(/_/g, " ")
		Embed.addField("Server Permissions", `${perms}`, false)
	}

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
