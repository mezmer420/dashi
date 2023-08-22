const { SlashCommandBuilder } = require("discord.js")

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("stopspam")
	.setDescription("Stop the existing spam")

module.exports.run = async ({ client, interaction, Spam }) => {
	if (interaction.channel.id !== "945527434655187006") {
		return await interaction
			.editReply({
				content:
					"You can only use that command in <#945527434655187006>! (this message will autodelete)",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 6000)
			})
	}

	const getSpam = await Spam.findOne({ where: { active: true } })

	if (!getSpam) {
		return await interaction
			.editReply({
				content: "There's no existing spam",
			})
			.catch((err) => {})
	}

	const starter = await getSpam.starterid

	if (
		interaction.member.id !== starter &&
		interaction.member.id !== "527285622809952256"
	) {
		return await interaction
			.editReply({
				content: "You are not permitted to stop the current spam.",
			})
			.catch((err) => {})
	}

	await Spam.update({ active: false }, { where: { active: true } })

	clearInterval(interval)

	await interaction
		.editReply({
			content: "Spam stopped",
		})
		.catch((err) => {})
}
