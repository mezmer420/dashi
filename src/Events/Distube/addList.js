const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "addList",
	async run(client, queue, playlist, defaultColor) {
		const songRequests = await client.channels.cache.get(
			"992630810186367016"
		)

		songRequests
			.send({
				embeds: [
					new EmbedBuilder()
						.setColor(defaultColor)
						.setDescription(
							`🎶 | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs)`
						),
				],
			})
			.catch((err) => {
				console.log(err)
			})
			.then((message) => {
				setTimeout(() => message.delete().catch((err) => {}), 15000)
			})
	},
}
