const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const os = require("os")

module.exports.category = "Info"

module.exports.data = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("Pong!")

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const first = await interaction
		.editReply({
			content: "Calculating...",
		})
		.catch((err) => {})

	const ping = first.createdTimestamp - interaction.createdTimestamp
	const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
		2
	)
	const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2)
	const days = Math.floor(client.uptime / 86400000)
	const hours = Math.floor(client.uptime / 3600000) % 24
	const minutes = Math.floor(client.uptime / 60000) % 60
	const seconds = Math.floor(client.uptime / 1000) % 60

	const embed = new EmbedBuilder()
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
				value: `${memoryUsage} / ${totalMemory} MB`,
				inline: true,
			},
			{
				name: "Uptime",
				value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, and \`${seconds}\` seconds`,
			}
		)
		.setTimestamp()

	await interaction
		.editReply({
			content: "",
			embeds: [embed],
		})
		.catch((err) => {})
}
