const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")
const config = require("../../../config.json")

module.exports.data = new SlashCommandBuilder()
	.setName("derpi")
	.setDescription("Pick a random pony image from Derpibooru!")
	.addStringOption((option) =>
		option
			.setName("search-tag-1")
			.setDescription("The first search tag")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("search-tag-2")
			.setDescription("The second search tag")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("search-tag-3")
			.setDescription("The third search tag")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("search-tag-4")
			.setDescription("The fourth search tag")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("search-tag-5")
			.setDescription("The fifth search tag")
			.setRequired(false)
	)

module.exports.run = async ({ client, interaction }) => {
	const tag1 = interaction.options.getString("search-tag-1")
	const tag2 = interaction.options.getString("search-tag-2")
	const tag3 = interaction.options.getString("search-tag-3")
	const tag4 = interaction.options.getString("search-tag-4")
	const tag5 = interaction.options.getString("search-tag-5")

	let query = tag1

	if (tag2) {
		query = query.concat(`, ${tag2}`)
	}
	if (tag3) {
		query = query.concat(`, ${tag3}`)
	}
	if (tag4) {
		query = query.concat(`, ${tag4}`)
	}
	if (tag5) {
		query = query.concat(`, ${tag5}`)
	}

	async function getImageData(query) {
		const baseURL = "https://derpibooru.org/api/v1/json/search/images?"

		const URL =
			baseURL +
			new URLSearchParams({
				key: config.derpibooruAPItoken,
				q: query,
				per_page: 25,
				sf: "random",
			})

		let response = await fetch(URL)

		if (!response.ok) {
			return await interaction
				.editReply({
					conten: "❌ | An error occured",
				})
				.catch((err) => {})
		}

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

	const pageURL = `https://derpibooru.org/images/${id}`
	const imageURL = image.representations.full

	const Embed = new EmbedBuilder()
		.setColor("Random")
		.setTitle(`#${id} — ${tags}`)
		.setURL(pageURL)
		.setImage(imageURL)
		.setFooter({ text: "Derpibooru" })

	if (image.uploader !== null) {
		const uploader = image.uploader
		const uploaderForURL = uploader.replaceAll(" ", "+")

		const uploaderURL = `https://derpibooru.org/profiles/${uploaderForURL}`

		Embed.setAuthor({ name: uploader, url: uploaderURL })
	}

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
