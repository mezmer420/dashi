const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Utilities"

module.exports.data = new SlashCommandBuilder()
	.setName("diceroll")
	.setDescription("Roll a dice")
	.addIntegerOption((option) =>
		option
			.setName("dice")
			.setDescription("The number of dice to roll; skip to roll one")
			.setMinValue(1)
			.setMaxValue(8)
			.setRequired(false)
	)

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const dice = interaction.options.getInteger("dice") || 1

	const rolls = []
	for (let i = 0; i < dice; i++) {
		rolls.push(Math.floor(Math.random() * 5) + 1)
	}

	const rollText = rolls
		.map((roll, index) => `Die ${index + 1} landed on **${roll}**`)
		.join("\n")

	const embed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle("🎲 Dice roll")
		.setDescription(rollText)

	return await interaction.editReply({ embeds: [embed] }).catch((err) => {})
}
