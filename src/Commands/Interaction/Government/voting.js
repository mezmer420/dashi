const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports.category = "Government"

module.exports.data = new SlashCommandBuilder()
	.setName("voting")
	.setDescription("Start a server vote")
	.addStringOption((option) =>
		option
			.setName("message")
			.setDescription("The message to send")
			.setRequired(true)
	)
	.addChannelOption((option) =>
		option
			.setName("channel")
			.setDescription("The channel to send to")
			.setRequired(false)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)

for (i = 1; i <= 5; i++) {
	module.exports.data.addStringOption((option) =>
		option
			.setName(`emoji${i}`)
			.setDescription(`Reaction emoji ${i}`)
			.setRequired(false)
	)
}

module.exports.run = async ({ client, interaction }) => {
	const whatever = interaction.options.getString("message")

	const voting =
		interaction.options.getChannel("channel") ||
		(await client.channels.cache.get("939674946953682976")) // general

	const emoji1 = interaction.options.getString("emoji1") || "👍"
	const emoji2 = interaction.options.getString("emoji2") || "👎"
	const emoji3 = interaction.options.getString("emoji3")
	const emoji4 = interaction.options.getString("emoji4")
	const emoji5 = interaction.options.getString("emoji5")

	voting
		.send(whatever)
		.catch((err) => {})
		.then(async (msg) => {
			await msg.react(emoji1).catch((err) => {})
			await msg.react(emoji2).catch((err) => {})

			if (emoji3) {
				await msg.react(emoji3).catch((err) => {})
			}
			if (emoji4) {
				await msg.react(emoji4).catch((err) => {})
			}
			if (emoji5) {
				await msg.react(emoji5).catch((err) => {})
			}
		})

	interaction.deleteReply().catch((err) => {})
}
