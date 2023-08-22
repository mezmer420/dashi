const { EmbedBuilder, MessageSelectMenu } = require("discord.js")

module.exports = {
	name: "userUpdate",
	async run(client, oldUser, newUser, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)

		const embed = new EmbedBuilder()
			.setTitle(`${newUser.tag}`)
			.setDescription(`<@${newUser.id}>`)
			.setColor(defaultColor)
			.setTimestamp()

		if (oldUser.username !== newUser.username) {
			embed
				.addFields({
					name: "📝 Member Username Changed",
					value: `**${oldUser.username}** -> **${newUser.username}**`,
				})
				.setThumbnail(
					`${newUser.displayAvatarURL({
						size: 4096,
						dynamic: true,
					})}`
				)

			return logs
				.send({
					embeds: [embed],
				})
				.catch((err) => {
					console.log(err)
				})
		} else if (oldUser.displayAvatarURL() !== newUser.displayAvatarURL()) {
			embed
				.addFields({
					name: "✈️ Member Display Avatar Changed",
					value: `${oldUser.displayAvatarURL()} -> ${newUser.displayAvatarURL()}`,
				})
				.setThumbnail(`${newUser.displayAvatarURL()}`)

			return logs
				.send({
					embeds: [embed],
				})
				.catch((err) => {
					console.log(err)
				})
		} else if (oldUser.avatarURL() !== newUser.avatarURL()) {
			embed
				.addFields({
					name: "✈️ Member Avatar Changed",
					value: `${oldUser.avatarURL()} -> ${newUser.avatarURL()}`,
				})
				.setThumbnail(`${newUser.avatarURL()}`)

			return logs
				.send({
					embeds: [embed],
				})
				.catch((err) => {
					console.log(err)
				})
		}
	},
}
