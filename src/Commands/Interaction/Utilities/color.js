const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")

module.exports.category = "Utilities"

module.exports.data = new SlashCommandBuilder()
	.setName("color")
	.setDescription("Gives a random color")

module.exports.run = async ({ client, interaction }) => {
	const URL = "https://www.colr.org/json/color/random"

	async function fetchData() {
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

			if (data.colors[0].hex === "" || !data.colors[0].tags[0].name) {
				// Bad data received; restart the fetching procedure
				return fetchData()
			}

			const embed = new EmbedBuilder()
				.setColor(`#${data.colors[0].hex}`)
				.setTitle(`${data.colors[0].tags[0].name}`)
				.setDescription(`Hex: ${data.colors[0].hex}`)
				.setFooter({ text: "colr.org" })

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

	fetchData()
}
