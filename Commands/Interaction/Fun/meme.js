const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("meme")
	.setDescription("Sends a meme")

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const URL = "https://meme-api.com/gimme"

	try {
		const response = await fetch(URL)
		const data = await response.json()

		if (response.status !== 200) {
			return await interaction
				.editReply({
					content: "❌ | Error: Bad response",
				})
				.catch((err) => {})
		}

		const embed = new EmbedBuilder()
			.setColor(defaultColor)
			.setURL(data.postLink)
			.setImage(data.url)

		let title = data.title

		title = title.length > 50 ? title.substring(0, 50) : title

		embed.setTitle(title)

		await interaction
			.editReply({
				embeds: [embed],
			})
			.catch((err) => {})
	} catch (error) {
		console.error(error)
		interaction
			.editReply({
				content: "❌ | An error occurred",
			})
			.catch((err) => {})
	}
}
