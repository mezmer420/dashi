const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
	.setName("shuffle")
	.setDescription("Shuffles the queue")

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

	queue.shuffle()

	await interaction
		.editReply({
			content: `The queue of ${queue.tracks.length} songs have been shuffled!`,
		})
		.catch((err) => {})
		.then((interaction) => {
			setTimeout(() => interaction.delete().catch((err) => {}), 15000)
		})
}
