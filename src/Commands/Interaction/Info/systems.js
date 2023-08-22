const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Info"

module.exports.data = new SlashCommandBuilder()
	.setName("systems")
	.setDescription("View systems statuses")

module.exports.run = async ({ client, interaction, Systems, defaultColor }) => {
	const getStatus = async (system) => {
		const data = await Systems.findOne({ where: { system } })
		return data.online ? "🟢 Online" : "🔴 Offline"
	}

	const systems = [
		"XP",
		"Dialects",
		"General Responses",
		"Economy",
		"Music",
		"Waifus",
		"Birthdays",
		"Fricking",
		"Message Filter & Auto Warn",
		"Crazy Suppress",
		"Anti-crash Logging",
	]

	const fields = []

	for (const system of systems) {
		const status = await getStatus(system)
		fields.push({
			name: system,
			value: status,
			inline: true,
		})
	}

	// console.log(fields)

	const dashi = client.user

	const embed = new EmbedBuilder()
		.setColor(defaultColor)
		.setAuthor({
			name: "Systems",
			iconURL: dashi.displayAvatarURL({
				size: 4096,
				dynamic: true,
			}),
		})
		.addFields(...fields)
		.setTimestamp()
	// .setFooter({
	// 	text: "*Only controls logging; anti-crash system is always on",
	// })

	return await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
