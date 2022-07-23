const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "guildMemberAdd",
	async execute(client, member, defaultColor) {
		const logs = await client.channels.cache.get("955948174894325782")

		const createdts = new Date(member.user.createdTimestamp + 5 * 3600000)
		const createdtime = createdts.toLocaleString()

		const Embed = new EmbedBuilder()
			.setTitle(`🛬 Member Joined — ${member.user.tag}`)
			.setDescription(`<@${member.user.id}> joined the server`)
			.addFields({
				name: "Account Created at",
				value: `${createdtime}`,
			})
			.setColor("Green")
			.setThumbnail(
				`${member.displayAvatarURL({ size: 4096, dynamic: true })}`
			)
			.setFooter({ text: `Member ID: ${member.id}` })
			.setTimestamp()

		logs.send({
			embeds: [Embed],
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
