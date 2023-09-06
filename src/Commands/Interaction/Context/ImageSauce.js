const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
} = require("discord.js")

module.exports.category = "Context"

module.exports.data = new ContextMenuCommandBuilder()
	.setName("ImageSauce")
	.setType(ApplicationCommandType.Message)

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const { targetId } = interaction

	const target = await interaction.channel.messages.fetch(targetId)

	let embeds = []

	function createEmbeds(item, type, url) {
		const embed = new EmbedBuilder()
			.setColor(defaultColor)
			.setURL(url)
			.addFields(
				{
					name: "‎",
					value: `[Bing](https://www.bing.com/images/searchbyimage?cbir=sbi&imgurl=${url})`,
					inline: true,
				},
				{
					name: "‎",
					value: `[Google](https://www.google.com/searchbyimage?sbisrc=1&image_url=${url})`,
					inline: true,
				},
				{
					name: "‎",
					value: `[Google Lens](https://lens.google.com/uploadbyurl?url=${url})`,
					inline: true,
				},
				{
					name: "‎",
					value: `[ImgOps](https://imgops.com/specialized+reverse/${url})`,
					inline: true,
				},
				{
					name: "‎",
					value: `[IQDB](https://iqdb.org/?url=${url})`,
					inline: true,
				},
				{
					name: "‎",
					value: `[Reddit](http://karmadecay.com/search?q=${url})`,
					inline: true,
				},
				{
					name: "‎",
					value: `[SauceNAO](https://saucenao.com/search.php?db=999&url=${url})`,
					inline: true,
				},
				{
					name: "‎",
					value: `[TinEye](https://tineye.com/search?url=${url})`,
					inline: true,
				},
				{
					name: "‎",
					value: `[Yandex](https://yandex.com/images/search?url=${url}&rpt=imageview)`,
					inline: true,
				}
			)
			.setThumbnail(url)

		if (type === "attachment") {
			embed.setTitle(item.name)
		} else if (type === "embed") {
			embed.setTitle("Media")
		}

		embeds.push(embed)
	}

	const messageAttachments = target.attachments.toJSON()

	messageAttachments.forEach((item) => {
		if (item.contentType.startsWith("image/")) {
			createEmbeds(item, "attachment", item.url)
		}
	})

	const messageEmbeds = target.embeds

	messageEmbeds.forEach((item) => {
		if (item.data.type === "image") {
			createEmbeds(item, "embed", item.data.url)
		}
	})

	if (embeds.length === 0) {
		return await interaction
			.editReply({
				content: "Message must contain image(s) (videos unsupported)",
			})
			.catch((err) => {})
	}

	await interaction
		.editReply({
			embeds: embeds,
		})
		.catch((err) => {})
}
