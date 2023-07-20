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
	const data = target.attachments.toJSON()

	let embeds = []

	data.forEach((item) => {
		if (item.contentType.startsWith("image/")) {
			const embed = new EmbedBuilder()
				.setColor(defaultColor)
				.setTitle(item.name)
				.setURL(item.url)
				.addFields(
					{
						name: "‎",
						value: `[Bing](https://www.bing.com/images/searchbyimage?cbir=sbi&imgurl=${item.url})`,
						inline: true,
					},
					{
						name: "‎",
						value: `[Google](https://www.google.com/searchbyimage?sbisrc=1&image_url=${item.url})`,
						inline: true,
					},
					{
						name: "‎",
						value: `[Google Lens](https://lens.google.com/uploadbyurl?url=${item.url})`,
						inline: true,
					},
					{
						name: "‎",
						value: `[ImgOps](https://imgops.com/specialized+reverse/${item.url})`,
						inline: true,
					},
					{
						name: "‎",
						value: `[IQDB](https://iqdb.org/?url=${item.url})`,
						inline: true,
					},
					{
						name: "‎",
						value: `[Reddit](http://karmadecay.com/search?q=${item.url})`,
						inline: true,
					},
					{
						name: "‎",
						value: `[SauceNAO](https://saucenao.com/search.php?db=999&url=${item.url})`,
						inline: true,
					},
					{
						name: "‎",
						value: `[TinEye](https://tineye.com/search?url=${item.url})`,
						inline: true,
					},
					{
						name: "‎",
						value: `[Yandex](https://yandex.com/images/search?url=${item.url}&rpt=imageview)`,
						inline: true,
					}
				)
				.setThumbnail(item.url)

			embeds.push(embed)
		}
	})

	if (embeds.length === 0) {
		return await interaction
			.editReply({
				content:
					"Message must contain image(s) (GIFs/videos unsupported)",
			})
			.catch((err) => {})
	}

	await interaction
		.editReply({
			embeds: embeds,
		})
		.catch((err) => {})
}
