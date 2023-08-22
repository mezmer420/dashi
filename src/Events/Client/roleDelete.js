const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "roleDelete",
	async run(client, role, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)

		const embed = new EmbedBuilder()
			.setTitle("👋 Role Deleted")
			.setDescription(`Role Name: **${role.name}**`)
			.setColor(defaultColor)
			.setTimestamp()

		logs.send({
			embeds: [embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
