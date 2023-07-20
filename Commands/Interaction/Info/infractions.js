const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js")

module.exports.category = "Info"

module.exports.data = new SlashCommandBuilder()
	.setName("infractions")
	.setDescription(
		"View a member's infractions; leave blank to view all infractions"
	)
	.addUserOption((option) =>
		option
			.setName("member")
			.setDescription("Member to view infractions of")
			.setRequired(false)
	)

module.exports.run = async ({
	client,
	interaction,
	Infraction,
	defaultColor,
}) => {
	const member = interaction.options.getMember("member")
	const user = interaction.options.getUser("member")

	if (member) {
		const data = await Infraction.findAll({
			where: { memberid: member.id },
		})

		const infractions = data
			.sort((a, b) => b.time - a.time)
			.filter((value) => value.time > 0)

		if (infractions.length === 0) {
			return await interaction
				.editReply({
					embeds: [
						new EmbedBuilder()
							.setColor(defaultColor)
							.setAuthor({
								name: `${user.tag} is an outstanding citizen!`,
								iconURL: `${member.displayAvatarURL({
									size: 4096,
									dynamic: true,
								})}`,
							})
							.setThumbnail(
								"https://orangeleaders.com/wp-content/uploads/2020/04/wow-left-red1.png"
							),
					],
				})
				.catch((err) => {})
		}

		const embed = new EmbedBuilder()
			.setColor(defaultColor)
			.setAuthor({
				name: `${user.tag}'s Infractions`,
				iconURL: `${member.displayAvatarURL({
					size: 4096,
					dynamic: true,
				})}`,
			})
			.setThumbnail(
				"https://rosenblumlaw.com/wp-content/uploads/2019/08/shutterstock_1174972870-1024x683.jpg"
			)
			.setFooter({ text: "Sorted by newest to oldest" })
			.setTimestamp()
		let desc = ""

		infractions.forEach((infraction, index) => {
			const { nature, time, infractionid, warnerid } = infraction
			const rank = `${index + 1}.`
			const formattedTime = new Date(time + 3600000).toLocaleString()

			desc += `${rank} Nature: **${nature}**\nTime: ${formattedTime} EST\nIssued By: <@${warnerid}>\nInfraction ID: ${infractionid}\n\n`
		})

		embed.setDescription(desc)

		return await interaction
			.editReply({
				embeds: [embed],
			})
			.catch((err) => {})
	} else if (!member) {
		const data = await Infraction.findAll({})

		const infractions = data
			.sort((a, b) => b.time - a.time)
			.filter((value) => value.time > 0)

		if (infractions.length === 0) {
			return await interaction
				.editReply({
					embeds: [
						new EmbedBuilder()
							.setColor(defaultColor)
							.setTitle(
								"Everyone in this server is an outstanding citizen!"
							)
							.setThumbnail(
								"https://orangeleaders.com/wp-content/uploads/2020/04/wow-left-red1.png"
							),
					],
				})
				.catch((err) => {})
		}

		const embed = new EmbedBuilder()
			.setColor(defaultColor)
			.setTitle("All Infractions")
			.setThumbnail(
				"https://rosenblumlaw.com/wp-content/uploads/2019/08/shutterstock_1174972870-1024x683.jpg"
			)
			.setFooter({ text: "Sorted by newest to oldest" })
			.setTimestamp()

		let desc = ""

		infractions.forEach((infraction, index) => {
			const { memberid, nature, time, infractionid, warnerid } =
				infraction
			const rank = `${index + 1}.`
			const formattedTime = new Date(time + 3600000).toLocaleString()

			desc += `${rank} Member: <@${memberid}>\nNature: **${nature}**\nTime: ${formattedTime} EST\nIssued By: <@${warnerid}>\nInfraction ID: ${infractionid}\n\n`
		})

		embed.setDescription(desc)

		return await interaction
			.editReply({
				embeds: [embed],
			})
			.catch((err) => {})
	}
}
