const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "channelUpdate",
	async execute(client, oldChannel, newChannel, defaultColor) {
		const logs = await client.channels.cache.get("955948174894325782")

		if (oldChannel.name !== newChannel.name) {
			const nameEmbed = new EmbedBuilder()
				.setTitle("🌼 Channel Update")
				.addFields({
					name: "Channel Name Changed",
					value: `**#${oldChannel.name}** -> **#${newChannel.name}**`,
				})
				.setColor(defaultColor)
				.setTimestamp()

			return logs
				.send({
					embeds: [nameEmbed],
				})
				.catch((err) => {
					console.log(err)
				})
		} else if (oldChannel.topic !== newChannel.topic) {
			if (!oldChannel.topic) {
				const topicEmbed = new EmbedBuilder()
					.setTitle("🌼 Channel Update")
					.addFields({
						name: "Channel Topic Added",
						value: `<#${newChannel.id}>:\n**${newChannel.topic}**`,
					})
					.setColor(defaultColor)
					.setTimestamp()

				return logs
					.send({
						embeds: [topicEmbed],
					})
					.catch((err) => {
						console.log(err)
					})
			} else if (!newChannel.topic) {
				const topicEmbed = new EmbedBuilder()
					.setTitle("🌼 Channel Update")
					.addFields({
						name: "Channel Topic Removed",
						value: `<#${newChannel.id}>:\n**${oldChannel.topic}**\n->\n(none)`,
					})
					.setColor(defaultColor)
					.setTimestamp()

				return logs
					.send({
						embeds: [topicEmbed],
					})
					.catch((err) => {
						console.log(err)
					})
			} else {
				const topicEmbed = new EmbedBuilder()
					.setTitle("🌼 Channel Update")
					.addFields({
						name: "Channel Topic Changed",
						value: `<#${newChannel.id}>:\n**${oldChannel.topic}**\n->\n**${newChannel.topic}**`,
					})
					.setColor(defaultColor)
					.setTimestamp()

				return logs
					.send({
						embeds: [topicEmbed],
					})
					.catch((err) => {
						console.log(err)
					})
			}
		} else if (oldChannel.nsfw !== newChannel.nsfw) {
			const nsfwEmbed = new EmbedBuilder()
				.setTitle("🌼 Channel Update")
				.addFields({
					name: "Channel NSFW Changed",
					value: `<#${newChannel.id}>: **${oldChannel.nsfw}** -> **${newChannel.nsfw}**`,
				})
				.setColor(defaultColor)
				.setTimestamp()

			return logs
				.send({
					embeds: [nsfwEmbed],
				})
				.catch((err) => {
					console.log(err)
				})
		}
	},
}
