const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
} = require("discord.js")
const translate = require("@iamtraction/google-translate")

module.exports.category = "Context"

module.exports.data = new ContextMenuCommandBuilder()
	.setName("Translate")
	.setType(ApplicationCommandType.Message)

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const { channel, targetId } = interaction

	const query = await channel.messages.fetch({ message: targetId })
	const raw = query.content

	if (!raw) {
		return await interaction
			.editReply({
				content: "I can only translate messages with message content!",
			})
			.catch((err) => {})
	}

	const translated = await translate(query, { to: "en" })

	const embed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle("Translation")
		.addFields(
			{ name: "Raw", value: "```" + raw + "```" },
			{ name: "Translated", value: "```" + translated.text + "```" }
		)
		.setFooter({ text: "Powered by Google Translate" })

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
