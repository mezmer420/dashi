const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")
const { derpibooruAPItoken } = process.env

module.exports.category = "Fun"

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
	.addStringOption((option) =>
		option
			.setName("search-tag-6")
			.setDescription("The sixth search tag")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("search-tag-7")
			.setDescription("The seventh search tag")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("search-tag-8")
			.setDescription("The eighth search tag")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("search-tag-9")
			.setDescription("The ninth search tag")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("search-tag-10")
			.setDescription("The tenth search tag")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("filter")
			.setDescription("The filter to use (default Default)")
			.setRequired(false)
			.addChoices(
				{ name: "Default", value: "100073" },
				{ name: "18+ Dark", value: "37429" },
				{ name: "18+ R34", value: "37432" },
				{ name: "Ponies only + Default", value: "201014" },
				{ name: "18+ Ponies only", value: "201001" },
				{ name: "Maximum Spoilers", value: "37430" },
				{ name: "EVERYTHING", value: "56027" }
			)
	)
	.addIntegerOption((option) =>
		option
			.setName("results")
			.setDescription("The number of results to return (default 1)")
			.setMinValue(1)
			.setMaxValue(10)
			.setRequired(false)
	)

module.exports.run = async ({ client, interaction }) => {
	let query = [interaction.options.getString("search-tag-1")]

	for (let i = 2; i <= 10; i++) {
		const tag = interaction.options.getString(`search-tag-${i}`)

		if (tag) {
			query.push(tag)
		}
	}

	query = query.join(", ")

	const filter = interaction.options.getString("filter") || "100073"

	const results = interaction.options.getInteger("results") || 1

	if (
		(filter === "37429" ||
			filter === "37432" ||
			filter === "201001" ||
			filter === "56027") &&
		interaction.channel.id !== "947275856919810048"
	) {
		return await interaction
			.editReply({
				content:
					"You can only use that filter in <#947275856919810048>", // #unpure
			})
			.catch((err) => {})
	}

	async function getImageData(query) {
		const baseURL = "https://derpibooru.org/api/v1/json/search/images?"

		const URL =
			baseURL +
			new URLSearchParams({
				key: derpibooruAPItoken,
				filter_id: filter,
				q: query,
				per_page: 25,
				sf: "random",
			})

		let response = await fetch(URL)

		// console.log(URL)

		if (!response.ok) {
			return await interaction
				.editReply({
					content: "❌ | An error occured",
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

	// console.log(imageData)

	const generateEmbed = (image) => {
		const id = image.id
		let tags = image.tags.join(", ")
		tags = tags.length > 50 ? tags.substring(0, 47).concat("...") : tags

		const pageURL = `https://derpibooru.org/images/${id}`
		const imageURL = image.representations.full

		const embed = new EmbedBuilder()
			.setColor("Random")
			.setTitle(`#${id} — ${tags}`)
			.setURL(pageURL)
			.setImage(imageURL)
			.setFooter({ text: "Derpibooru" })

		if (image.uploader) {
			const uploaderForURL = image.uploader.replaceAll(" ", "+")
			const uploaderURL = `https://derpibooru.org/profiles/${uploaderForURL}`

			embed.setAuthor({ name: image.uploader, url: uploaderURL })
		}

		return embed
	}

	const imageIndex = imageData.images
	const embeds = []

	for (let i = 0; i < results; i++) {
		const index = Math.floor(Math.random() * imageIndex.length)
		const image = imageIndex[index]
		imageIndex.splice(index, 1)
		embeds.push(generateEmbed(image))

		// console.log(image)
	}

	await interaction.editReply({ embeds }).catch(() => {})
}
