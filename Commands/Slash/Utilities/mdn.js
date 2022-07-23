const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const axios = require("axios")

module.exports.data = new SlashCommandBuilder()
	.setName("mdn")
	.setDescription("Search the official MDN documentation")
	.addStringOption((option) =>
		option
			.setName("search-query")
			.setDescription("Search the official MDN documentation")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const query = interaction.options.getString("search-query")
	const base = "https://developer.mozilla.org"
	const uri = `${base}/api/v1/search?q=${encodeURIComponent(
		query
	)}&locale=en-US`

	const documents = (await axios(uri)).data.documents

	if (documents) {
		const Embed = new EmbedBuilder()
			.setAuthor({
				name: "MDN Documentation",
				iconURL:
					"https://avatars.githubusercontent.com/u/7565578?s=200&v=4",
			})
			.setColor(defaultColor)

		let truncated = false

		if (documents.length > 3) {
			documents.length = 3
			truncated = true
		}

		for (let { mdn_url, title, summary } of documents) {
			summary = summary.replace(/(\r\n|\n|\r)/gm, "")

			Embed.addFields({
				name: title,
				value: `${summary}\n[**Link**](${base}${mdn_url})`,
			})
		}

		if (truncated) {
			Embed.addFields({
				name: "Too many results!",
				value: `View more results [here](https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(
					query
				)}).`,
			})
		}

		if (!Embed.data.fields) {
			return await interaction
				.editReply({
					content: `❌ | No results for **${query}**`,
				})
				.catch((err) => {})
		}

		await interaction
			.editReply({
				embeds: [Embed],
			})
			.catch((err) => {})
	}
}
