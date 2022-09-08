const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActivityType,
} = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("setcounter")
	.setDescription("Set the number counter")
	.addIntegerOption((option) =>
		option
			.setName("number")
			.setDescription("The number to set to")
			.setRequired(true)
	)

module.exports.category = "Owner"

module.exports.run = async ({ client, interaction, Counting }) => {
	if (interaction.member.id !== "527285622809952256") {
		return await interaction
			.editReply({
				content: "Only mezmer420 can use this command",
			})
			.catch((err) => {})
	}

	const number = interaction.options.getInteger("number")

	let getCount = await Counting.findOne()

	if (!getCount) {
		getCount = await Counting.create({ number: 1 })
	}

	const oldNumber = getCount.number

	await Counting.update({ number: number }, { where: { number: oldNumber } })

	await interaction
		.editReply({
			content: `✅ | Set number count from ${oldNumber} to **${number}**`,
		})
		.catch((err) => {})
}
