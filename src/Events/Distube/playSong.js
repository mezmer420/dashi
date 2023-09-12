const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "playSong",
	async run(client, queue, song, defaultColor) {
		const songRequests = await client.channels.cache.get(
			"1150910175516041266"
		)

		songRequests
			.send({
				embeds: [
					new EmbedBuilder()
						.setColor(defaultColor)
						.setDescription(
							`🎶 | Now playing \`${song.name}\` — \`${song.formattedDuration}\``
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
