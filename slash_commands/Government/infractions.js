const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

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

		let infractions = []

		for (let obj of data) {
			infractions.push(obj)
		}

		const Embed = new EmbedBuilder()
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

		infractions = infractions.sort(function (b, a) {
			return a.time - b.time
		})

		infractions = infractions.filter(function BigEnough(value) {
			return value.time > 0
		})

		let pos = 0

		for (let obj of infractions) {
			pos++
		}

		let desc = ""

		for (let i = 0; i < infractions.length; i++) {
			const nature = infractions[i].nature
			let time = infractions[i].time
			time = new Date(time + 3600000)
			time = time.toLocaleString()
			const infractionid = infractions[i].infractionid
			const warnerid = infractions[i].warnerid

			const rank = `${i + 1}.`

			desc += `${rank} Nature: **${nature}**\nTime: ${time} EST\nIssued By: <@${warnerid}>\nInfraction ID: ${infractionid}\n\n`
		}

		Embed.setDescription(desc)

		if (Embed.description === "") {
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

		return await interaction
			.editReply({
				embeds: [Embed],
			})
			.catch((err) => {})
	} else if (!member) {
		const data = await Infraction.findAll({})

		let infractions = []

		for (let obj of data) {
			infractions.push(obj)
		}

		const Embed = new EmbedBuilder()
			.setColor(defaultColor)
			.setTitle("All Infractions")
			.setThumbnail(
				"https://rosenblumlaw.com/wp-content/uploads/2019/08/shutterstock_1174972870-1024x683.jpg"
			)
			.setFooter({ text: "Sorted by newest to oldest" })
			.setTimestamp()

		infractions = infractions.sort(function (b, a) {
			return a.time - b.time
		})

		infractions = infractions.filter(function BigEnough(value) {
			return value.time > 0
		})

		let pos = 0

		for (let obj of infractions) {
			pos++
		}

		let desc = ""

		for (let i = 0; i < infractions.length; i++) {
			const memberId = infractions[i].memberid
			const nature = infractions[i].nature
			let time = infractions[i].time
			time = new Date(time + 3600000)
			time = time.toLocaleString()
			const infractionid = infractions[i].infractionid
			const warnerid = infractions[i].warnerid

			const rank = `${i + 1}.`

			desc += `${rank} Member: <@${memberId}>\nNature: **${nature}**\nTime: ${time} EST\nIssued By: <@${warnerid}>\nInfraction ID: ${infractionid}\n\n`
		}

		Embed.setDescription(desc)

		if (Embed.description === "") {
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

		return await interaction
			.editReply({
				embeds: [Embed],
			})
			.catch((err) => {})
	}
}
