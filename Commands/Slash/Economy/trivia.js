const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
} = require("discord.js")
const fetch = require("node-fetch")

module.exports.data = new SlashCommandBuilder()
	.setName("trivia")
	.setDescription("Test your knowledge and earn Dashcoins!")
	.addStringOption((option) =>
		option
			.setName("category")
			.setDescription(
				"Select question category; skip to choose random category"
			)
			.setRequired(false)
			.addChoices(
				{
					name: "Arts & Literature",
					value: "categories=arts_and_literature&",
				},
				{
					name: "Film & TV",
					value: "categories=film_and_tv&",
				},
				{
					name: "Food & Drink",
					value: "categories=food_and_drink&",
				},
				{
					name: "General Knowledge",
					value: "categories=general_knowledge&",
				},
				{
					name: "Geography",
					value: "categories=geography&",
				},
				{
					name: "History",
					value: "categories=history&",
				},
				{
					name: "Music",
					value: "categories=music&",
				},
				{
					name: "Science",
					value: "categories=science&",
				},
				{
					name: "Society & Culture",
					value: "categories=society_and_culture&",
				},
				{
					name: "Sport & Leisure",
					value: "categories=sport_and_leisure&",
				}
			)
	)
	.addStringOption((option) =>
		option
			.setName("difficulty")
			.setDescription(
				"Select difficulty; skip to choose random difficulty"
			)
			.setRequired(false)
			.addChoices(
				{ name: "Easy", value: "&difficulty=easy" },
				{ name: "Medium", value: "&difficulty=medium" },
				{ name: "Hard", value: "&difficulty=hard" }
			)
	)

module.exports.category = "Economy"

module.exports.run = async ({ client, interaction, Systems, Economy }) => {
	const category = interaction.options.getString("category") || ""
	const difficulty = interaction.options.getString("difficulty") || ""

	let getUser = await Economy.findOne({
		where: { id: interaction.member.id },
	})

	if (!getUser) {
		getUser = await Economy.create({
			id: interaction.member.id,
			wallet: 0,
			bank: 0,
		})
	}

	const base = await fetch(
		`https://the-trivia-api.com/api/questions?${category}limit=5${difficulty}`
	)
	const data = await base.json()

	let questionData = data[0]
	if (questionData.question.length > 80) {
		questionData = data[1]
	}
	if (questionData.question.length > 80) {
		questionData = data[2]
	}
	if (questionData.question.length > 80) {
		questionData = data[3]
	}
	if (questionData.question.length > 80) {
		questionData = data[4]
	}

	// console.log(questionData)

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	let Embed = new EmbedBuilder()
		.setColor("Random")
		.setTitle(`${questionData.question}`)
		.addFields(
			{
				name: "Category",
				value: `${questionData.category}`,
				inline: true,
			},
			{
				name: "Difficulty",
				value: `${capitalizeFirstLetter(questionData.difficulty)}`,
				inline: true,
			}
		)
		.setDescription("You have 10 seconds to answer")

	let choices = []

	const correctAnswer = questionData.correctAnswer

	choices.push(correctAnswer)

	choices = choices.concat(questionData.incorrectAnswers)

	function shuffle(array) {
		let currentIndex = array.length,
			randomIndex

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--

			// And swap it with the current element.
			;[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			]
		}

		return array
	}

	choices = shuffle(choices)

	let row = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setLabel(`${choices[0]}`)
			.setStyle("Primary")
			.setCustomId(`${choices[0]}`),

		new ButtonBuilder()
			.setLabel(`${choices[1]}`)
			.setStyle("Primary")
			.setCustomId(`${choices[1]}`),

		new ButtonBuilder()
			.setLabel(`${choices[2]}`)
			.setStyle("Primary")
			.setCustomId(`${choices[2]}`),

		new ButtonBuilder()
			.setLabel(`${choices[3]}`)
			.setStyle("Primary")
			.setCustomId(`${choices[3]}`)
	)

	const response = await interaction
		.editReply({
			embeds: [Embed],
			components: [row],
		})
		.catch((err) => {})

	const filter = (i) => {
		return i.user.id === interaction.user.id
	}

	const collector = await response.createMessageComponentCollector({
		filter,
		max: 1,
		time: 10000,
	})

	const rowComponents = row.components

	collector.on("collect", async (i) => {
		const ans = i.customId

		if (ans === correctAnswer) {
			for (let i = 0; i < rowComponents.length; i++) {
				rowComponents[i].setStyle("Secondary")
				rowComponents[i].setDisabled(true)
			}

			let choiceArr = []

			for (let i = 0; i < rowComponents.length; i++) {
				const answer = rowComponents[i].data.custom_id

				const answerPos = answer.indexOf(ans)

				choiceArr.push(answerPos)
			}

			const choicePos = choiceArr.indexOf(0)

			rowComponents[choicePos].setStyle("Success")

			await response
				.edit({
					embeds: [
						Embed.setDescription("This question has been answered"),
					],
					components: [row],
				})
				.catch((err) => {})

			const getEconomy = await Systems.findOne({
				where: { system: "Economy" },
			})

			if (getEconomy.online === true) {
				let coinsEarned

				if (questionData.difficulty === "easy") {
					coinsEarned = 10
				} else if (questionData.difficulty === "medium") {
					coinsEarned = 20
				} else if (questionData.difficulty === "hard") {
					coinsEarned = 30
				}

				await Economy.update(
					{ wallet: getUser.wallet + coinsEarned },
					{ where: { id: interaction.member.id } }
				)

				return await i
					.reply(`You got **${coinsEarned}** Dashcoins:tm:`)
					.catch((err) => {})
			} else if (getEconomy.online === false) {
				return await i
					.reply(
						"The Economy system is currently disabled, so you didn't get any Dashcoins:tm:"
					)
					.catch((err) => {})
			}
		} else {
			await i.deferUpdate().catch((err) => {})

			for (let i = 0; i < rowComponents.length; i++) {
				rowComponents[i].setStyle("Secondary")
				rowComponents[i].setDisabled(true)
			}

			let choiceArr = []
			let correctArr = []

			for (let i = 0; i < rowComponents.length; i++) {
				const answer = rowComponents[i].data.custom_id

				const answerPos = answer.indexOf(ans)
				const correctPos = answer.indexOf(correctAnswer)

				choiceArr.push(answerPos)
				correctArr.push(correctPos)
			}

			const choicePos = choiceArr.indexOf(0)
			const correctPos = correctArr.indexOf(0)

			rowComponents[choicePos].setStyle("Danger")
			rowComponents[correctPos].setStyle("Success")

			return await response
				.edit({
					embeds: [Embed.setDescription("Better luck next time")],
					components: [row],
				})
				.catch((err) => {})
		}
	})

	collector.on("end", async (collected, reason) => {
		if (reason === "time") {
			for (let i = 0; i < rowComponents.length; i++) {
				rowComponents[i].setStyle("Secondary")
				rowComponents[i].setDisabled(true)
			}

			return await response
				.edit({
					embeds: [Embed.setDescription("Time up")],
					components: [row],
				})
				.catch((err) => {})
		}
	})
}
