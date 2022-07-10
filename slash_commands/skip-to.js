const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
	.setName("skip-to")
	.setDescription("Skips to a certain track #")
	.addNumberOption((option) =>
		option
			.setName("tracknumber")
			.setDescription("The track to skip to")
			.setMinValue(1)
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction }) => {
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

	const queue = client.player.getQueue(interaction.guildId)

	if (!queue) {
		return await interaction
			.editReply({
				content: "There are no songs in the queue",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	const trackNum = interaction.options.getNumber("tracknumber")

	if (trackNum > queue.tracks.length) {
		return await interaction
			.editReply({
				content: "Invalid track number",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	queue.skipTo(trackNum - 1)

	await interaction
		.editReply({
			content: `Skipped ahead to track number ${trackNum}`,
		})
		.catch((err) => {})
		.then((interaction) => {
			setTimeout(() => interaction.delete().catch((err) => {}), 15000)
		})
}
