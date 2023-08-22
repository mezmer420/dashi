const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "guildScheduledEventCreate",
	async run(
		client,
		guildScheduledEvent,
		defaultColor,
		logChannel,
		announcementsChannel
	) {
		const logs = await client.channels.cache.get(logChannel)
		const anno = await client.channels.cache.get(announcementsChannel)

		const startTime = new Date(
			guildScheduledEvent.scheduledStartTimestamp + 3600000
		).toLocaleString()
		const endTime = new Date(
			guildScheduledEvent.scheduledEndTimestamp + 3600000
		).toLocaleString()

		const embed = new EmbedBuilder()
			.setTitle("🎉 New Event")
			.setDescription(
				`Event Name: **${guildScheduledEvent.name}**\nStarts At: **${startTime} EST**\nEnds At: **${endTime} EST**`
			)
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
