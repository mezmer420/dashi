const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "channelDelete",
	async run(client, channel, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)
		const auditLog = await channel.guild.fetchAuditLogs()
		const logEntry = auditLog.entries.first()
		const { executor } = logEntry

		const embed = new EmbedBuilder()
			.setTitle("👋 Channel Deleted")
			.setDescription(
				`Name: **#${channel.name}**\nDeleted by: <@${executor.id}>`
			)
			.setColor(defaultColor)
			.setTimestamp()

		logs.send({
			embeds: [embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
