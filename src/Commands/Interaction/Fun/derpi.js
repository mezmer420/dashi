const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")
const { derpibooruAPItoken } = process.env

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("derpi")
	.setDescription("Pick a random pony image from Derpibooru!")
	.addSubcommand((subcommand) => {
		subcommand
			.setName("tag-search")
			.setDescription("Search by tags")
			.addStringOption((option) =>
				option
					.setName("search-tag-1")
					.setDescription("The 1st search tag")
					.setRequired(true)
			)

		function toOrdinalSuffix(num) {
			const int = parseInt(num),
				digits = [int % 10, int % 100],
				ordinals = ["st", "nd", "rd", "th"],
				oPattern = [1, 2, 3, 4],
				tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19]

			return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
				? int + ordinals[digits[0] - 1]
				: int + ordinals[3]
		}

		for (let i = 2; i <= 10; i++) {
			subcommand.addStringOption((option) =>
				option
					.setName(`search-tag-${i}`)
					.setDescription(`The ${toOrdinalSuffix(i)} search tag`)
					.setRequired(false)
			)
		}

		subcommand
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
					.setDescription(
						"The number of results to return (default 1)"
					)
					.setMinValue(1)
					.setMaxValue(10)
					.setRequired(false)
			)

		return subcommand
	})
	.addSubcommand((subcommand) =>
		subcommand
			.setName("id-search")
			.setDescription("Display a post by its ID")
			.addIntegerOption((option) =>
				option
					.setName("id")
					.setDescription("The ID of the post")
					.setRequired(true)
			)
	)

module.exports.run = async ({ client, interaction }) => {
	switch (interaction.options.getSubcommand()) {
		case "tag-search": {
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
				const baseURL =
					"https://derpibooru.org/api/v1/json/search/images?"

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
				tags =
					tags.length > 100
						? tags.substring(0, 97).concat("...")
						: tags

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

			return await interaction
				.editReply({ embeds: embeds })
				.catch((err) => {})
		}

		case "id-search": {
			const ID = interaction.options.getInteger("id")

			async function getImageData(ID) {
				const URL = `https://derpibooru.org/api/v1/json/images/${ID}`

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

			const imageData = await getImageData(ID)

			if (imageData.total === 0) {
				return await interaction
					.editReply({
						content: `❌ | No result for **${ID}**`,
					})
					.catch((err) => {})
			}

			// console.log(imageData.image)

			const image = imageData.image

			function doesAnyExistInArray(a, b) {
				return a.some((item) => b.includes(item))
			}

			const NSFW = ["explicit", "grimdark"]

			if (doesAnyExistInArray(NSFW, image.tags)) {
				return await interaction
					.editReply({
						content:
							"You can only view that image in <#947275856919810048>", // #unpure
					})
					.catch((err) => {})
			}

			const id = image.id
			let tags = image.tags.join(", ")
			tags =
				tags.length > 100 ? tags.substring(0, 97).concat("...") : tags

			const pageURL = `https://derpibooru.org/images/${id}`
			const imageURL = image.representations.full

			const embed = new EmbedBuilder()
				.setColor("Random")
				.setTitle(`#${image.id} — ${tags}`)
				.setURL(pageURL)
				.setImage(imageURL)
				.setFooter({ text: "Derpibooru" })

			if (image.uploader) {
				const uploaderForURL = image.uploader.replaceAll(" ", "+")
				const uploaderURL = `https://derpibooru.org/profiles/${uploaderForURL}`

				embed.setAuthor({ name: image.uploader, url: uploaderURL })
			}

			return await interaction
				.editReply({ embeds: [embed] })
				.catch((err) => {})
		}
	}
}
