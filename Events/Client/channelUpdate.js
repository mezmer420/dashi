const { EmbedBuilder, ChannelType } = require("discord.js")

module.exports = {
	name: "channelUpdate",
	async run(client, oldChannel, newChannel, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)
		const auditLog = await newChannel.guild.fetchAuditLogs()
		const logEntry = auditLog.entries.first()
		const { executor } = logEntry

		// console.log(oldChannel)
		// console.log(newChannel)

		const embed = new EmbedBuilder()
			.setTitle("🌼 Channel Update")
			.setDescription(
				`<#${newChannel.id}>\nUpdated by: <@${executor.id}>`
			)
			.setColor(defaultColor)
			.setTimestamp()

		if (oldChannel.name !== newChannel.name) {
			embed.addFields({
				name: "Channel Name Changed",
				value: `**#${oldChannel.name}** -> **#${newChannel.name}**`,
			})
		}
		if (oldChannel.type !== newChannel.type) {
			if (
				oldChannel.type === ChannelType.GuildText &&
				newChannel.type === ChannelType.AnnouncementThread
			) {
				embed.addFields({
					name: "Channel Type Changed",
					value: "TextChannel -> NewsChannel",
				})
			} else if (
				oldChannel.type === ChannelType.AnnouncementThread &&
				newChannel.type === ChannelType.GuildText
			) {
				embed.addFields({
					name: "Channel Type Changed",
					value: "NewsChannel -> TextChannel",
				})
			}
		}
		if (oldChannel.topic !== newChannel.topic) {
			if (!oldChannel.topic) {
				embed.addFields({
					name: "Channel Topic Added",
					value: `Topic:\n**${newChannel.topic}**`,
				})
			} else if (!newChannel.topic) {
				embed.addFields({
					name: "Channel Topic Removed",
					value: `**${oldChannel.topic}**\n->\n(none)`,
				})
			} else {
				embed.addFields({
					name: "Channel Topic Changed",
					value: `**${oldChannel.topic}**\n->\n**${newChannel.topic}**`,
				})
			}
		}
		if (oldChannel.nsfw !== newChannel.nsfw) {
			embed.addFields({
				name: "Channel NSFW Changed",
				value: `**${oldChannel.nsfw}** -> **${newChannel.nsfw}**`,
			})
		}

		if (embed.data.fields) {
			await logs
				.send({
					embeds: [embed],
				})
				.catch((err) => {
					console.log(err)
				})
		}
	},
}
