const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("mem")
	.setDescription("Sends a mem")

module.exports.run = async ({ client, interaction }) => {
	const num = Math.floor(Math.random() * (500 - 1) + 1)

	await interaction
		.editReply({
			files: [
				{
					attachment: `https://ctk-api.herokuapp.com/meme/${num}`,
					name: "meme.jpg",
				},
			],
		})
		.catch((err) => {})
}
