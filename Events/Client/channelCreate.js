const { EmbedBuilder, ChannelType } = require("discord.js")

module.exports = {
	name: "channelCreate",
	async run(client, channel, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)
		const auditLog = await channel.guild.fetchAuditLogs()
		const logEntry = auditLog.entries.first()
		const { executor } = logEntry

		let channelType
		let channelNsfw = channel.nsfw

		switch (channel.type) {
			case ChannelType.GuildCategory:
				channelType = "GuildCategory"
				channelNsfw = "N/A"
				break
			case ChannelType.GuildVoice:
				channelType = "GuildVoice"
				break
			case ChannelType.GuildText:
				channelType = "GuildText"
				break
			default:
				channelType = "Unknown"
		}

		const embed = new EmbedBuilder()
			.setTitle("🆕 Channel Created")
			.setDescription(
				`Channel Name: **#${channel.name}**\nID: **${channel.id}**\nType: **${channelType}**\nNSFW: **${channelNsfw}**\nCreated by: <@${executor.id}>`
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
