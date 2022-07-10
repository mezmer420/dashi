const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
	.setName("say")
	.setDescription("Make me say whatever you want anywhere >;)")
	.addStringOption((option) =>
		option
			.setName("message")
			.setDescription("The message I say")
			.setRequired(true)
	)
	.addChannelOption((option) =>
		option
			.setName("channel")
			.setDescription("The channel to send in")
			.setRequired(false)
	)

module.exports.run = async ({ client, interaction }) => {
	if (interaction.member.id !== "527285622809952256") {
		return await interaction
			.editReply({
				content: "Only mezmer420 can use this command",
			})
			.catch((err) => {})
	}

	const whatever = interaction.options.getString("message")
	const destination =
		interaction.options.getChannel("channel") || interaction.channel

	await interaction.deleteReply().catch((err) => {})

	destination.send(whatever).catch((err) => {
		console.log(err)
	})
}
