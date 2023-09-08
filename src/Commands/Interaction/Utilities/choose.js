const { SlashCommandBuilder } = require("discord.js")

module.exports.category = "Utilities"

module.exports.data = new SlashCommandBuilder()
	.setName("choose")
	.setDescription("I will choose something for you")
	.addStringOption((option) =>
		option
			.setName("1st")
			.setDescription("The 1st thing to choose from")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("2nd")
			.setDescription("The 2nd thing to choose from")
			.setRequired(true)
	)

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

for (let i = 3; i <= 10; i++) {
	module.exports.data.addStringOption((option) =>
		option
			.setName(`${toOrdinalSuffix(i)}`)
			.setDescription(`The ${toOrdinalSuffix(i)} thing to choose from`)
			.setRequired(false)
	)
}

module.exports.run = async ({ client, interaction }) => {
	let responseValues = []

	for (let i = 1; i <= 10; i++) {
		const option = interaction.options.getString(`${toOrdinalSuffix(i)}`)

		if (option) {
			responseValues.push(option)
		}
	}

	const response =
		responseValues[Math.floor(Math.random() * responseValues.length)]

	await interaction
		.editReply({
			content: `I choose... **${response}**`,
		})
		.catch((err) => {})
}
