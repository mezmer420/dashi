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
						process.env.announcementsChannel
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

					function toOrdinalSuffix(num) {
						const int = parseInt(num),
							digits = [int % 10, int % 100],
							ordinals = ["st", "nd", "rd", "th"],
							oPattern = [1, 2, 3, 4],
							tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19]

						return oPattern.includes(digits[0]) &&
							!tPattern.includes(digits[1])
							? int + ordinals[digits[0] - 1]
							: int + ordinals[3]
					}

					const currentDate = date.getDay()

					const firstDate = new Date(currentYear, month - 1, day)
					const secondDate = new Date(
						currentYear,
						currentMonth - 1,
						currentDate
					)

					const oneDay = 24 * 60 * 60 * 1000

					const diffDays = Math.round(
						(firstDate - secondDate) / oneDay
					)

					let dayCount = 365

					if (new Date(currentYear, 1, 29).getDate() === 29) {
						dayCount = 366
					}

					let remDays = diffDays
					let wishYear = currentYear

					if (diffDays <= 0) {
						remDays = diffDays + dayCount
						wishYear = currentYear + 1
					}

					const age = toOrdinalSuffix(wishYear - year)

					const embed = new EmbedBuilder()
						.setColor("#9BDBF5")
						.setDescription(
							`Today is ${member}'s **${age}** birthday! 🎂`
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
