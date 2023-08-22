const { EmbedBuilder, MessageSelectMenu } = require("discord.js")

module.exports = {
	name: "guildMemberUpdate",
	async run(client, oldMember, newMember, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)

		if (oldMember.nickname !== newMember.nickname) {
			const oldNickname = oldMember.nickname ?? oldMember.user.username
			const newNickname = newMember.nickname ?? newMember.user.username

			const embed = new EmbedBuilder()
				.setTitle(`${newMember.user.tag}`)
				.setDescription(`<@${newMember.user.id}>`)
				.addFields({
					name: "📝 Member Nickname Changed",
					value: `**${oldNickname}** -> **${newNickname}**`,
				})
				.setColor(defaultColor)
				.setTimestamp()
				.setThumbnail(
					`${newMember.displayAvatarURL({
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
		}
	},
}
