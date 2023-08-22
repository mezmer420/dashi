const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "guildMemberRemove",
	async run(client, member, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)

		const embed = new EmbedBuilder()
			.setTitle(`👋 Member Left — ${member.user.tag}`)
			.setDescription(
				`<@${member.user.id}> left or was kicked/banned from the server`
			)
			.setColor("Red")
			.setThumbnail(
				`${member.displayAvatarURL({ size: 4096, dynamic: true })}`
			)
			.setFooter({ text: `Member ID: ${member.id}` })
			.setTimestamp()

		logs.send({
			embeds: [embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
