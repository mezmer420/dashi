const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Economy"

module.exports.data = new SlashCommandBuilder()
	.setName("pay")
	.setDescription("Pay Dashcoins to another user")
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("The user you want to pay")
			.setRequired(true)
	)
	.addIntegerOption((option) =>
		option
			.setName("amount")
			.setDescription("The amount to give")
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
	const member = interaction.options.getMember("user")

	const getUser =
		(await Economy.findOne({
			where: { id: interaction.member.id },
		})) ||
		(await Economy.create({
			id: interaction.member.id,
			wallet: 0,
			bank: 0,
		}))

	if (member.id === interaction.member.id) {
		return await interaction
			.editReply({ content: "Did you just try to pay yourself 🤦‍♂️" })
			.catch((err) => {})
	}

	if (getUser.wallet < amount) {
		return await interaction
			.editReply({ content: "Insufficient wallet balance" })
			.catch((err) => {})
	}

	const memberWallet =
		(await Economy.findOne({ where: { id: member.id } })) ||
		(await Economy.create({
			id: member.id,
			wallet: 0,
			bank: 0,
		}))

	const newRecieverWallet = memberWallet.wallet + amount
	const newSenderWallet = getUser.wallet - amount

	await Economy.update(
		{ wallet: newRecieverWallet },
		{ where: { id: member.id } }
	)
	await Economy.update(
		{ wallet: newSenderWallet },
		{ where: { id: interaction.member.id } }
	)

	const dashcoinOrDashcoins = amount === 1 ? "Dashcoin" : "Dashcoins"

	const embed = new EmbedBuilder()
		.setTitle("💸 Coin transfer complete 💸")
		.setDescription(
			`**${interaction.member.displayName}** has sent **${amount}** ${dashcoinOrDashcoins}:tm: to **${member.displayName}**!`
		)
		.setColor("Green")
		// .setThumbnail(
		// 	member.user.displayAvatarURL({ size: 4096, dynamic: true })
		// )

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
