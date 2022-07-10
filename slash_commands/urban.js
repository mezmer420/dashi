const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const axios = require("axios")

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

	const {
		data: { list },
	} = await axios.get(
		`https://api.urbandictionary.com/v0/define?term=${search}`
	)

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

	const Embed = new MessageEmbed()
		.setTitle(answer.word)
		.setURL(answer.permalink)
		.setColor("RANDOM")
		.setThumbnail("https://i.imgur.com/VFXr0ID.jpg")
		.addField("Definition", trim(answer.definition))
		.addField("Example", trim(answer.example))
		.addField(
			"Ratings",
			`👍 ${answer.thumbs_up} || 👎 ${answer.thumbs_down}`
		)
		.setFooter({ text: `Entry by ${answer.author}` })

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
