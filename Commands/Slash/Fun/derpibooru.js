const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")

module.exports.data = new SlashCommandBuilder()
	.setName("derpibooru")
	.setDescription("Pick a random pony image from derpibooru!")
	.addStringOption((option) =>
		option
			.setName("search-query")
			.setDescription("The search phrases")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const query = interaction.options.getString("search-query")

	async function getImageData(query) {
		const BASE_URL = "https://derpibooru.org/api/v1/json/search/images?"
		let response = await fetch(`${BASE_URL}q=${query}&sf=random`)

		return await response.json().catch((err) => {})
	}

	const imageData = await getImageData(query)

	if (imageData.total === 0) {
		return await interaction
			.editReply({
				content: `❌ | No results for **${query}**`,
			})
			.catch((err) => {})
	}

	let images = imageData.images

	images = images.filter((image) => image.tags.includes("safe"))

	if (images.length === 0) {
		return await interaction
			.editReply({
				content: `❌ | No safe results for **${query}**`,
			})
			.catch((err) => {})
	}

	const image = images[Math.floor(Math.random() * images.length)]

	const id = image.id
	let tags = image.tags.join(", ")
	if (tags.length > 50) {
		tags = tags.substring(0, 47)
		tags = tags.concat("...")
	}

	const pageurl = `https://derpibooru.org/images/${id}`
	const imageurl = image.representations.full

	const Embed = new EmbedBuilder()
		.setColor("Random")
		.setTitle(`#${id} - ${tags}`)
		.setURL(pageurl)
		.setImage(imageurl)
		.setFooter({ text: "Derpibooru" })

	if (image.uploader !== null) {
		const uploader = image.uploader
		const uploaderurl = `https://derpibooru.org/profiles/${uploader}`

		Embed.setAuthor({ name: uploader, url: uploaderurl })
	}

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
