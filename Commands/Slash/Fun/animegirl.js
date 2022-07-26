const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")

module.exports.data = new SlashCommandBuilder()
	.setName("animegirl")
	.setDescription("Pick a random anime girl image!")
	.addStringOption((option) =>
		option
			.setName("type")
			.setDescription("SFW/NSFW; default is SFW")
			.setRequired(false)
			.addChoices(
				{ name: "SFW", value: "sfw" },
				{ name: "NSFW", value: "nsfw" }
			)
	)
// .addStringOption(
// 	(option) =>
// 		option
// 			.setName("category")
// 			.setDescription("The category to choose from")
// 			.setRequired(false)
// 	.addChoices(
// 		{ name: "waifu", value: "waifu" },
// 		{ name: "neko", value: "neko" }
// 		// { name: "shinobu", value: "shinobu" },
// 		// { name: "megumin", value: "megumin" },
// 		// { name: "bully", value: "bully" },
// 		// { name: "cuddle", value: "cuddle" }
// 	)
// )
// .addStringOption((option) =>
// 	option
// 		.setName("search-query")
// 		.setDescription("The search phrases")
// 		.setRequired(true)
// )

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const type = interaction.options.getString("type") || "sfw"

	if (type === "nsfw" && interaction.channel.id !== "947275856919810048") {
		return await interaction
			.editReply({
				content:
					"You can only use the NSFW option in <#947275856919810048>",
			})
			.catch((err) => {})
	}

	let categories = [
		"waifu",
		"neko",
		"shinobu",
		"megumin",
		"bully",
		"cuddle",
		"cry",
		"hug",
		"awoo",
		"kiss",
		"lick",
		"pat",
		"smug",
		"bonk",
		"yeet",
		"blush",
		"yeet",
		"blush",
		"smile",
		"wave",
		"highfive",
		"handhold",
		"nom",
		"bite",
		"glomp",
		"slap",
		"kill",
		"kick",
		"happy",
		"wink",
		"poke",
		"dance",
	]

	if (type === "nsfw") {
		categories = ["waifu", "neko", "trap", "blowjob"]
	}

	const category =
		// interaction.options.getString("category") ||
		categories[Math.floor(Math.random() * categories.length)]

	async function getImageData() {
		const BASE_URL = "https://api.waifu.pics/"

		let response = await fetch(`${BASE_URL}${type}/${category}`)

		return await response.json().catch((err) => {})
	}

	const imageData = await getImageData()

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	const Embed = new EmbedBuilder()
		.setColor("Random")
		.setTitle(`Category: ${capitalizeFirstLetter(category)}`)
		.setImage(imageData.url)

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
