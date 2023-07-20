const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
} = require("discord.js")

module.exports.category = "Economy"

module.exports.data = new SlashCommandBuilder()
	.setName("buy")
	.setDescription("Buy items from the shop")
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
	const findDebitcard = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Debit Card" },
	})

	const itemLowercase = item.toLowerCase()

	let price
	let itemId
	if (item === "Debit Card") {
		price = 1000
		itemId = "1"
	} else if (item === "Motorcycle") {
		price = 500
		itemId = "2"
	} else if (item === "Superbike") {
		price = 3500
		itemId = "3"
	} else if (item === "Hammer") {
		price = 1000
		itemId = "4"
	} else if (item === "Sickle") {
		price = 1500
		itemId = "5"
	} else if (item === "Wife") {
		price = 1000
		itemId = "6"
	} else if (item === "Falsified College Degree") {
		price = 50000
		itemId = "7"
	} else if (item === "Bail Bonds") {
		price = 2000
		itemId = "8"
	} else if (item === "Holdup Equipment") {
		price = 2000
		itemId = "9"
	}

	if (findItem) {
		return await interaction
			.editReply({
				content: `You already own **${itemLowercase}**!`,
			})
			.catch((err) => {})
	}

	if (item === "Debit Card") {
		if (getUser.wallet >= price) {
			const newWallet = getUser.wallet - price

			const embed = new EmbedBuilder()
				.setTitle(
					`Confirm you wish to purchase **${itemLowercase}** for ${price} Dashcoins:tm:`
				)
				.setDescription(`The purchase will be made from your wallet.`)
				.addFields(
					{
						name: "Current Wallet",
						value: `${getUser.wallet} Dashcoins:tm:`,
						inline: true,
					},
					{
						name: "Wallet After Purchase",
						value: `${newWallet} Dashcoins:tm:`,
						inline: true,
					}
				)
				.setColor(defaultColor)

			const row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setLabel("Confirm Purchase")
					.setStyle("Primary")
					.setCustomId(`buy_${item}_wallet`)
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
				const newfindItem = await Items.findOne({
					where: { memberid: interaction.member.id, item: item },
				})

				if (newfindItem) return

				const command = i.customId

				if (command !== `buy_${item}_wallet`) return

				const getNewUser = await Economy.findOne({
					where: { id: interaction.member.id },
				})

				if (getNewUser.wallet < price) return

				const updateWallet = getNewUser.wallet - price

				await Economy.update(
					{ wallet: updateWallet },
					{ where: { id: interaction.member.id } }
				)
				await Items.create({
					memberid: interaction.member.id,
					itemid: itemId,
					item: item,
				})

				const getNewNewUser = await Economy.findOne({
					where: { id: interaction.member.id },
				})

				const newBalance = getNewNewUser.wallet

				await i
					.reply({
						embeds: [
							new EmbedBuilder()
								.setTitle(`💸 Purchase Complete 💸`)
								.setDescription(
									`You just purchased **${itemLowercase}** for ${price} Dashcoins:tm: from your wallet! Your new wallet balance is ${newBalance} Dashcoins:tm:.`
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
		} else if (getUser.wallet < price) {
			const coinsToGo = price - getUser.wallet

			const embed = new EmbedBuilder()
				.setTitle(`⚠️ Insufficient Funds ❌`)
				.setDescription(
					`You don't have enough Dashcoins:tm: in your wallet! You need **${coinsToGo}** Dashcoins:tm: more in your wallet.`
				)
				.setColor(defaultColor)
				.setThumbnail(
					interaction.member.user.displayAvatarURL({
						size: 4096,
						dynamic: true,
					})
				)

			return await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})
		}
	} else {
		if (findDebitcard) {
			if (getUser.bank >= price) {
				const newBank = getUser.bank - price

				const embed = new EmbedBuilder()
					.setTitle(
						`Confirm you wish to purchase **${itemLowercase}** for ${price} Dashcoins:tm:`
					)
					.setDescription(`The purchase will be made from your bank.`)
					.addFields(
						{
							name: "Current Bank",
							value: `${getUser.bank} Dashcoins:tm:`,
							inline: true,
						},
						{
							name: "Bank After Purchase",
							value: `${newBank} Dashcoins:tm:`,
							inline: true,
						}
					)
					.setColor(defaultColor)

				const row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setLabel("Confirm Purchase")
						.setStyle("Primary")
						.setCustomId(`buy_${item}_bank`)
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

				const collector =
					await response.createMessageComponentCollector({
						filter,
						max: 1,
						time: 10000,
					})

				collector.on("collect", async (i) => {
					const newfindItem = await Items.findOne({
						where: { memberid: interaction.member.id, item: item },
					})

					if (newfindItem) return

					const command = i.customId

					if (command !== `buy_${item}_bank`) return

					const getNewUser = await Economy.findOne({
						where: { id: interaction.member.id },
					})

					if (getNewUser.bank < price) return

					const updateBank = getNewUser.bank - price

					await Economy.update(
						{ bank: updateBank },
						{ where: { id: interaction.member.id } }
					)
					await Items.create({
						memberid: interaction.member.id,
						itemid: itemId,
						item: item,
					})

					const getNewNewUser = await Economy.findOne({
						where: { id: interaction.member.id },
					})

					const newBalance = getNewNewUser.bank

					await i
						.reply({
							embeds: [
								new EmbedBuilder()
									.setTitle(`💸 Purchase Complete 💸`)
									.setDescription(
										`You just purchased **${itemLowercase}** for ${price} Dashcoins:tm: from your bank! Your new bank balance is ${newBalance} Dashcoins:tm:.`
									)
									.setColor(defaultColor)
									.setThumbnail(
										interaction.member.user.displayAvatarURL(
											{ size: 4096, dynamic: true }
										)
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
			} else if (getUser.bank < price && getUser.wallet >= price) {
				const newWallet = getUser.wallet - price

				const embed = new EmbedBuilder()
					.setTitle(
						`Confirm you wish to purchase **${itemLowercase}** for ${price} Dashcoins:tm:`
					)
					.setDescription(
						`The purchase will be made from your wallet. (You don't have enough Dashcoins:tm: in your bank to use your debit card)`
					)
					.addFields(
						{
							name: "Current Wallet",
							value: `${getUser.wallet} Dashcoins:tm:`,
							inline: true,
						},
						{
							name: "Wallet After Purchase",
							value: `${newWallet} Dashcoins:tm:`,
							inline: true,
						}
					)
					.setColor(defaultColor)

				const row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setLabel("Confirm Purchase")
						.setStyle("Primary")
						.setCustomId(`buy_${item}_wallet`)
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

				const collector =
					await response.createMessageComponentCollector({
						filter,
						max: 1,
						time: 10000,
					})

				collector.on("collect", async (i) => {
					const newfindItem = await Items.findOne({
						where: { memberid: interaction.member.id, item: item },
					})

					if (newfindItem) return

					const command = i.customId

					if (command !== `buy_${item}_wallet`) return

					const getNewUser = await Economy.findOne({
						where: { id: interaction.member.id },
					})

					if (getNewUser.wallet < price) return

					const updateWallet = getNewUser.wallet - price

					await Economy.update(
						{ wallet: updateWallet },
						{ where: { id: interaction.member.id } }
					)
					await Items.create({
						memberid: interaction.member.id,
						itemid: itemId,
						item: item,
					})

					const getNewNewUser = await Economy.findOne({
						where: { id: interaction.member.id },
					})

					const newBalance = getNewNewUser.wallet

					await i
						.reply({
							embeds: [
								new EmbedBuilder()
									.setTitle(`💸 Purchase Complete 💸`)
									.setDescription(
										`You just purchased **${itemLowercase}** for ${price} Dashcoins:tm: from your wallet! Your new wallet balance is ${newBalance} Dashcoins:tm:.`
									)
									.setColor(defaultColor)
									.setThumbnail(
										interaction.member.user.displayAvatarURL(
											{ size: 4096, dynamic: true }
										)
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
			} else if (getUser.bank < price && getUser.wallet < price) {
				const walletCoinsToGo = price - getUser.wallet
				const bankCoinsToGo = price - getUser.bank

				const embed = new EmbedBuilder()
					.setTitle(`⚠️ Insufficient Funds ❌`)
					.setDescription(
						`You don't have enough Dashcoins:tm: in your wallet or bank! You need **${walletCoinsToGo}** Dashcoins:tm: more in your wallet **or** **${bankCoinsToGo}** Dashcoins:tm: more in your bank.`
					)
					.setColor(defaultColor)
					.setThumbnail(
						interaction.member.user.displayAvatarURL({
							size: 4096,
							dynamic: true,
						})
					)

				return await interaction
					.editReply({
						embeds: [embed],
					})
					.catch((err) => {})
			}
		} else if (!findDebitcard) {
			if (getUser.wallet >= price) {
				const newWallet = getUser.wallet - price

				const embed = new EmbedBuilder()
					.setTitle(
						`Confirm you wish to purchase **${itemLowercase}** for ${price} Dashcoins:tm:`
					)
					.setDescription(
						`The purchase will be made from your wallet.`
					)
					.addFields(
						{
							name: "Current Wallet",
							value: `${getUser.wallet} Dashcoins:tm:`,
							inline: true,
						},
						{
							name: "Wallet After Purchase",
							value: `${newWallet} Dashcoins:tm:`,
							inline: true,
						}
					)
					.setColor(defaultColor)

				const row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setLabel("Confirm Purchase")
						.setStyle("Primary")
						.setCustomId(`buy_${item}_wallet`)
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

				const collector =
					await response.createMessageComponentCollector({
						filter,
						max: 1,
						time: 10000,
					})

				collector.on("collect", async (i) => {
					const newfindItem = await Items.findOne({
						where: { memberid: interaction.member.id, item: item },
					})

					if (newfindItem) return

					const command = i.customId

					if (command !== `buy_${item}_wallet`) return

					const getNewUser = await Economy.findOne({
						where: { id: interaction.member.id },
					})

					if (getNewUser.wallet < price) return

					const updateWallet = getNewUser.wallet - price

					await Economy.update(
						{ wallet: updateWallet },
						{ where: { id: interaction.member.id } }
					)
					await Items.create({
						memberid: interaction.member.id,
						itemid: itemId,
						item: item,
					})

					const getNewNewUser = await Economy.findOne({
						where: { id: interaction.member.id },
					})

					const newBalance = getNewNewUser.wallet

					await i
						.reply({
							embeds: [
								new EmbedBuilder()
									.setTitle(`💸 Purchase Complete 💸`)
									.setDescription(
										`You just purchased **${itemLowercase}** for ${price} Dashcoins:tm: from your wallet! Your new wallet balance is ${newBalance} Dashcoins:tm:.`
									)
									.setColor(defaultColor)
									.setThumbnail(
										interaction.member.user.displayAvatarURL(
											{ size: 4096, dynamic: true }
										)
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
			} else if (getUser.wallet < price) {
				const coinsToGo = price - getUser.wallet

				const embed = new EmbedBuilder()
					.setTitle(`⚠️ Insufficient Funds ❌`)
					.setDescription(
						`You don't have enough Dashcoins:tm: in your wallet! You need **${coinsToGo}** Dashcoins:tm: more in your wallet.`
					)
					.setColor(defaultColor)
					.setThumbnail(
						interaction.member.user.displayAvatarURL({
							size: 4096,
							dynamic: true,
						})
					)

				return await interaction
					.editReply({
						embeds: [embed],
					})
					.catch((err) => {})
			}
		}
	}
}
