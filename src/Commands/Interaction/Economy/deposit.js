const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Economy"

module.exports.data = new SlashCommandBuilder()
	.setName("deposit")
	.setDescription("Deposit Dashcoins into bank; leave blank to deposit max")
	.addIntegerOption((option) =>
		option
			.setName("amount")
			.setDescription("The amount to deposit")
			.setRequired(false)
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

	const getUser =
		(await Economy.findOne({
			where: { id: interaction.member.id },
		})) ||
		(await Economy.create({
			id: interaction.member.id,
			wallet: 0,
			bank: 0,
		}))

	const amount = interaction.options.getInteger("amount") || getUser.wallet

	if (getUser.wallet < amount) {
		return await interaction
			.editReply({
				content: "Insufficient wallet balance!",
			})
			.catch((err) => {})
	}

	if (getUser.wallet === 0) {
		return await interaction
			.editReply({
				content: "Your wallet is empty, nothing to deposit",
			})
			.catch((err) => {})
	}

	const newSenderWallet = getUser.wallet - amount
	const newSenderBank = getUser.bank + amount

	await Economy.update(
		{ wallet: newSenderWallet, bank: newSenderBank },
		{ where: { id: interaction.member.id } }
	)

	const embed = new EmbedBuilder()
		.setTitle("💸 Coin deposit complete 💸")
		.setDescription(`**${amount}** Dashcoins:tm: deposited in your bank!`)
		.setColor("Green")
		.setThumbnail(
			interaction.member.user.displayAvatarURL({
				size: 4096,
				dynamic: true,
			})
		)

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
