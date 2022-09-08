const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
} = require("discord.js")

module.exports.data = new ContextMenuCommandBuilder()
	.setName("RawMessage")
	.setType(ApplicationCommandType.Message)

module.exports.category = "Info"

module.exports.run = async ({ client, interaction }) => {
	await interaction.deferReply({ ephemeral: true }).catch((err) => {
		console.log(err)
	})

	const { guild, targetId } = interaction

	const target = await interaction.channel.messages.fetch(targetId)

	console.log(target)

	const content =
		target.content.length > 0 ? `content: ${target.content}` : "no content"

	const firstEmbed = target.embeds[0]
		? function firstembed() {
				const firstEmbedData = JSON.stringify(target.embeds[0].data)
				return `first embed: ${firstEmbedData}`
		  }
		: "no embeds"

	const attachmentsRaw = target.attachments.toJSON()

	let attachments =
		attachmentsRaw.length > 0 ? "attachments:" : "no attachments"

	if (attachmentsRaw.length > 0) {
		for (let i = 0; i < attachmentsRaw.length; i++) {
			attachments += `\nattachment #${i + 1}\nattachment: ${
				attachmentsRaw[i].attachment
			}\nname: ${attachmentsRaw[i].name}\nid: ${
				attachmentsRaw[i].id
			}\nsize: ${attachmentsRaw[i].size}`
		}
	}

	return await interaction.editReply({
		content: `${content}\n${firstEmbed}\n${attachments}`,
	})
	// .catch((err) => {})
}
