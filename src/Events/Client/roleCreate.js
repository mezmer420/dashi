const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "roleCreate",
	async run(client, role, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)

		const embed = new EmbedBuilder()
			.setTitle("🆕 Role Created")
			.setDescription(`Role Name: **${role.name}**\nID: **${role.id}**`)
			.setColor(defaultColor)
			.setTimestamp()

		logs.send({
			embeds: [embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
