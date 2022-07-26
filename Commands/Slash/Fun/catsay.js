const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
	.setName("catsay")
	.setDescription("Make The Cat say thing of your choice")
	.addStringOption((option) =>
		option
			.setName("text")
			.setDescription("The text to say")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction }) => {
	const text = interaction.options.getString("text")

	await interaction
		.editReply({
			files: [
				{
					attachment: `https://cataas.com/cat/cute/says/${text}`,
					name: "catsay.png",
				},
			],
		})
		.catch((err) => {})
}
