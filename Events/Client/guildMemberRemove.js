const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "guildMemberRemove",
	async execute(client, member, defaultColor) {
		const logs = await client.channels.cache.get("955948174894325782")
		// const anno = await client.channels.cache.get("946442711936938034")

		const Embed = new EmbedBuilder()
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
			embeds: [Embed],
		}).catch((err) => {
			console.log(err)
		})

		// anno.send({
		// 	embeds: [Embed],
		// }).catch((err) => {
		// 	console.log(err)
		// })
	},
}
