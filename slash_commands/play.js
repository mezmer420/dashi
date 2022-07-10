const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports.data = new SlashCommandBuilder()
	.setName("play")
	.setDescription("Loads songs from YouTube")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("song")
			.setDescription(
				"Enter either a URL or search keywords to load a single song"
			)
			.addStringOption((option) =>
				option
					.setName("query")
					.setDescription("The song's URL or search keywords")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("playlisturl")
			.setDescription(
				"Enter the URL of a YouTube playlist to load its contents"
			)
			.addStringOption((option) =>
				option
					.setName("url")
					.setDescription("The playlist's URL")
					.setRequired(true)
			)
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

	const query = interaction.options.getString("query")

	if (!interaction.member.voice.channel) {
		return await interaction
			.editReply({
				content: "You need to be in a VC to use this command",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	const queue = await client.player.createQueue(interaction.guild)

	try {
		if (!queue.connection) {
			await queue.connect(interaction.member.voice.channel)
		}
	} catch {
		await queue.destroy()

		return await interaction
			.editReply({
				content: "Error: couldn't join your voice channel",
			})
			.catch((err) => {})
	}

	let Embed = new MessageEmbed()

	if (interaction.options.getSubcommand() == "song") {
		const searchResult = await client.player.search(query, {
			requestedBy: interaction.user,
			searchEngine: QueryType.AUTO,
		})

		if (
			!searchResult ||
			!searchResult.tracks.length ||
			searchResult.tracks.length == 0
		) {
			let response = `No result for **${query}**`

			if (query.includes(".") && query.includes("/")) {
				response = "No result for that URL"
			}

			return await interaction
				.editReply({
					content: response,
				})
				.catch((err) => {})
				.then((interaction) => {
					setTimeout(
						() => interaction.delete().catch((err) => {}),
						10000
					)
				})
		}

		const song = searchResult.tracks[0]

		await queue.addTrack(song)

		Embed.setDescription(
			`**[${song.title}](${song.url})** added to the Queue`
		)
			.setThumbnail(song.thumbnail)
			.setFooter({ text: `Duration: ${song.duration}` })
	} else if (interaction.options.getSubcommand() == "playlisturl") {
		const searchResult = await client.player.search(url, {
			requestedBy: interaction.user,
			searchEngine: QueryType.YOUTUBE_PLAYLIST,
		})

		if (
			!searchResult ||
			!searchResult.tracks.length ||
			searchResult.tracks.length == 0
		) {
			return await interaction
				.editReply({ content: "No result for that URL" })
				.catch((err) => {})
				.then((interaction) => {
					setTimeout(
						() => interaction.delete().catch((err) => {}),
						10000
					)
				})
		}

		const playlist = searchResult.playlist

		await queue.addTracks(searchResult.tracks)

		Embed.setDescription(
			`**${searchResult.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`
		).setThumbnail(playlist.thumbnail)
	}

	if (!queue.playing) {
		await queue.play()
	}

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
		.then((interaction) => {
			setTimeout(() => interaction.delete().catch((err) => {}), 10000)
		})
}
