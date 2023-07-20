const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("urban")
	.setDescription(
		"Define a term from Urban Dictionary (top result displayed)"
	)
	.addStringOption((option) =>
		option
			.setName("search-query")
			.setDescription("The search term")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction }) => {
	const query = interaction.options.getString("search-query")

	search = encodeURIComponent(query)

	const { list } = await fetch(
		`https://api.urbandictionary.com/v0/define?term=${search}`
	).then((res) => res.json())

	const [answer] = list

	function trim(input) {
		return input.length > 1024 ? `${input.slice(0, 1020)} ...` : input
	}

	if (!answer) {
		return await interaction
			.editReply({
				content: `❌ | No results for **${query}**`,
			})
			.catch((err) => {})
	}

	const example =
		answer.example.length > 0 ? trim(answer.example) : "(None provided)"

	const embed = new EmbedBuilder()
		.setTitle(answer.word)
		.setURL(answer.permalink)
		.setColor("Random")
		.setThumbnail("https://i.imgur.com/VFXr0ID.jpg")
		.addFields(
			{ name: "Definition", value: trim(answer.definition) },
			{ name: "Example", value: example },
			{
				name: "Ratings",
				value: `👍 ${answer.thumbs_up} || 👎 ${answer.thumbs_down}`,
			}
		)

		.setFooter({ text: `Entry by ${answer.author}` })

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
