const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const os = require("os")

module.exports.data = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("Pong!")

module.exports.run = async ({ client, interaction, defaultColor }) => {
	interaction.channel
		.send("Calculating...")
		.catch((err) => {})
		.then(async (msg) => {
			const ping = msg.createdTimestamp - interaction.createdTimestamp

			const days = Math.floor(client.uptime / 86400000)
			const hours = Math.floor(client.uptime / 3600000) % 24
			const minutes = Math.floor(client.uptime / 60000) % 60
			const seconds = Math.floor(client.uptime / 1000) % 60

			const Embed = new EmbedBuilder()
				.setColor(defaultColor)
				.setTitle("🏓 Pong!")
				.addFields(
					{ name: "Bot Latency", value: `${ping} ms`, inline: true },
					{
						name: "API Latency",
						value: `${client.ws.ping} ms`,
						inline: true,
					},
					{
						name: "Memory Usage",
						value: `${(
							process.memoryUsage().heapUsed /
							1024 /
							1024
						).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(
							2
						)} MB`,
						inline: true,
					},
					// {
					// 	name: "CPU Usage",
					// 	value: `${}`,
					// 	inline: true
					// },
					{
						name: "Uptime",
						value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, and \`${seconds}\` seconds`,
					}
				)
				.setTimestamp()

			return await interaction
				.editReply({
					embeds: [Embed],
				})
				.catch((err) => {})
				.then(msg.delete().catch((err) => {}))
		})
}
