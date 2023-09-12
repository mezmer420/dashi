const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "error",
	async run(client, channel, error, defaultColor) {
		const songRequests = await client.channels.cache.get(
			"1150910175516041266"
		)

		console.log(new Date().toLocaleString() + "\n" + error)

		songRequests
			.send({
				embeds: [
					new EmbedBuilder()
						.setColor(defaultColor)
						.setDescription("❌ | An error occured"),
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
