const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "guildBanRemove",
	async run(client, ban, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)

		const embed = new EmbedBuilder()
			.setTitle(`🦋 Member Unbanned — ${ban.user.tag}`)
			.setDescription(`<@${ban.user.id}> was unbanned from the server`)
			.setColor("Green")
			.setThumbnail(
				`${ban.user.displayAvatarURL({ size: 4096, dynamic: true })}`
			)
			.setFooter({ text: `Member ID: ${ban.user.id}` })
			.setTimestamp()

		logs.send({
			embeds: [embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
