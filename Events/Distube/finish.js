const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "finish",
	async run(client, queue, defaultColor) {
		const songRequests = await client.channels.cache.get(
			"992630810186367016"
		)

		songRequests
			.send({
				embeds: [
					new EmbedBuilder()
						.setColor(defaultColor)
						.setDescription(`🎶 | Queue finished`),
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
