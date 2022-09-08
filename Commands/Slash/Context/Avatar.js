const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
} = require("discord.js")

module.exports.data = new ContextMenuCommandBuilder()
	.setName("Avatar")
	.setType(ApplicationCommandType.User)

module.exports.category = "Info"

module.exports.run = async ({ client, interaction }) => {
	await interaction.deferReply().catch((err) => {
		console.log(err)
	})

	const { guild, targetId } = interaction

	const target = await guild.members.cache.get(targetId)

	const avatar = target.user.displayAvatarURL({ size: 4096, dynamic: true })

	const Embed = new EmbedBuilder()
		.setTitle(`${target.displayName}'s Avatar`)
		.setColor("Random")
		.setImage(avatar)

	return await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
