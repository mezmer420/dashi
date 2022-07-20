const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "emojiDelete",
	async execute(client, emoji) {
		const logs = await client.channels.cache.get("955948174894325782")

		const Embed = new EmbedBuilder()
			.setTitle("👋 Emoji Deleted")
			.setDescription(
				`Emoji Name: **${emoji.name}**`
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
