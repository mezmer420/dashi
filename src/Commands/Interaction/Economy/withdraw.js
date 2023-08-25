const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Economy"

module.exports.data = new SlashCommandBuilder()
	.setName("withdraw")
	.setDescription("Withdraw Dashcoins from bank")
	.addIntegerOption((option) =>
		option
			.setName("amount")
			.setDescription("The amount to withdraw")
			.setMinValue(1)
			.setMaxValue(5000)
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction, Systems, Economy }) => {
	const getEconomy = await Systems.findOne({
		where: { system: "Economy" },
	})

	if (getEconomy.online === false) {
		return await interaction
			.editReply({
				content: "The Economy system is currently disabled",
			})
			.catch((err) => {})
	}

	const amount = interaction.options.getInteger("amount")

	const getUser =
		(await Economy.findOne({
			where: { id: interaction.member.id },
		})) ||
		(await Economy.create({
			id: interaction.member.id,
			wallet: 0,
			bank: 0,
		}))

	if (getUser.bank < amount) {
		return await interaction
			.editReply({
				content: "Insufficient bank balance",
			})
			.catch((err) => {})
	}

	const newSenderWallet = getUser.wallet + amount
	const newSenderBank = getUser.bank - amount

	await Economy.update(
		{ wallet: newSenderWallet, bank: newSenderBank },
		{ where: { id: interaction.member.id } }
	)

	const dashcoinOrDashcoins = amount === 1 ? "Dashcoin" : "Dashcoins"

	const embed = new EmbedBuilder()
		.setTitle("💸 Coin withdrawal complete 💸")
		.setDescription(
			`**${amount}** ${dashcoinOrDashcoins}:tm: withdrawn from your bank!`
		)
		.setColor("Green")
		// .setThumbnail(
		// 	interaction.member.user.displayAvatarURL({
		// 		size: 4096,
		// 		dynamic: true,
		// 	})
		// )

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
