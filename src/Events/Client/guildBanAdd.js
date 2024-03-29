const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "guildBanAdd",
	async run(client, ban, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)

		const embed = new EmbedBuilder()
			.setTitle(`🔨 Member Banned — ${ban.user.tag}`)
			.setDescription(`<@${ban.user.id}> was banned from the server`)
			.setColor("Red")
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
