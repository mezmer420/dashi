const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Music"

module.exports.data = new SlashCommandBuilder()
	.setName("filter")
	.setDescription("Toggle a filter")
	.addStringOption((option) =>
		option
			.setName("filter")
			.setDescription("The filter to toggle")
			.setRequired(true)
			.addChoices(
				{ name: "All off", value: "off" },
				{ name: "3d", value: "3d" },
				{ name: "8d", value: "8d" }, // custom
				{ name: "Bassboost", value: "bassboost" },
				{ name: "Cursed", value: "cursed" }, // custom
				{ name: "Earrape", value: "earrape" }, // custom
				{ name: "Earwax", value: "earwax" },
				{ name: "Echo", value: "echo" },
				{ name: "Flanger", value: "flanger" },
				{ name: "Gate", value: "gate" },
				{ name: "Haas", value: "haas" },
				{ name: "Karaoke", value: "karaoke" },
				{ name: "Mcompand", value: "mcompand" },
				{ name: "Nightcore", value: "nightcore" },
				{ name: "Normalizer", value: "normalizer" }, // custom
				{ name: "Phaser", value: "phaser" },
				{ name: "Purebass", value: "purebass" }, // custom
				{ name: "Reverse", value: "reverse" },
				{ name: "Surround", value: "surround" },
				{ name: "Treble", value: "treble" }, // custom
				{ name: "Tremolo", value: "tremolo" },
				{ name: "Vaporwave", value: "vaporwave" },
				{ name: "Vibrato", value: "vibrato" } // custom
			)
	)

module.exports.run = async ({ client, interaction, Systems, defaultColor }) => {
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

	if (filter === "off") {
		if (!queue.filters.size) {
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

		await queue.filters.clear()

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

	if (!queue.filters.has(filter)) {
		await queue.filters.add(filter)

		return await interaction
			.editReply({
				content: `🎵 | ${capitalizeFirstLetter(filter)} enabled!`,
			})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	} else {
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
