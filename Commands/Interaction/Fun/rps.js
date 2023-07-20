const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const wait = require("node:timers/promises").setTimeout

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("rps")
	.setDescription("Play rock paper scissors against me!")
	.addStringOption((option) =>
		option
			.setName("choice")
			.setDescription("What will you pick?")
			.setRequired(true)
			.addChoices(
				{ name: "rock", value: "rock" },
				{ name: "paper", value: "paper" },
				{ name: "scissors", value: "scissors" }
			)
	)

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const userChoice = interaction.options.getString("choice")

	const choices = ["rock", "paper", "scissors"]
	const botChoice = choices[Math.floor(Math.random() * choices.length)]

	try {
		await interaction.editReply({
			content: "Rock,",
		})

		await wait(1000)

		await interaction.editReply({
			content: "Rock, paper,",
		})

		await wait(1000)

		await interaction.editReply({
			content: "Rock, paper, scissors,",
		})

		await wait(1000)

		await interaction.editReply({
			content: "Rock, paper, scissors, shoot!",
		})

		await wait(500)

		await interaction.editReply({
			content: `Rock, paper, scissors, shoot!\n\nYou choose ${userChoice}!\nI choose ${botChoice}!`,
		})

		await wait(1000)

		switch (userChoice + botChoice) {
			case "rockscissors":
			case "paperrock":
			case "scissorspaper":
				return await interaction.editReply({
					content: `Rock, paper, scissors, shoot!\n\nYou choose ${userChoice}!\nI choose ${botChoice}!\n\nCrap, you win!`,
				})
			case "rockpaper":
			case "paperscissors":
			case "scissorsrock":
				return await interaction.editReply({
					content: `Rock, paper, scissors, shoot!\n\nYou choose ${userChoice}!\nI choose ${botChoice}!\n\nHa, I win!`,
				})
			default:
				return await interaction.editReply({
					content: `Rock, paper, scissors, shoot!\n\nYou choose ${userChoice}!\nI choose ${botChoice}!\n\n...huh, let's play again!`,
				})
		}
	} catch (err) {}
}
