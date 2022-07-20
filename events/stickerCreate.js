const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "stickerCreate",
	async execute(client, sticker) {
		const logs = await client.channels.cache.get("955948174894325782")

		const Embed = new EmbedBuilder()
			.setTitle("🆕 Sticker Created")
			.setDescription(
				`Sticker Name: **${sticker.name}**`
			)
			.setColor("#9BDBF5")
			.setTimestamp()

		logs.send({
			embeds: [Embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
