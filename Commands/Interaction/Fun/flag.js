const { SlashCommandBuilder } = require("discord.js")

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("flag")
	.setDescription("Convert image to a flag")
	.addAttachmentOption((option) =>
		option
			.setName("image")
			.setDescription("The image you want to be converted to a flag")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction }) => {
	const image = interaction.options.getAttachment("image")

	await interaction
		.editReply({
			content: `https://krikienoid.github.io/flagwaver/#?src=${image.url}`,
		})
		.catch((err) => {})
}
