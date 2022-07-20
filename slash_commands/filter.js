const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("filter")
	.setDescription("Toggle a filter")
	.addStringOption((option) =>
		option
			.setName("filter")
			.setDescription("The filter to toggle")
			.setRequired(true)
			.addChoices(
				{ name: "all off", value: "off" },
				{ name: "3d", value: "3d" },
				{ name: "8d", value: "8d" }, // custom
				{ name: "bassboost", value: "bassboost" },
				{ name: "earrape", value: "earrape" }, // custom
				{ name: "earwax", value: "earwax" },
				{ name: "echo", value: "echo" },
				{ name: "flanger", value: "flanger" },
				{ name: "gate", value: "gate" },
				{ name: "haas", value: "haas" },
				{ name: "karaoke", value: "karaoke" },
				{ name: "mcompand", value: "mcompand" },
				{ name: "nightcore", value: "nightcore" },
				{ name: "normalizer", value: "normalizer" }, // custom
				{ name: "phaser", value: "phaser" },
				{ name: "reverse", value: "reverse" },
				{ name: "surround", value: "surround" },
				{ name: "treble", value: "treble" }, // custom
				{ name: "tremolo", value: "tremolo" },
				{ name: "vaporwave", value: "vaporwave" },
				{ name: "vibrato", value: "vibrato" } // custom
			)
	)

module.exports.run = async ({ client, interaction, Systems }) => {
	const getMusic = await Systems.findOne({
		where: { system: "Music" },
	})

	if (getMusic.online === false) {
		return await interaction
			.editReply({
				content: "The Music system is currently disabled",
			})
			.catch((err) => {})
	}

	if (interaction.channel.id !== "992630810186367016") {
		return await interaction
			.editReply({
				content:
					"You can only use that command in <#992630810186367016>! (this message will autodelete)",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 6000)
			})
	}

	const queue = await client.distube.getQueue(interaction.guildId)

	if (!queue) {
		return await interaction
			.editReply({ content: "There are no songs in the queue" })
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	const filter = interaction.options.getString("filter")

	let filters = queue.filters.collection
	filters = Array.from(filters.values())

	if (filter === "off") {
		if (!filters[0]) {
			return await interaction
				.editReply({
					content: `No filters are active`,
				})
				.catch((err) => {})
				.then((interaction) => {
					setTimeout(
						() => interaction.delete().catch((err) => {}),
						10000
					)
				})
		}

		for (let i = 0; i < filters.length; i++) {
			const currentFilter = filters[i]

			await queue.filters.remove(currentFilter)
		}

		return await interaction
			.editReply({
				content: `🎵 | All filters disabled!`,
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	if (!filters.includes(filter)) {
		await queue.filters.add(filter)

		return await interaction
			.editReply({
				content: `🎵 | ${capitalizeFirstLetter(filter)} enabled!`,
			})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	} else if (filters.includes(filter)) {
		await queue.filters.remove(filter)

		return await interaction
			.editReply({
				content: `🎵 | ${capitalizeFirstLetter(filter)} disabled!`,
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}
}
