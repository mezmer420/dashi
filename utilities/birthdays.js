const { EmbedBuilder } = require("discord.js")
const cron = require("node-cron")

module.exports = async ({ client, Systems, Birthday }) => {
	const Guilds = client.guilds.cache

	cron.schedule(
		`0 8 * * *`,
		() => {
			Guilds.forEach(async (g) => {
				const data = await Birthday.findAll({ where: { Guild: g.id } })

				if (!data) return

				data.forEach(async (b) => {
					const Channel = await client.channels.cache.get(
						"946442711936938034"
					)

					const Member =
						g.members.cache.get(b.User) || "Unknown User #0000"
					const Day = b.Day
					const Month = b.Month
					const Year = b.Year

					const date = new Date()
					const currentDay = date.getDate()
					const currentMonth = date.getMonth() + 1
					const currentYear = date.getFullYear()

					const age = currentYear - Year

					const Embed = new EmbedBuilder()
						.setColor("#9BDBF5")
						.setDescription(
							`Today is ${Member}'s birthday! (${age})! 🎂`
						)

					if (Month === currentMonth && Day === currentDay) {
						const getBirthdays = await Systems.findOne({
							where: { system: "Birthdays" },
						})
					
						if (getBirthdays.online === false) return

						Channel.send({
							content: `@everyone`,
							embeds: [Embed],
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
