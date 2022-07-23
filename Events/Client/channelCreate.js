const { EmbedBuilder, ChannelType } = require("discord.js")

module.exports = {
	name: "channelCreate",
	async execute(client, channel, defaultColor) {
		const logs = await client.channels.cache.get("955948174894325782")

		let channeltype
		let channelnsfw = channel.nsfw

		if (channel.type === ChannelType.GuildCategory) {
			channeltype = "GuildCategory"
			channelnsfw = "N/A"
		} else if (channel.type === ChannelType.GuildVoice) {
			channeltype = "GuildVoice"
		} else if (channel.type === ChannelType.GuildText) {
			channeltype = "GuildText"
		}

		const Embed = new EmbedBuilder()
			.setTitle("🆕 Channel Created")
			.setDescription(
				`Channel Name: **#${channel.name}**\nID: **${channel.id}**\nType: **${channeltype}**\nNSFW: **${channelnsfw}**`
			)
			.setColor(defaultColor)
			.setTimestamp()

		logs.send({
			embeds: [Embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
