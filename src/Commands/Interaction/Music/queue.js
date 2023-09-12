const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Music"

module.exports.data = new SlashCommandBuilder()
	.setName("queue")
	.setDescription(
		"Displays the current song queue and displays info about the currently playing song"
	)
	.addNumberOption((option) =>
		option
			.setName("page")
			.setDescription("Page number of the queue")
			.setMinValue(1)
			.setRequired(false)
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

	const queue = client.distube.getQueue(interaction.guildId)

	if (!queue) {
		return await interaction
			.editReply({ content: "There is nothing playing" })
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	const totalPages = Math.ceil(queue.songs.length / 10) || 1
	const page = (interaction.options.getNumber("page") || 1) - 1

	if (page + 1 > totalPages) {
		return await interaction
			.editReply({
				content: `Invalid page. There exists only ${totalPages} page(s) of songs`,
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	let queueString = queue.songs
		.slice(page * 10 + 1, page * 10 + 10 + 1)
		.map((song, i) => {
			return `**${page * 10 + i + 1}.** \`[${
				song.formattedDuration
			}]\` [${song.name}](${song.url})\n${song.user}`
		})
		.join("\n\n")

	if (!queueString) {
		queueString = "None"
	}

	const currentSong = queue.songs[0]

	const status = `Filters: \`${
		queue.filters.names.join(", ") || "Off"
	}\` | Loop: \`${
		queue.repeatMode ? (queue.repeatMode === 2 ? "Queue" : "Song") : "Off"
	}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``

	const progressUnrounded = queue.currentTime / currentSong.duration
	const progress = ((queue.currentTime / currentSong.duration) * 100).toFixed(
		1
	)

	let progressInfo = `Progress: ${progress}%`

	if (
		queue.filters.names.includes("nightcore") ||
		queue.filters.names.includes("vaporwave")
	) {
		progressInfo = `Progress: ${progress}% (based on original song speed)`
	}

	const progressBar =
		"-".repeat(Math.floor(progressUnrounded * 50)) +
		"🔘" +
		"-".repeat(50 - Math.floor(progressUnrounded * 50))

	await interaction
		.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(defaultColor)
					.setDescription(
						`**Currently Playing**\n` +
							(currentSong
								? `\`[${queue.formattedCurrentTime}]\`/\`[${currentSong.formattedDuration}]\` [${currentSong.name}](${currentSong.url})\n|${progressBar}|\n${progressInfo}\nRequested by ${currentSong.user}`
								: "None") +
							`\n\n**Queue**\n${queueString}
							\n**Settings**\n${status}`
					)
					.setThumbnail(currentSong.thumbnail)
					.setFooter({ text: `Page ${page + 1} of ${totalPages}` })
					.setTimestamp(),
			],
		})
		.catch((err) => {})
		.then((interaction) => {
			setTimeout(() => interaction.delete().catch((err) => {}), 30000)
		})
}
