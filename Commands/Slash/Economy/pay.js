const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

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

	let getUser = await Economy.findOne({
		where: { id: interaction.member.id },
	})

	if (!getUser) {
		getUser = await Economy.create({
			id: interaction.member.id,
			wallet: 0,
			bank: 0,
		})
	}

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

	let memberWallet = await Economy.findOne({ where: { id: member.id } })

	if (!memberWallet) {
		memberWallet = await Economy.create({
			id: member.id,
			wallet: 0,
			bank: 0,
		})
	}

	const newrecieverWallet = memberWallet.wallet + amount
	const newsenderWallet = getUser.wallet - amount

	await Economy.update(
		{ wallet: newrecieverWallet },
		{ where: { id: member.id } }
	)
	await Economy.update(
		{ wallet: newsenderWallet },
		{ where: { id: interaction.member.id } }
	)

	let DashcoinorDashcoins = "Dashcoins"

	if (amount === 1) {
		DashcoinorDashcoins = "Dashcoin"
	}

	const embed = new EmbedBuilder()
		.setTitle("💸 Coin transfer complete 💸")
		.setDescription(
			`**${interaction.member.displayName}** has sent **${amount}** ${DashcoinorDashcoins}:tm: to **${member.displayName}**!`
		)
		.setColor("Green")
		.setThumbnail(
			member.user.displayAvatarURL({ size: 4096, dynamic: true })
		)

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
