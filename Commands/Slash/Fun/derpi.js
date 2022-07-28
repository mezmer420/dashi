const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")
const config = require("../../../config.json")

module.exports.data = new SlashCommandBuilder()
	.setName("derpi")
	.setDescription("Pick a random pony image from derpibooru!")
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
	try {
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
			const BASE_URL = "https://derpibooru.org/api/v1/json/search/images?"

			const url =
				BASE_URL +
				new URLSearchParams({
					key: config.derpibooruAPItoken,
					q: query,
					per_page: 25,
					sf: "random",
				}).toString()

			let response = await fetch(url)

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

		await interaction.editReply({
			embeds: [Embed],
		})
	} catch (err) {
		await interaction
			.editReply({
				content: "❌ | An error occured",
			})
			.catch((err) => {})

		console.log(err)
	}
}
