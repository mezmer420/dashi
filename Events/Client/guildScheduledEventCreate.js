const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "guildScheduledEventCreate",
	async execute(client, guildScheduledEvent, defaultColor) {
		const logs = await client.channels.cache.get("955948174894325782")
		const anno = await client.channels.cache.get("946442711936938034")

		const startts = new Date(
			guildScheduledEvent.scheduledStartTimestamp + 3600000
		)
		const endts = new Date(
			guildScheduledEvent.scheduledEndTimestamp + 3600000
		)

		const starttime = startts.toLocaleString()
		const endtime = endts.toLocaleString()

		const Embed = new EmbedBuilder()
			.setTitle("🎉 New Event")
			.setDescription(
				`Event Name: **${guildScheduledEvent.name}**\nStarts At: **${starttime} EST**\nEnds At: **${endtime} EST**`
			)
			.setColor(defaultColor)
			.setTimestamp()

		logs.send({
			embeds: [Embed],
		}).catch((err) => {
			console.log(err)
		})

		// anno.send({
		// 	embeds: [Embed],
		// }).catch((err) => {
		// 	console.log(err)
		// })
	},
}
