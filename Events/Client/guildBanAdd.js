const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "guildBanAdd",
	async execute(client, ban, defaultColor) {
		const logs = await client.channels.cache.get("955948174894325782")

		const Embed = new EmbedBuilder()
			.setTitle(`🔨 Member Banned — ${ban.user.tag}`)
			.setDescription(`<@${ban.user.id}> was banned from the server`)
			.setColor("Red")
			.setThumbnail(
				`${ban.user.displayAvatarURL({ size: 4096, dynamic: true })}`
			)
			.setFooter({ text: `Member ID: ${ban.user.id}` })
			.setTimestamp()

		logs.send({
			embeds: [Embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
