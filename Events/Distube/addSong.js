const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "addSong",
	async run(client, queue, song, defaultColor) {
		const songRequests = await client.channels.cache.get(
			"992630810186367016"
		)

		songRequests
			.send({
				embeds: [
					new EmbedBuilder()
						.setColor(defaultColor)
						.setDescription(
							`🎶 | Added ${song.name} — \`${song.formattedDuration}\` to the queue by ${song.user}`
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
