const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

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

	if (!queue || !queue.playing) {
		return await interaction
			.editReply({ content: "There are no songs in the queue" })
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	const totalPages = Math.ceil(queue.tracks.length / 10) || 1
	const page = (interaction.options.getNumber("page") || 1) - 1

	if (page > totalPages) {
		return await interaction
			.editReply({
				content: `Invalid Page. There are only a total of ${totalPages} pages of songs`,
			})
			.catch((err) => {})
	}

	const queueString = queue.tracks
		.slice(page * 10, page * 10 + 10)
		.map((song, i) => {
			return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${
				song.title
			} -- <@${song.requestedBy.id}>`
		})
		.join("\n")

	const bar = queue.createProgressBar({
		queue: false,
		length: 19,
	})

	const currentSong = queue.current

	await interaction
		.editReply({
			embeds: [
				new MessageEmbed()
					.setDescription(
						`**Currently Playing**\n` +
							(currentSong
								? `\`[${currentSong.duration}]\` [${currentSong.title}](${currentSong.url})\n\n${bar}\nRequested by <@${currentSong.requestedBy.id}>`
								: "None") +
							`\n\n**Queue**\n${queueString}`
					)
					.setThumbnail(currentSong.thumbnail)
					.setFooter({ text: `Page ${page + 1} of ${totalPages}` })
					.setThumbnail(currentSong.setThumbnail)
					.setTimestamp(),
			],
		})
		.catch((err) => {})
		.then((interaction) => {
			setTimeout(() => interaction.delete().catch((err) => {}), 30000)
		})
}
