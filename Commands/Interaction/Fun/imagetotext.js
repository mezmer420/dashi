const { SlashCommandBuilder } = require("discord.js")
const { createWorker } = require("tesseract.js")

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("imagetotext")
	.setDescription("Convert image to text (A.I.!)")
	.addAttachmentOption((option) =>
		option
			.setName("image")
			.setDescription("The image you want to be converted to text")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction }) => {
	const image = interaction.options.getAttachment("image")

	try {
		const worker = await createWorker()

		await worker.loadLanguage("eng")

		await worker.initialize("eng")

		const {
			data: { text },
		} = await worker.recognize(image.url)

		if (!text) {
			return await interaction.editReply({
				content: "Couldn't detect any text",
			})
		}

		await interaction.editReply({
			content: text,
		})

		await worker.terminate()
	} catch (err) {
		console.log(err)
	}
}
