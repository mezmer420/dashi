const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js")

module.exports.category = "mezmer420"

module.exports.data = new SlashCommandBuilder()
	.setName("set")
	.setDescription("Set data of a user")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("wallet")
			.setDescription("Set a user's wallet balance")
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("The user to set the wallet balance of")
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("amount")
					.setDescription("The wallet balance to set")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("bank")
			.setDescription("Set a user's bank balance")
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("The user to set the bank balance of")
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("amount")
					.setDescription("The bank balance to set")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("inventory")
			.setDescription("Set a user's inventory")
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("The user to set the inventory of")
					.setRequired(true)
			)
			.addBooleanOption((option) =>
				option
					.setName("debitcard")
					.setDescription("debit card")
					.setRequired(true)
			)
			.addBooleanOption((option) =>
				option
					.setName("motorcycle")
					.setDescription("motorcycle")
					.setRequired(true)
			)
			.addBooleanOption((option) =>
				option
					.setName("superbike")
					.setDescription("superbike")
					.setRequired(true)
			)
			.addBooleanOption((option) =>
				option
					.setName("hammer")
					.setDescription("hammer")
					.setRequired(true)
			)
			.addBooleanOption((option) =>
				option
					.setName("sickle")
					.setDescription("sickle")
					.setRequired(true)
			)
			.addBooleanOption((option) =>
				option.setName("wife").setDescription("wife").setRequired(true)
			)
			.addBooleanOption((option) =>
				option
					.setName("falsifiedcollegedegree")
					.setDescription("falsified college degree")
					.setRequired(true)
			)
			.addBooleanOption((option) =>
				option
					.setName("bailbonds")
					.setDescription("bail bonds")
					.setRequired(true)
			)
			.addBooleanOption((option) =>
				option
					.setName("holdupequipment")
					.setDescription("holdup equipment")
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("birthcontrolpills")
					.setDescription("birth control pills")
					.setMinValue(0)
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("level")
			.setDescription("Set a user's level")
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("The user to set the level of")
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("number")
					.setDescription("The level to set")
					.setMinValue(1)
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("xp")
			.setDescription("Set a user's xp")
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("The user to set the xp of")
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("amount")
					.setDescription("The xp to set")
					.setMinValue(0)
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("waifu")
			.setDescription("Set a user's waifu")
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("The user to set the waifu of")
					.setRequired(true)
			)
			.addStringOption((option) =>
				option
					.setName("waifu")
					.setDescription(
						"The waifu to set; type 'none' to remove their waifu"
					)
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("children")
			.setDescription("Set a user's children")
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("The user to set the children of")
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("number")
					.setDescription("The children to set")
					.setRequired(true)
			)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

module.exports.run = async ({
	client,
	interaction,
	basicxp,
	Economy,
	Items,
	Waifus,
	Fricking,
}) => {
	const member = interaction.options.getMember("user")

	const options = interaction.options.getSubcommand()

	switch (options) {
		case "wallet": {
			const amount = interaction.options.getInteger("amount")

			const getUser = await Economy.findOne({ where: { id: member.id } })

			if (!getUser) {
				await Economy.create({
					id: member.id,
					wallet: 0,
					bank: 0,
				})
			}

			await Economy.update(
				{ wallet: amount },
				{ where: { id: member.id } }
			)

			const embed = new EmbedBuilder()
				.setTitle("💸 New Wallet Set 💸")
				.setDescription(
					`**${member.displayName}**'s wallet balance has been set to **${amount}** Dashcoins:tm:!`
				)
				.setColor("Green")
				.setThumbnail(
					member.user.displayAvatarURL({ size: 4096, dynamic: true })
				)

			return await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})
		}

		case "bank": {
			const amount = interaction.options.getInteger("amount")

			const getUser = await Economy.findOne({ where: { id: member.id } })

			if (!getUser) {
				await Economy.create({
					id: member.id,
					wallet: 0,
					bank: 0,
				})
			}

			await Economy.update({ bank: amount }, { where: { id: member.id } })

			const embed = new EmbedBuilder()
				.setTitle("💸 New Bank Set 💸")
				.setDescription(
					`**${member.displayName}**'s bank balance has been set to **${amount}** Dashcoins:tm:!`
				)
				.setColor("Green")
				.setThumbnail(
					member.user.displayAvatarURL({ size: 4096, dynamic: true })
				)

			return await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})
		}

		case "inventory": {
			const newDebitCard = interaction.options.getBoolean("debitcard")
			const newMotorcycle = interaction.options.getBoolean("motorcycle")
			const newSuperbike = interaction.options.getBoolean("superbike")
			const newHammer = interaction.options.getBoolean("hammer")
			const newSickle = interaction.options.getBoolean("sickle")
			const newWife = interaction.options.getBoolean("wife")
			const newFalsifiedCollegeDegree = interaction.options.getBoolean(
				"falsifiedcollegedegree"
			)
			const newBailBonds = interaction.options.getBoolean("bailbonds")
			const newHoldupEquipment =
				interaction.options.getBoolean("holdupequipment")
			const newBirthControlPills =
				interaction.options.getInteger("birthcontrolpills")

			const findDebitcard = await Items.findOne({
				where: { memberid: member.id, item: "Debit Card" },
			})
			const findMotorcycle = await Items.findOne({
				where: { memberid: member.id, item: "Motorcycle" },
			})
			const findSuperbike = await Items.findOne({
				where: { memberid: member.id, item: "Superbike" },
			})
			const findHammer = await Items.findOne({
				where: { memberid: member.id, item: "Hammer" },
			})
			const findSickle = await Items.findOne({
				where: { memberid: member.id, item: "Sickle" },
			})
			const findWife = await Items.findOne({
				where: { memberid: member.id, item: "Wife" },
			})
			const findFalsifiedcollegedegree = await Items.findOne({
				where: {
					memberid: member.id,
					item: "Falsified College Degree",
				},
			})
			const findBailbonds = await Items.findOne({
				where: { memberid: member.id, item: "Bail Bonds" },
			})
			const findHoldupequipment = await Items.findOne({
				where: { memberid: member.id, item: "Holdup Equipment" },
			})
			const findBirthcontrolpills = await Items.findAll({
				where: { memberid: member.id, item: "Birth Control Pills" },
			})

			if (newDebitCard === true) {
				if (!findDebitcard) {
					await Items.create({
						memberid: member.id,
						itemid: "1",
						item: "Debit Card",
					})
				}
			} else if (newDebitCard === false) {
				if (findDebitcard) {
					await Items.destroy({
						where: { memberid: member.id, item: "Debit Card" },
					})
				}
			}

			if (newMotorcycle === true) {
				if (!findMotorcycle) {
					await Items.create({
						memberid: member.id,
						itemid: "2",
						item: "Motorcycle",
					})
				}
			} else if (newMotorcycle === false) {
				if (findMotorcycle) {
					await Items.destroy({
						where: { memberid: member.id, item: "Motorcycle" },
					})
				}
			}

			if (newSuperbike === true) {
				if (!findSuperbike) {
					await Items.create({
						memberid: member.id,
						itemid: "3",
						item: "Superbike",
					})
				}
			} else if (newSuperbike === false) {
				if (findSuperbike) {
					await Items.destroy({
						where: { memberid: member.id, item: "Superbike" },
					})
				}
			}

			if (newHammer === true) {
				if (!findHammer) {
					await Items.create({
						memberid: member.id,
						itemid: "4",
						item: "Hammer",
					})
				}
			} else if (newHammer === false) {
				if (findHammer) {
					await Items.destroy({
						where: { memberid: member.id, item: "Hammer" },
					})
				}
			}

			if (newSickle === true) {
				if (!findSickle) {
					await Items.create({
						memberid: member.id,
						itemid: "5",
						item: "Sickle",
					})
				}
			} else if (newSickle === false) {
				if (findSickle) {
					await Items.destroy({
						where: { memberid: member.id, item: "Sickle" },
					})
				}
			}

			if (newWife === true) {
				if (!findWife) {
					await Items.create({
						memberid: member.id,
						itemid: "6",
						item: "Wife",
					})
				}
			} else if (newWife === false) {
				if (findWife) {
					await Items.destroy({
						where: { memberid: member.id, item: "Wife" },
					})
				}
			}

			if (newFalsifiedCollegeDegree === true) {
				if (!findFalsifiedcollegedegree) {
					await Items.create({
						memberid: member.id,
						itemid: "7",
						item: "Falsified College Degree",
					})
				}
			} else if (newFalsifiedCollegeDegree === false) {
				if (findFalsifiedcollegedegree) {
					await Items.destroy({
						where: {
							memberid: member.id,
							item: "Falsified College Degree",
						},
					})
				}
			}

			if (newBailBonds === true) {
				if (!findBailbonds) {
					await Items.create({
						memberid: member.id,
						itemid: "8",
						item: "Bail Bonds",
					})
				}
			} else if (newBailBonds === false) {
				if (findBailbonds) {
					await Items.destroy({
						where: { memberid: member.id, item: "Bail Bonds" },
					})
				}
			}

			if (newHoldupEquipment === true) {
				if (!findHoldupequipment) {
					await Items.create({
						memberid: member.id,
						itemid: "9",
						item: "Holdup Equipment",
					})
				}
			} else if (newHoldupEquipment === false) {
				if (findHoldupequipment) {
					await Items.destroy({
						where: {
							memberid: member.id,
							item: "Holdup Equipment",
						},
					})
				}
			}

			if (newBirthControlPills > 0) {
				if (findBirthcontrolpills) {
					await Items.destroy({
						where: {
							memberid: member.id,
							item: "Birth Control Pills",
						},
					})
				}

				for (let i = 0; i < newBirthControlPills; i++) {
					await Items.create({
						memberid: member.id,
						itemid: "101",
						item: "Birth Control Pills",
					})
				}
			} else if (newBirthControlPills === 0) {
				if (findBirthcontrolpills) {
					await Items.destroy({
						where: {
							memberid: member.id,
							item: "Birth Control Pills",
						},
					})
				}
			}

			const embed = new EmbedBuilder()
				.setTitle("📦 New Inventory Set ✔️")
				.setDescription(
					`**${member.displayName}**'s inventory has been set`
				)
				.setColor("Green")
				.setThumbnail(
					member.user.displayAvatarURL({ size: 4096, dynamic: true })
				)

			return await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})
		}

		case "level": {
			if (member.user.bot) {
				return await interaction
					.editReply({
						content:
							"Bots aren't allowed in the super fancy XP system",
					})
					.catch((err) => {})
			}

			const number = interaction.options.getInteger("number")

			const getUser = await basicxp.findOne({
				where: { memberid: member.id },
			})

			if (!getUser) {
				await basicxp.create({ memberid: member.id, xp: 0, level: 1 })
			}

			await basicxp.update(
				{ level: number },
				{ where: { memberid: member.id } }
			)

			const embed = new EmbedBuilder()
				.setTitle("⭐ New Level Set ⭐")
				.setDescription(
					`**${member.displayName}**'s level has been set to **${number}**!`
				)
				.setColor("Green")
				.setThumbnail(
					member.user.displayAvatarURL({ size: 4096, dynamic: true })
				)

			return await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})
		}

		case "xp": {
			if (member.user.bot) {
				return await interaction
					.editReply({
						content:
							"Bots aren't allowed in the super fancy XP system",
					})
					.catch((err) => {})
			}

			const amount = interaction.options.getInteger("amount")

			const getUser = await basicxp.findOne({
				where: { memberid: member.id },
			})

			if (!getUser) {
				await basicxp.create({ memberid: member.id, xp: 0, level: 1 })
			}

			await basicxp.update(
				{ xp: amount },
				{ where: { memberid: member.id } }
			)

			const embed = new EmbedBuilder()
				.setTitle("⭐ New XP Set ⭐")
				.setDescription(
					`**${member.displayName}**'s XP has been set to **${amount}**!`
				)
				.setColor("Green")
				.setThumbnail(
					member.user.displayAvatarURL({ size: 4096, dynamic: true })
				)

			return await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})
		}

		case "waifu": {
			const waifu = interaction.options.getString("waifu")

			const getUser = await Waifus.findOne({ where: { id: member.id } })

			if (waifu.toLowerCase() === "none") {
				if (!getUser) {
					return await interaction
						.editReply({
							content: `${member.displayName} didn't have a waifu to begin with lol`,
						})
						.catch((err) => {})
				} else {
					const existingwaifu = getUser.waifu

					await Waifus.destroy(
						{ where: { id: member.id } },
						{ truncate: true }
					)

					return await interaction
						.editReply({
							content: `${member.displayName}'s waifu **${existingwaifu}** has been removed`,
						})
						.catch((err) => {})
				}
			} else {
				if (!getUser) {
					await Waifus.create({ id: member.id, waifu: waifu })

					return await interaction
						.editReply({
							content: `${member.displayName}'s new waifu is **${waifu}**`,
						})
						.catch((err) => {})
				} else {
					await Waifus.update(
						{ waifu: waifu },
						{ where: { id: member.id } }
					)

					return await interaction
						.editReply({
							content: `${member.displayName}'s new waifu is **${waifu}**`,
						})
						.catch((err) => {})
				}
			}
		}

		case "children": {
			const amount = interaction.options.getInteger("number")

			const getUser = await Fricking.findOne({
				where: { memberid: member.id },
			})

			if (!getUser) {
				await Fricking.create({
					memberid: member.id,
					consent: false,
					children: 0,
				})
			}

			await Fricking.update(
				{ children: amount },
				{ where: { memberid: member.id } }
			)

			const embed = new EmbedBuilder()
				.setTitle("👶 New Children Set 👶")
				.setDescription(
					`**${member.displayName}**'s children has been set to **${amount}**`
				)
				.setColor("Green")
				.setThumbnail(
					member.user.displayAvatarURL({ size: 4096, dynamic: true })
				)

			return await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})
		}
	}
}
