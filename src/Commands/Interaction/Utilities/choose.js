const { SlashCommandBuilder } = require("discord.js")

module.exports.category = "Utilities"

module.exports.data = new SlashCommandBuilder()
	.setName("choose")
	.setDescription("I will choose something for you")
	.addStringOption((option) =>
		option
			.setName("1st")
			.setDescription("The 1st thing to choose from")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("2nd")
			.setDescription("The 2nd thing to choose from")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("3rd")
			.setDescription("The 3rd thing to choose from")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("4th")
			.setDescription("The 4th thing to choose from")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("5th")
			.setDescription("The 5th thing to choose from")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("6th")
			.setDescription("The 6th thing to choose from")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("7th")
			.setDescription("The 7th thing to choose from")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("8th")
			.setDescription("The 8th thing to choose from")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("9th")
			.setDescription("The 9th thing to choose from")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("10th")
			.setDescription("The 10th thing to choose from")
			.setRequired(false)
	)

module.exports.run = async ({ client, interaction }) => {
	const responseValues = [
		interaction.options.getString("1st"),
		interaction.options.getString("2nd"),
		interaction.options.getString("3rd"),
		interaction.options.getString("4th"),
		interaction.options.getString("5th"),
		interaction.options.getString("6th"),
		interaction.options.getString("7th"),
		interaction.options.getString("8th"),
		interaction.options.getString("9th"),
		interaction.options.getString("10th"),
	].filter(Boolean)

	const response =
		responseValues[Math.floor(Math.random() * responseValues.length)]

	await interaction
		.editReply({
			content: `I choose... **${response}**`,
		})
		.catch((err) => {})
}
