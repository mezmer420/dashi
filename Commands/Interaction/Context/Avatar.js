const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
} = require("discord.js")

module.exports.category = "Context"

module.exports.data = new ContextMenuCommandBuilder()
	.setName("Avatar")
	.setType(ApplicationCommandType.User)

module.exports.run = async ({ client, interaction }) => {
	const { guild, targetId } = interaction

	const target = await guild.members.cache.get(targetId)

	const avatar = target.user.displayAvatarURL({ size: 4096, dynamic: true })

	const embed = new EmbedBuilder()
		.setTitle(`${target.displayName}'s Avatar`)
		.setColor("Random")
		.setImage(avatar)

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
