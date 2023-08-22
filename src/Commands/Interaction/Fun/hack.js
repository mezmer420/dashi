const { SlashCommandBuilder } = require("discord.js")
const wait = require("node:timers/promises").setTimeout

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("hack")
	.setDescription("heck someone")
	.addUserOption((option) =>
		option
			.setName("target")
			.setDescription("The user to heck")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction }) => {
	const victim = interaction.options.getMember("target")

	try {
		await interaction.editReply({
			content: `Hacking ${victim.displayName}....`,
		})

		await wait(1000)

		await interaction.editReply({
			content: `Finding ${victim.displayName}'s Email and Password.....`,
		})

		await wait(5000)
		
		await interaction.editReply({
			content: `E-Mail: ${victim.displayName}@gmail.com \nPassword: ********`,
		})

		await wait(3000)

		await interaction.editReply({
			content: "Finding Other Accounts.....",
		})

		await wait(6000)

		await interaction.editReply({
			content: "Setting up Epic Games Account.....",
		})

		await wait(6000)

		await interaction.editReply({
			content: "Hacking Epic Games Account......",
		})

		await wait(7000)

		await interaction.editReply({
			content: "Hacked Epic Games Account!!",
		})

		await wait(3000)

		await interaction.editReply({
			content: "Collecting Info.....",
		})

		await wait(7000)

		await interaction.editReply({
			content: "Selling data to FBI....",
		})

		await wait(3000)

		await interaction.editReply({
			content: `Finished hacking ${victim.displayName}`,
		})
	} catch (err) {}
}
