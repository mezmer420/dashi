const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "playSong",
	async execute(client, queue, song, defaultColor) {
		const songrequests = await client.channels.cache.get(
			"992630810186367016"
		)

		songrequests
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
