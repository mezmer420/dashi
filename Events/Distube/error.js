const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "error",
	async execute(client, channel, e, defaultColor) {
		const songrequests = await client.channels.cache.get(
			"992630810186367016"
		)

		const current = new Date()
		console.log(current.toLocaleString())
		console.log(e)

		songrequests
			.send({
				embeds: [
					new EmbedBuilder()
						.setColor(defaultColor)
						.setDescription(` ❌ | An error encountered`),
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
