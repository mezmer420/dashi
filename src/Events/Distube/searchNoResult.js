const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "searchNoResult",
	async run(client, message, query, defaultColor) {
		const songRequests = await client.channels.cache.get(
			"1150910175516041266"
		)

		songRequests
			.send({
				embeds: [
					new EmbedBuilder()
						.setColor(defaultColor)
						.setDescription(
							` ❌ | No result found for \`${query}\`!`
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
