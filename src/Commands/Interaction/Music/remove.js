const { SlashCommandBuilder } = require("discord.js")

module.exports.category = "Music"

module.exports.data = new SlashCommandBuilder()
	.setName("remove")
	.setDescription("Removes a song # from the queue")
	.addIntegerOption((option) =>
		option
			.setName("songnumber")
			.setDescription("The song to remove")
			.setMinValue(1)
			.setRequired(true)
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

	const trackNum = interaction.options.getInteger("songnumber")

	if (trackNum > queue.songs.length - 1) {
		return await interaction
			.editReply({
				content: `Invalid track number. There exists only ${
					queue.songs.length - 1
				} songs in the queue`,
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	const song = queue.songs[trackNum]

	await queue.songs.splice(trackNum, 1)

	await interaction
		.editReply({
			content: `Removed song #${trackNum} — **${song.name}** — from the queue.`,
		})
		.catch((err) => {})
		.then((interaction) => {
			setTimeout(() => interaction.delete().catch((err) => {}), 15000)
		})
}
