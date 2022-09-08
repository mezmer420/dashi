const { SlashCommandBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("dm")
	.setDescription("Make me DM a user")
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("The user to DM")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("message")
			.setDescription("The message to DM")
			.setRequired(true)
	)

module.exports.category = "Utilities"

module.exports.run = async ({ client, interaction }) => {
	const user = interaction.options.getMember("user")
	const message = interaction.options.getString("message")

	if (user.id === "956345939130482750") {
		return await interaction
			.editReply({
				content: "I can't DM myself idot",
			})
			.catch((err) => {})
	}

	user.send(message).catch(async (err) => {
		console.log(err)

		return await interaction
			.editReply({
				content: `Failed to send that message, please try again`,
			})
			.catch((err) => {})
	})

	await interaction
		.editReply({
			content: `**${message}** successsfully sent to **${user}**! (this message will autodelete)`,
		})
		.catch((err) => {})
		.then((interaction) => {
			setTimeout(() => interaction.delete().catch((err) => {}), 6000)
		})
}
