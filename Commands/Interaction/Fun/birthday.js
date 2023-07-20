const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

function toOrdinalSuffix(num) {
	const int = parseInt(num),
		digits = [int % 10, int % 100],
		ordinals = ["st", "nd", "rd", "th"],
		oPattern = [1, 2, 3, 4],
		tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19]

	return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
		? int + ordinals[digits[0] - 1]
		: int + ordinals[3]
}

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("birthday")
	.setDescription("Set, remove, and list birthdays")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("set")
			.setDescription("Set your birthday")
			.addIntegerOption((option) =>
				option
					.setName("month")
					.setDescription("Month of your birthday")
					.setMinValue(1)
					.setMaxValue(12)
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("day")
					.setDescription("Day of your birthday")
					.setMinValue(1)
					.setMaxValue(31)
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("year")
					.setDescription("Year of your birthday")
					.setMinValue(1900)
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand.setName("remove").setDescription("Remove your birthday")
	)
	.addSubcommand((subcommand) =>
		subcommand.setName("list").setDescription("Lists all birthdays")
	)

module.exports.run = async ({
	client,
	interaction,
	Systems,
	Birthday,
	defaultColor,
}) => {
	const getBirthdays = await Systems.findOne({
		where: { system: "Birthdays" },
	})

	if (getBirthdays.online === false) {
		return await interaction
			.editReply({
				content: "The Birthdays system is currently disabled",
			})
			.catch((err) => {})
	}

	const options = interaction.options.getSubcommand()

	switch (options) {
		case "set": {
			const date = new Date()
			const currentYear = date.getFullYear()
			const currentMonth = date.getMonth() + 1
			const currentDate = date.getDay()

			const day = interaction.options.getInteger("day")
			const month = interaction.options.getInteger("month")
			const year = interaction.options.getInteger("year")

			if (month > 12 || month < 1) {
				return await interaction
					.editReply({
						embeds: [
							new EmbedBuilder()
								.setColor("Red")
								.setDescription(
									"Your birth month value should be from `1` to `12`!"
								),
						],
					})
					.catch((err) => {})
			}

			if (day > 31 || day < 1) {
				return await interaction
					.editReply({
						embeds: [
							new EmbedBuilder()
								.setColor("Red")
								.setDescription(
									"Your birth day value should be from `1` to `31`!"
								),
						],
					})
					.catch((err) => {})
			}

			if (year >= currentYear - 10) {
				return await interaction
					.editReply({
						embeds: [
							new EmbedBuilder()
								.setColor("Red")
								.setDescription("Bro how old are you"),
						],
					})
					.catch((err) => {})
			}

			if (year > currentYear) {
				return await interaction
					.editReply({
						embeds: [
							new EmbedBuilder()
								.setColor("Red")
								.setDescription(
									"Guys we've got a time traveler in the server"
								),
						],
					})
					.catch((err) => {})
			}

			if (month === 2 && day > 29) {
				return await interaction
					.editReply({
						content: "Februrary can't have over 29 days",
					})
					.catch((err) => {})
			}

			if (month === 4 && day > 30) {
				return await interaction
					.editReply({
						content: "April doesn't have over 30 days",
					})
					.catch((err) => {})
			}

			if (month === 6 && day > 30) {
				return await interaction
					.editReply({
						content: "June doesn't have over 30 days",
					})
					.catch((err) => {})
			}

			if (month === 9 && day > 30) {
				return await interaction
					.editReply({
						content: "September doesn't have over 30 days",
					})
					.catch((err) => {})
			}

			if (month === 11 && day > 30) {
				return await interaction
					.editReply({
						content: "November doesn't have over 30 days",
					})
					.catch((err) => {})
			}

			const oneDay = 24 * 60 * 60 * 1000

			const firstDate = new Date(currentYear, month, day)
			const secondDate = new Date(currentYear, currentMonth, currentDate)

			const diffDays = Math.round((firstDate - secondDate) / oneDay) - 3

			let dayCount = 365

			if (new Date(currentYear, 1, 29).getDate() === 29) {
				dayCount = 366
			}

			let remDays
			let wishYear

			if (diffDays > 0) {
				remDays = diffDays
				wishYear = currentYear
			} else {
				remDays = diffDays + dayCount
				wishYear = currentYear + 1
			}

			const age = toOrdinalSuffix(wishYear - year)

			const data = await Birthday.findOne({
				where: {
					Guild: interaction.guild.id,
					User: interaction.member.id,
				},
			})

			let dayordays = remDays === 1 ? "day" : "days"

			if (data) {
				await Birthday.update(
					{
						Guild: interaction.guild.id,
						User: interaction.member.id,
						Day: day,
						Month: month,
						Year: year,
					},
					{
						where: {
							Guild: interaction.guild.id,
							User: interaction.member.id,
						},
					}
				)
				return await interaction
					.editReply({
						embeds: [
							new EmbedBuilder()
								.setColor(defaultColor)
								.setDescription(
									`✅ - Changed your birthday, I'll wish ${interaction.user}'s **${age}** birthday in **${remDays}** ${dayordays}, on **${month}/${day}/${wishYear}**`
								),
						],
					})
					.catch((err) => {})
			} else {
				await Birthday.create({
					Guild: interaction.guild.id,
					User: interaction.member.id,
					Day: day,
					Month: month,
					Year: year,
				})

				return await interaction
					.editReply({
						embeds: [
							new EmbedBuilder()
								.setColor(defaultColor)
								.setDescription(
									`✅ - Got it, I'll wish ${interaction.user}'s **${age}** birthday in **${remDays}** ${dayordays}, on **${month}/${day}/${wishYear}**`
								),
						],
					})
					.catch((err) => {})
			}
		}

		case "remove": {
			const data = await Birthday.findOne({
				where: {
					Guild: interaction.guild.id,
					User: interaction.member.id,
				},
			})

			if (data) {
				await Birthday.destroy({
					where: {
						Guild: interaction.guild.id,
						User: interaction.member.id,
					},
				})

				return await interaction
					.editReply({
						embeds: [
							new EmbedBuilder()
								.setColor(defaultColor)
								.setDescription(
									`✅ - Removed ${interaction.user}'s birthday data`
								),
						],
					})
					.catch((err) => {})
			} else {
				return await interaction
					.editReply({
						embeds: [
							new EmbedBuilder()
								.setColor("Red")
								.setDescription(
									`You don't have birthday data to be removed`
								),
						],
					})
					.catch((err) => {})
			}
		}

		case "list": {
			let data = await Birthday.findAll({
				where: { Guild: interaction.guild.id },
			})

			const date = new Date()
			const currentYear = date.getFullYear()

			let index = 1

			data = data.sort(
				(a, b) =>
					new Date(`${a.Year} ${a.Month} ${a.Date}`) -
					new Date(`${b.Year} ${b.Month} ${b.Date}`)
			)

			const birthdayData = data
				.map((d) => {
					return `**${index++}.** \`${d.Month}/${d.Day}/${
						d.Year
					}\` - ${client.users.cache.get(d.User)} (${
						currentYear - d.Year - 1
					} -> ${currentYear - d.Year})`
				})
				.join("\n")

			if (!birthdayData) {
				return await interaction
					.editReply({
						embeds: [
							new EmbedBuilder()
								.setColor("Red")
								.setDescription(
									`Couldn't find any birthday data`
								),
						],
					})
					.catch((err) => {})
			}

			// console.log(data)

			const embed = new EmbedBuilder()
				.setColor(defaultColor)
				.setTitle("🎂 Birthdays List 🎉")
				.setThumbnail(
					"https://berkscountyliving.com/downloads/18196/download/iStock-918933880.jpg?cb=1155e4a7652ab617e102986ad35ab972"
				)
				.setDescription(`${birthdayData}`)
				.setFooter({ text: "Sorted by upcoming" })
				.setTimestamp()

			return await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})
		}
	}
}
