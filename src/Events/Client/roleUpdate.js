const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "roleUpdate",
	async run(client, oldRole, newRole, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)

		if (oldRole.name !== newRole.name) {
			const embed = new EmbedBuilder()
				.setTitle("🌼 Role Update")
				.addFields({
					name: "Role Name Changed",
					value: `**${oldRole.name}** -> **${newRole.name}**`,
				})
				.setColor(defaultColor)
				.setTimestamp()

			return logs
				.send({
					embeds: [embed],
				})
				.catch((err) => {
					console.log(err)
				})
		}
	},
}
