const { SlashCommandBuilder } = require("discord.js")

module.exports.category = "Music"

module.exports.data = new SlashCommandBuilder()
	.setName("shuffle")
	.setDescription("Shuffles the queue")

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

	if (interaction.channel.id !== "1150910175516041266") {
		return await interaction
			.editReply({
				content:
					"You can only use that command in <#1150910175516041266>! (this message will autodelete)",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 6000)
			})
	}

	const queue = await client.distube.getQueue(interaction.guildId)

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

	if (queue.songs.length === 1) {
		return await interaction
			.editReply({
				content: "There are no songs in the queue to shuffle",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 15000)
			})
	}

	await queue.shuffle()

	await interaction
		.editReply({
			content: `The queue of ${
				queue.songs.length - 1
			} songs has been shuffled!`,
		})
		.catch((err) => {})
		.then((interaction) => {
			setTimeout(() => interaction.delete().catch((err) => {}), 15000)
		})
}
