const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "roleDelete",
	async execute(client, role, defaultColor) {
		const logs = await client.channels.cache.get("955948174894325782")

		const Embed = new EmbedBuilder()
			.setTitle("👋 Role Deleted")
			.setDescription(
				`Role Name: **${role.name}**`
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
