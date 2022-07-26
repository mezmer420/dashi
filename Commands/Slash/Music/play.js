const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("play")
	.setDescription("Load songs to play")
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

module.exports.run = async ({ client, interaction, Systems }) => {
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

	const query = interaction.options.getString("query")
	const url = interaction.options.getString("url")

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

	if (
		interaction.guild.members.me.voice.channelId &&
		interaction.member.voice.channel.id !==
			interaction.guild.members.me.voice.channelId
	) {
		const queue = await client.distube.getQueue(interaction.guild)

		if (queue) {
			return await interaction
				.editReply({
					content: `I'm already playing music in <#${interaction.guild.members.me.voice.channelId}>`,
				})
				.catch((err) => {})
				.then((interaction) => {
					setTimeout(
						() => interaction.delete().catch((err) => {}),
						10000
					)
				})
		}

		if (interaction.guild.members.me.voiceChannel !== undefined) {
			await interaction.guild.members.me.voiceChannel.leave().catch((err) => {})
		}
	}

	try {
		await client.distube.voices.join(interaction.member.voice.channel)
	} catch {}

	const Embed = new EmbedBuilder()

	if (interaction.options.getSubcommand() === "song") {
		let response = `**${query}**`

		if (query.includes(".") && query.includes("/")) {
			response = "that URL"
		}

		await interaction
			.editReply({
				content: `Searching for ${response}...`,
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})

		return await client.distube.play(interaction.member.voice.channel, query, {
			member: interaction.member,
			textChannel: interaction.channel,
			// message,
		})

		// const searchResult = await client.player.search(query, {
		// 	requestedBy: interaction.user,
		// 	searchEngine: QueryType.AUTO,
		// })

		// if (
		// 	!searchResult ||
		// 	!searchResult.tracks.length ||
		// 	searchResult.tracks.length === 0
		// ) {
		// let response = `No result for **${query}**`

		// if (query.includes(".") && query.includes("/")) {
		// 	response = "No result for that URL"
		// }

		// 	return await interaction
		// 		.editReply({
		// 			content: response,
		// 		})
		// 		.catch((err) => {})
		// 		.then((interaction) => {
		// 			setTimeout(
		// 				() => interaction.delete().catch((err) => {}),
		// 				10000
		// 			)
		// 		})
		// }

		// const song = searchResult.tracks[0]

		// await queue.addTrack(song)

		// Embed.setDescription(
		// 	`**[${song.title}](${song.url})** added to the Queue`
		// )
		// 	.setThumbnail(song.thumbnail)
		// 	.setFooter({ text: `Duration: ${song.duration}` })
	} else if (interaction.options.getSubcommand() === "playlisturl") {
		await interaction
			.editReply({
				content: `Searching for that URL...`,
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})

		return client.distube.play(interaction.member.voice.channel, url, {
			member: interaction.member,
			textChannel: interaction.channel,
		})

		// const searchResult = await client.player.search(url, {
		// 	requestedBy: interaction.user,
		// 	searchEngine: QueryType.YOUTUBE_PLAYLIST,
		// })
		// if (
		// 	!searchResult ||
		// 	!searchResult.tracks.length ||
		// 	searchResult.tracks.length === 0
		// ) {
		// 	return await interaction
		// 		.editReply({ content: "No result for that URL" })
		// 		.catch((err) => {})
		// 		.then((interaction) => {
		// 			setTimeout(
		// 				() => interaction.delete().catch((err) => {}),
		// 				10000
		// 			)
		// 		})
		// }
		// const playlist = searchResult.playlist
		// await queue.addTracks(searchResult.tracks)
		// Embed.setDescription(
		// 	`**${searchResult.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`
		// ).setThumbnail(playlist.thumbnail)
	}

	// await interaction
	// 	.editReply({
	// 		embeds: [Embed],
	// 	})
	// 	.catch((err) => {})
	// 	.then((interaction) => {
	// 		setTimeout(() => interaction.delete().catch((err) => {}), 10000)
	// 	})
}
