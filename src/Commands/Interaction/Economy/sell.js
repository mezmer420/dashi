const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
} = require("discord.js")

module.exports.category = "Economy"

module.exports.data = new SlashCommandBuilder()
	.setName("sell")
	.setDescription("Sell items you own")
	.addStringOption((option) =>
		option
			.setName("item")
			.setDescription("The item to purchase")
			.setRequired(true)
			.addChoices(
				{ name: "Debit Card", value: "Debit Card" },
				{ name: "Motorcycle", value: "Motorcycle" },
				{ name: "Superbike", value: "Superbike" },
				{ name: "Hammer", value: "Hammer" },
				{ name: "Sickle", value: "Sickle" },
				{ name: "Wife", value: "Wife" },
				{
					name: "Falsified College Degree",
					value: "Falsified College Degree",
				},
				{ name: "Bail Bonds", value: "Bail Bonds" },
				{ name: "Holdup Equipment", value: "Holdup Equipment" }
			)
	)

module.exports.run = async ({
	client,
	interaction,
	Systems,
	Economy,
	Items,
	defaultColor,
}) => {
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

	const item = interaction.options.getString("item")

	const getUser =
		(await Economy.findOne({
			where: { id: interaction.member.id },
		})) ||
		(await Economy.create({
			id: interaction.member.id,
			wallet: 0,
			bank: 0,
		}))

	const findItem = await Items.findOne({
		where: { memberid: interaction.member.id, item: item },
	})

	const itemLowercase = item.toLowerCase()

	let minPrice
	let maxPrice
	let price
	let sellPrice
	if (item === "Debit Card") {
		minPrice = 750
		maxPrice = 950
		price = 1000
		sellPrice = Math.floor(Math.random() * 200) + 751
	} else if (item === "Motorcycle") {
		minPrice = 350
		maxPrice = 450
		price = 500
		sellPrice = Math.floor(Math.random() * 100) + 351
	} else if (item === "Superbike") {
		minPrice = 2800
		maxPrice = 3350
		price = 3500
		sellPrice = Math.floor(Math.random() * 550) + 2801
	} else if (item === "Hammer") {
		minPrice = 750
		maxPrice = 950
		price = 1000
		sellPrice = Math.floor(Math.random() * 200) + 751
	} else if (item === "Sickle") {
		minPrice = 1100
		maxPrice = 1400
		price = 1500
		sellPrice = Math.floor(Math.random() * 300) + 1101
	} else if (item === "Wife") {
		minPrice = 750
		maxPrice = 950
		price = 1000
		sellPrice = Math.floor(Math.random() * 200) + 751
	} else if (item === "Falsified College Degree") {
		minPrice = 37500
		maxPrice = 45000
		price = 50000
		sellPrice = Math.floor(Math.random() * 350) + 150
	} else if (item === "Bail Bonds") {
		minPrice = 1500
		maxPrice = 1850
		price = 2000
		sellPrice = Math.floor(Math.random() * 350) + 150
	} else if (item === "Holdup Equipment") {
		minPrice = 1500
		maxPrice = 1850
		price = 2000
		sellPrice = Math.floor(Math.random() * 350) + 150
	}

	if (!findItem) {
		return await interaction
			.editReply({
				content: `You don't own **${itemLowercase}**!`,
			})
			.catch((err) => {})
	}

	const minNewWallet = getUser.wallet + minPrice
	const maxNewWallet = getUser.wallet + maxPrice

	const embed = new EmbedBuilder()
		.setTitle(
			`Confirm you wish to sell ***${itemLowercase}*** for ${minPrice}-${maxPrice} Dashcoins:tm:`
		)
		.setDescription(`The Dashcoins:tm: will be transferred to your wallet.`)
		.addFields(
			{
				name: "Original Purchase Price",
				value: `${price} Dashcoins:tm:`,
				inline: true,
			},
			{
				name: "Current Wallet",
				value: `${getUser.wallet} Dashcoins:tm:`,
				inline: true,
			},
			{
				name: "Wallet After Purchase",
				value: `${minNewWallet}-${maxNewWallet} Dashcoins:tm:`,
				inline: true,
			}
		)
		.setColor(defaultColor)

	const row = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setLabel("Confirm Sale")
			.setStyle("Primary")
			.setCustomId(`sell_${item}`)
	)

	const response = await interaction
		.editReply({
			embeds: [embed],
			components: [row],
		})
		.catch((err) => {})

	const filter = (i) => {
		return i.user.id === interaction.user.id
	}

	const collector = await response.createMessageComponentCollector({
		filter,
		max: 1,
		time: 10000,
	})

	collector.on("collect", async (i) => {
		const newFindItem = await Items.findOne({
			where: { memberid: interaction.member.id, item: item },
		})

		if (!newFindItem) return

		const command = i.customId

		if (command !== `sell_${item}`) return

		const getNewUser = await Economy.findOne({
			where: { id: interaction.member.id },
		})

		const updateWallet = getNewUser.wallet + sellPrice

		await Economy.update(
			{ wallet: updateWallet },
			{ where: { id: interaction.member.id } }
		)
		await Items.destroy({
			where: { memberid: interaction.member.id, item: item },
		})

		const getNewNewUser = await Economy.findOne({
			where: { id: interaction.member.id },
		})

		const newBalance = getNewNewUser.wallet

		await i
			.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle(`💸 Sale Complete 💸`)
						.setDescription(
							`You just sold **${itemLowercase}** for ${sellPrice} Dashcoins:tm:! Your new wallet balance is ${newBalance} Dashcoins:tm:.`
						)
						.setColor(defaultColor)
						.setThumbnail(
							interaction.member.user.displayAvatarURL({
								size: 4096,
								dynamic: true,
							})
						),
				],
			})
			.catch((err) => {})
	})

	collector.on("end", async (i) => {
		row.components[0].setDisabled(true)

		return await response
			.edit({
				components: [row],
			})
			.catch((err) => {})
	})
}
