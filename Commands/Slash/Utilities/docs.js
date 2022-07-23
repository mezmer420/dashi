const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const Docs = require("discord.js-docs")

module.exports.data = new SlashCommandBuilder()
	.setName("docs")
	.setDescription("Search the official Discord.JS documentation")
	.addStringOption((option) =>
		option
			.setName("search-query")
			.setDescription("Search the official Discord.JS documentation")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction }) => {
	const query = interaction.options.getString("search-query")
	const branch = "stable"

	const max = 1024

	const replaceDisco = (str) =>
		str
			.replace(/docs\/docs\/disco/g, `docs/discord.js/${branch}`)
			.replace(/ \(disco\)/g, "")

	const doc = await Docs.fetch(branch)
	const results = await doc.resolveEmbed(query)

	if (!results) {
		return await interaction
			.editReply({
				content: `❌ | No results for **${query}**`,
			})
			.catch((err) => {})
	}

	const string = replaceDisco(JSON.stringify(results))

	const Embed = JSON.parse(string)

	Embed.author.url = `https://discord.js/#/docs/discord.js/${branch}/general/welcome`

	const extra =
		"\n\nView more here: " +
		/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
			.exec(Embed.description)[0]
			.split(")")[0]

	for (const field of Embed.fields || []) {
		if (field.value.length >= max) {
			field.value = field.value.slice(0, max)
			const split = field.value.split(" ")
			let joined = split.join(" ")

			while (joined.length >= max - extra.length) {
				split.pop()
				joined = split.join(" ")
			}

			field.value = joined + extra
		}
	}

	if (
		Embed.fields &&
		Embed.fields[Embed.fields.length - 1].value.startsWith("[View source")
	) {
		Embed.fields.pop()
	}

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
