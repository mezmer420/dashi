const { SlashCommandBuilder } = require("@discordjs/builders")
const { createWorker } = require("tesseract.js")

module.exports.data = new SlashCommandBuilder()
	.setName("image-to-text")
	.setDescription("Convert image to text (experimental!)")
	.addAttachmentOption((option) =>
		option
			.setName("image")
			.setDescription("The image you want to be converted to text")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction }) => {
	const image = interaction.options.getAttachment("image")

	try {
		const worker = createWorker()

		await worker.load().catch((err) => {
			console.log(err)
		})
		await worker.loadLanguage("eng").catch((err) => {
			console.log(err)
		})
		await worker.initialize("eng").catch((err) => {
			console.log(err)
		})
		const {
			data: { text },
		} = await worker.recognize(image.url).catch((err) => {
			console.log(err)
		})
		await worker.terminate().catch((err) => {
			console.log(err)
		})

		await interaction
			.editReply({
				content: `${text}`,
			})
			.catch((err) => {
				console.log(err)
			})
	} catch (err) {
		console.log(err)
	}
}
