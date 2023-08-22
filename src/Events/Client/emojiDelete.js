const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "emojiDelete",
	async run(client, emoji, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)
		const auditLog = await emoji.guild.fetchAuditLogs()
		const logEntry = auditLog.entries.first()
		const { executor } = logEntry

		const embed = new EmbedBuilder()
			.setTitle("👋 Emoji Deleted")
			.setDescription(
				`Emoji Name: **${emoji.name}**\nDeleted by: <@${executor.id}>`
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
