const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
} = require("discord.js")
const translate = require("@iamtraction/google-translate")

module.exports.data = new ContextMenuCommandBuilder()
	.setName("Translate")
	.setType(ApplicationCommandType.Message)

module.exports.category = "Utilities"

module.exports.run = async ({ client, interaction, defaultColor }) => {
	await interaction.deferReply({ ephemeral: true }).catch((err) => {
		console.log(err)
	})

	const { channel, targetId } = interaction

	const query = await channel.messages.fetch({ message: targetId })
	const raw = query.content

	const translated = await translate(query, { to: "en" })

	const Embed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle("Translation")
		.addFields(
			{ name: "Raw", value: "```" + raw + "```" },
			{ name: "Translated", value: "```" + translated.text + "```" }
		)
		.setFooter({ text: "Powered by Google Translate" })

	return await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
