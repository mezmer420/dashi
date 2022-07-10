const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "guildBanRemove",
	async execute(client, ban) {
		const logs = await client.channels.cache.get("955948174894325782")

		const Embed = new MessageEmbed()
			.setTitle(`🦋 Member Unbanned — ${ban.user.tag}`)
			.setDescription(`<@${ban.user.id}> was unbanned from the server`)
			.setColor("GREEN")
			.setThumbnail(`${ban.user.displayAvatarURL()}`)
			.setFooter({ text: `Member ID: ${ban.user.id}` })
			.setTimestamp()

		logs.send({
			embeds: [Embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
