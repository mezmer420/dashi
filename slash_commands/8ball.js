const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("8ball")
	.setDescription("Ask the magic 8ball a question")
	.addStringOption((option) =>
		option
			.setName("question")
			.setDescription("The question you want to ask the magic 8ball")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction }) => {
	const inquiry = interaction.options.getString("question")
	const fortunes = [
		"yep!",
		"i guess",
		"probably not",
		"YES YES YES!!!11",
		"hell no",
		"um.. what?",
		"sorry, say again?",
		"what is that",
		"you know what just ask someone else",
		"i mean sure, if you believe",
		"without doubt",
		"without doubt      no",
		"sorry son",
		"possibly",
		"in one universe out of 9876567... yes",
	]
	const fortune = fortunes[Math.floor(Math.random() * fortunes.length)]

	const Embed = new MessageEmbed()
		.setColor("#9BDBF5")
		.setTitle(`${inquiry}`)
		.setDescription(`🎱 ${fortune}`)

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
