const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("pp")
	.setDescription("PP size")
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("User to PP rate")
			.setRequired(true)
	)

module.exports.category = "Fun"

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const member = interaction.options.getMember("user")

	const size = Math.floor(Math.random() * 21)

	let PP = "8"

	for (let i = 0; i < size; i++) {
		PP += "="
	}

	PP += "D"

	const Embed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle(`${member.displayName}'s PP`)
		.setDescription(PP)

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
