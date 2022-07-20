const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

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

	let filters = queue.filters.collection
	filters = Array.from(filters.values())

	function status() {
		return `Filters: \`${filters.join(", ") || "Off"}\`
		\nLoop: \`${
			queue.repeatMode
				? queue.repeatMode === 2
					? "Queue"
					: "Song"
				: "Off"
		}\`
		\nAutoplay: \`${queue.autoplay ? "On" : "Off"}\``
	}

	const progress = ((queue.currentTime / currentSong.duration) * 100).toFixed(
		1
	)

	let progressInfo = `Progress: ${progress}%`

	if (filters.includes("nightcore") || filters.includes("vaporwave")) {
		progressInfo = `Progress: ${progress}% (Note: current timestamp and progress is based on original song speed)`
	}

	await interaction
		.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(defaultColor)
					.setDescription(
						`**Currently Playing**\n` +
							(currentSong
								? `\`[${queue.formattedCurrentTime}]/[${currentSong.formattedDuration}]\` [${currentSong.name}](${currentSong.url})\n\n${progressInfo}\n\nRequested by ${currentSong.user}`
								: "None") +
							`\n\n**Queue**\n${queueString}
							\n\n**Settings**\n${status()}`
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
