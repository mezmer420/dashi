const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Music"

module.exports.data = new SlashCommandBuilder()
	.setName("skip")
	.setDescription("Skips the current song")

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
			.editReply({
				content: "There are no songs in the queue",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	const currentSong = queue.songs[0]

	// if (currentSong.user.id !== interaction.member.id) {
	// 	if (currentSong.user.id !== client.user.id) {
	// 		if (interaction.member.id !== "527285622809952256") {
	// 			// const Member = Guild.members.cache.get("UserID")
	// 			return await interaction
	// 				.editReply({
	// 					content: "Only the user who added the song may skip it",
	// 				})
	// 				.catch((err) => {})
	// 				.then((interaction) => {
	// 					setTimeout(
	// 						() => interaction.delete().catch((err) => {}),
	// 						10000
	// 					)
	// 				})
	// 		}
	// 	}
	// }

	try {
		const song = await queue.skip()

		return await interaction
			.editReply({
				embeds: [
					new EmbedBuilder()
						.setColor(defaultColor)
						.setDescription(
							`**${currentSong.name}** was skipped!\nNow playing: **${song.name}**`
						)
						.setThumbnail(song.thumbnail),
				],
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 15000)
			})
	} catch {
		await queue.stop()

		return await interaction
			.editReply({
				embeds: [
					new EmbedBuilder()
						.setColor(defaultColor)
						.setDescription(
							`${currentSong.name} was skipped! No more songs in the queue, bye!`
						)
						.setThumbnail(currentSong.thumbnail),
				],
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 15000)
			})
	}
}
