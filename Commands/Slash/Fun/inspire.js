const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")

module.exports.data = new SlashCommandBuilder()
	.setName("inspire")
	.setDescription("Sends something inspiring")
	// .addSubcommand((subcommand) =>
	// 	subcommand
	// 		.setName("affirmation")
	// 		.setDescription("Sends something inspiring")
	// )
	// .addSubcommand((subcommand) =>
	// 	subcommand
	// 		.setName("degradation")
	// 		.setDescription("Sends something not so inspiring")
	// )

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const Options = interaction.options.getSubcommand()

	// switch (Options) {
	// 	case "affirmation": {
			let data = await fetch("https://www.affirmations.dev/")

			data = await data.json()

			return await interaction
				.editReply({
					content: data.affirmation,
				})
				.catch((err) => {})
		// }

		// case "degradation": {
        //     // https://rapidapi.com/Lakerolmaker/api/insult-generator

		// 	let data = await fetch(
		// 		"https://evilinsult.com/generate_insult.php?lang=en&type=json"
		// 	)

		// 	data = await data.json()

		// 	return await interaction
		// 		.editReply({
		// 			content: data.insult,
		// 		})
		// 		.catch((err) => {})
		// }
	// }
}
