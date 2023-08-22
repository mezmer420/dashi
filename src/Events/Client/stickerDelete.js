const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "stickerDelete",
	async run(client, sticker, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)

		const embed = new EmbedBuilder()
			.setTitle("👋 Sticker Deleted")
			.setDescription(`Sticker Name: **${sticker.name}**`)
			.setColor(defaultColor)
			.setTimestamp()

		logs.send({
			embeds: [embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
