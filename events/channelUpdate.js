const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "channelUpdate",
	async execute(client, oldChannel, newChannel) {
		const logs = await client.channels.cache.get("955948174894325782")

		if (oldChannel.name !== newChannel.name) {
			const nameEmbed = new MessageEmbed()
				.setTitle("🌼 Channel Update")
				.addField(
					"Channel Name Changed",
					`**#${oldChannel.name}** -> **#${newChannel.name}**`
				)
				.setColor("#9BDBF5")
				.setTimestamp()

			logs.send({
				embeds: [nameEmbed],
			}).catch((err) => {
				console.log(err)
			})
		} else if (oldChannel.topic !== newChannel.topic) {
			if (!oldChannel.topic) {
				const topicEmbed = new MessageEmbed()
					.setTitle("🌼 Channel Update")
					.addField(
						"Channel Topic Added",
						`<#${newChannel.id}>:\n**${newChannel.topic}**`
					)
					.setColor("#9BDBF5")
					.setTimestamp()

				logs.send({
					embeds: [topicEmbed],
				}).catch((err) => {
					console.log(err)
				})
			} else if (!newChannel.topic) {
				const topicEmbed = new MessageEmbed()
					.setTitle("🌼 Channel Update")
					.addField(
						"Channel Topic Removed",
						`<#${newChannel.id}>:\n**${oldChannel.topic}**\n->\n(none)`
					)
					.setColor("#9BDBF5")
					.setTimestamp()

				logs.send({
					embeds: [topicEmbed],
				}).catch((err) => {
					console.log(err)
				})
			} else {
				const topicEmbed = new MessageEmbed()
					.setTitle("🌼 Channel Update")
					.addField(
						"Channel Topic Changed",
						`<#${newChannel.id}>:\n**${oldChannel.topic}**\n->\n**${newChannel.topic}**`
					)
					.setColor("#9BDBF5")
					.setTimestamp()

				logs.send({
					embeds: [topicEmbed],
				}).catch((err) => {
					console.log(err)
				})
			}
		} else if (oldChannel.nsfw !== newChannel.nsfw) {
			const nsfwEmbed = new MessageEmbed()
				.setTitle("🌼 Channel Update")
				.addField(
					"Channel NSFW Changed",
					`<#${newChannel.id}>: **${oldChannel.nsfw}** -> **${newChannel.nsfw}**`
				)
				.setColor("#9BDBF5")
				.setTimestamp()

			logs.send({
				embeds: [nsfwEmbed],
			}).catch((err) => {
				console.log(err)
			})
		}
	},
}
