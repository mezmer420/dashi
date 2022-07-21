const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "roleCreate",
	async execute(client, role, defaultColor) {
		const logs = await client.channels.cache.get("955948174894325782")

		const Embed = new EmbedBuilder()
			.setTitle("🆕 Role Created")
			.setDescription(
				`Role Name: **${role.name}**\nID: **${role.id}**`
			)
			.setColor(defaultColor)
			.setTimestamp()

		logs.send({
			embeds: [Embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
