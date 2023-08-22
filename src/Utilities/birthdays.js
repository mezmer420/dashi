const { EmbedBuilder } = require("discord.js")
const cron = require("node-cron")

module.exports.run = async ({ client, Systems, Birthday }) => {
	const guilds = client.guilds.cache

	cron.schedule(
		"0 8 * * *",
		() => {
			guilds.forEach(async (g) => {
				const data = await Birthday.findAll({ where: { Guild: g.id } })

				if (!data) return

				data.forEach(async (b) => {
					const announcements = await client.channels.cache.get(
						"946442711936938034"
					)

					const member =
						g.members.cache.get(b.User) || "Unknown User #0000"
					const day = b.Day
					const month = b.Month
					const year = b.Year

					const date = new Date()
					const currentDay = date.getDate()
					const currentMonth = date.getMonth() + 1
					const currentYear = date.getFullYear()

					const age = currentYear - year

					const embed = new EmbedBuilder()
						.setColor("#9BDBF5")
						.setDescription(
							`Today is ${member}'s birthday! (${age})! 🎂`
						)

					if (month === currentMonth && day === currentDay) {
						const getBirthdays = await Systems.findOne({
							where: { system: "Birthdays" },
						})

						if (getBirthdays.online === false) return

						announcements
							.send({
								content: `@everyone`,
								embeds: [embed],
							})
							.catch((err) => {
								console.log(err)
							})
							.then((msg) => {
								msg.react("🎂").catch((err) => {
									console.log(err)
								})
							})
					}
				})
			})
		},
		{
			scheduled: true,
			timezone: "America/Montreal",
			// timezone: "America/Bahia_Banderas"
		}
	)
}
