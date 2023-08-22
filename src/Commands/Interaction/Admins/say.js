const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const wait = require("node:timers/promises").setTimeout

module.exports.category = "Admins"

module.exports.data = new SlashCommandBuilder()
	.setName("say")
	.setDescription("Make me say whatever you want anywhere >;)")
	.addStringOption((option) =>
		option
			.setName("message")
			.setDescription("The message I say")
			.setRequired(true)
	)
	.addChannelOption((option) =>
		option
			.setName("channel")
			.setDescription("The channel to say in")
			.setRequired(false)
	)
	.addIntegerOption((option) =>
		option
			.setName("typing")
			.setDescription("Time spent typing; default none")
			.setMinValue(1)
			.setMaxValue(30)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("pin")
			.setDescription("Pin the message or not; default no")
			.setRequired(false)
			.addChoices({ name: "Yes", value: "Yes" })
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

module.exports.run = async ({ client, interaction }) => {
	await interaction.deleteReply().catch((err) => {})

	const whatever = interaction.options.getString("message")
	const destination =
		interaction.options.getChannel("channel") || interaction.channel
	const typing = interaction.options.getInteger("typing")
	const pin = interaction.options.getString("pin") || "No"

	if (typing) {
		let remainingTypingDuration = typing

		while (remainingTypingDuration > 0) {
			const currentTypingDuration = Math.min(remainingTypingDuration, 10)

			await interaction.channel.sendTyping().catch((err) => {
				console.log(err)
			})
			await wait(currentTypingDuration * 1000)

			remainingTypingDuration -= currentTypingDuration
		}
	}

	destination
		.send(whatever)
		.catch((err) => {
			console.log(err)
		})
		.then((message) => {
			if (pin === "Yes") {
				message.pin().catch((err) => {
					console.log(err)
				})
			}
		})
}
