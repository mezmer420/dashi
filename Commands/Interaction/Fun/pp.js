const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("pp")
	.setDescription("PP size")
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("User to PP rate")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const member = interaction.options.getMember("user")

	let size = Math.floor(Math.random() * 21)

	if (member.id === "826841451945787412") {
		// choc
		size = Math.floor(size * 0.3)
	}

	let PP = "8"

	for (let i = 0; i < size; i++) {
		PP += "="
	}

	PP += "D"

	const embed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle(`${member.displayName}'s PP`)
		.setDescription(PP)

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
