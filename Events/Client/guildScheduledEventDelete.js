const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "guildScheduledEventDelete",
	async run(
		client,
		guildScheduledEvent,
		defaultColor,
		logChannel,
		announcementsChannel
	) {
		const logs = await client.channels.cache.get(logChannel)
		const anno = await client.channels.cache.get(announcementsChannel)

		const embed = new EmbedBuilder()
			.setTitle("❌ Event Cancelled")
			.setDescription(`Event Name: **${guildScheduledEvent.name}**`)
			.setColor(defaultColor)
			.setTimestamp()

		logs.send({
			embeds: [embed],
		}).catch((err) => {
			console.log(err)
		})

		// anno.send({
		// 	embeds: [embed],
		// }).catch((err) => {
		// 	console.log(err)
		// })
	},
}
