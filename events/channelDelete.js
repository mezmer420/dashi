const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "channelDelete",
	async execute(client, channel, defaultColor) {
		const logs = await client.channels.cache.get("955948174894325782")

		const Embed = new EmbedBuilder()
			.setTitle("👋 Channel Deleted")
			.setDescription(`Name: **#${channel.name}**`)
			.setColor(defaultColor)
			.setTimestamp()

		logs.send({
			embeds: [Embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
