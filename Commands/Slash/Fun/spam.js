const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
	.setName("spam")
	.setDescription("Spam ping a user")
	.addUserOption((option) =>
		option
			.setName("victim")
			.setDescription("User to spam")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("message")
			.setDescription("Optional message to send")
			.setRequired(false)
	)

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

	if (getSpam) {
		return await interaction
			.editReply({
				content: "A spam is already active!",
			})
			.catch((err) => {})
	}

	const member = interaction.options.getMember("victim")
	const messagecontent = interaction.options.getString("message") || ""

	await Spam.update(
		{ starterid: interaction.member.id, active: true },
		{ where: { active: false } }
	)

	await interaction
		.editReply({
			content: "Spam started!",
		})
		.catch((err) => {})

	interval = setInterval(function () {
		interaction.channel
			.send(`<@${member.id}> ${messagecontent}`)
			.catch((err) => {})
	}, 2000)
}
