const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "guildMemberAdd",
	async run(client, member, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)

		const createdTime = new Date(
			member.user.createdTimestamp + 5 * 3600000
		).toLocaleString()

		const embed = new EmbedBuilder()
			.setTitle(`🛬 Member Joined — ${member.user.tag}`)
			.setDescription(`<@${member.user.id}> joined the server`)
			.addFields({
				name: "Account Created at",
				value: `${createdTime}`,
			})
			.setColor("Green")
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

		if (member.user.bot) return

		member
			.send(`${member.user.username}, welcome to Eoic Gamer Server!`)
			.catch((err) => {
				console.log(err)
			})
	},
}
