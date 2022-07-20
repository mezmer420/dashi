const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const ms = require("ms")
const wait = require("node:timers/promises").setTimeout

module.exports.data = new SlashCommandBuilder()
	.setName("work")
	.setDescription("Work for Dashcoins; default earned is 65-100")

module.exports.run = async ({
	client,
	interaction,
	Systems,
	Economy,
	Items,
	workCooldown,
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

	const getworkCooldown = await workCooldown.findOne({
		where: { id: interaction.member.id },
	})
	const workcooldownTime = getworkCooldown?.expiry

	if (getworkCooldown && workcooldownTime > new Date().getTime()) {
		return await interaction
			.editReply({
				content: `Wait **${ms(workcooldownTime - new Date().getTime(), {
					long: true,
				})}** before trying to work again!`,
			})
			.catch((err) => {})
	}

	if (getworkCooldown) {
		await workCooldown.destroy({ where: { id: interaction.member.id } })
	}

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

	const randomvalue = Math.floor(Math.random() * 100)

	const findWife = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Wife" },
	})
	const findMotorcycle = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Motorcycle" },
	})
	const findSuperbike = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Superbike" },
	})
	const findHammer = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Hammer" },
	})
	const findSickle = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Sickle" },
	})

	let coins_earned = Math.floor(Math.random() * 35) + 66

	const emojisAll = [
		"😀",
		"😃",
		"😄",
		"😁",
		"😆",
		"😅",
		"🤣",
		"😂",
		"🙂",
		"🙃",
		"😉",
		"😊",
		"😇",
		"🥰",
		"😍",
		"🤩",
		"😘",
		"😗",
		"😚",
		"😙",
		"😋",
		"😛",
		"😜",
		"🤪",
		"😝",
		"🤑",
		"🤗",
		"🤭",
		"🤫",
		"🤔",
		"🤐",
		"🤨",
		"😐",
		"😑",
		"😶",
		"😶",
		"😏",
		"😒",
		"🙄",
		"😬",
		"😮",
		"🤥",
		"😌",
		"😔",
		"😪",
		"🤤",
		"😴",
		"😷",
		"🤒",
		"🤕",
		"🤢",
		"🤮",
		"🤧",
		"🥵",
		"🥶",
		"🥴",
		"😵",
		"😵",
		"🤯",
		"🤠",
		"🥳",
		"😎",
		"🤓",
		"🧐",
		"😕",
		"😟",
		"🙁",
		"😮",
		"😯",
		"😲",
		"😳",
		"🥺",
		"😦",
		"😧",
		"😨",
		"😰",
		"😥",
		"😢",
		"😭",
		"😱",
		"😖",
		"😣",
		"😞",
		"😓",
		"😩",
		"😫",
		"🥱",
		"😤",
		"😡",
		"😠",
		"🤬",
		"😈",
		"👿",
		"💀",
		"💩",
		"🤡",
		"👹",
		"👺",
		"👻",
		"👽",
		"👾",
		"🤖",
		"😺",
		"😸",
		"😹",
		"😻",
		"😼",
		"😽",
		"🙀",
		"😿",
		"😾",
		"🙈",
		"🙉",
		"🙊",
	]

	function getRandom(arr, n) {
		var result = new Array(n),
			len = arr.length,
			taken = new Array(len)
		if (n > len)
			throw new RangeError(
				"getRandom: more elements taken than available"
			)
		while (n--) {
			var x = Math.floor(Math.random() * len)
			result[n] = arr[x in taken ? taken[x] : x]
			taken[x] = --len in taken ? taken[len] : len
		}
		return result
	}

	let fiveEmojis = getRandom(emojisAll, 5)

	function shuffle(array) {
		let currentIndex = array.length,
			randomIndex

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--

			// And swap it with the current element.
			;[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			]
		}

		return array
	}

	fiveEmojis = shuffle(fiveEmojis)

	const correctEmoji =
		fiveEmojis[Math.floor(Math.random() * fiveEmojis.length)]

	if (findWife) {
		if (randomvalue >= 5) {
			if (findHammer && findSickle) {
				coins_earned = Math.floor(Math.random() * 20) + 131
			} else if (findHammer && !findSickle) {
				coins_earned = Math.floor(Math.random() * 20) + 81
			} else if (!findHammer && findSickle) {
				coins_earned = Math.floor(Math.random() * 35) + 116
			}

			let row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setLabel(`${fiveEmojis[0]}`)
					.setStyle("Primary")
					.setCustomId(`${fiveEmojis[0]}`),

				new ButtonBuilder()
					.setLabel(`${fiveEmojis[1]}`)
					.setStyle("Primary")
					.setCustomId(`${fiveEmojis[1]}`),

				new ButtonBuilder()
					.setLabel(`${fiveEmojis[2]}`)
					.setStyle("Primary")
					.setCustomId(`${fiveEmojis[2]}`),

				new ButtonBuilder()
					.setLabel(`${fiveEmojis[3]}`)
					.setStyle("Primary")
					.setCustomId(`${fiveEmojis[3]}`),

				new ButtonBuilder()
					.setLabel(`${fiveEmojis[4]}`)
					.setStyle("Primary")
					.setCustomId(`${fiveEmojis[4]}`)
			)

			await interaction
				.editReply({
					content: `**Work** — Emojis\nMemorize the emoji below.\n${correctEmoji}`,
				})
				.catch((err) => {})

			await wait(3000)

			const response = await interaction
				.editReply({
					content: `**Work** — Emojis\nWhat was the emoji?\nYou have 6 seconds to answer.`,
					components: [row],
				})
				.catch((err) => {})

			const filter = (i) => {
				return i.user.id === interaction.user.id
			}

			const collector = await response.createMessageComponentCollector({
				filter,
				max: 1,
				time: 6000,
			})

			const rowComponents = row.components

			collector.on("collect", async (i) => {
				const ans = i.customId

				if (ans === correctEmoji) {
					for (let i = 0; i < rowComponents.length; i++) {
						rowComponents[i].setStyle("Secondary")
						rowComponents[i].setDisabled(true)
					}

					let choiceArr = []

					for (let i = 0; i < rowComponents.length; i++) {
						const answer = rowComponents[i].data.custom_id

						const answerPos = answer.indexOf(ans)

						choiceArr.push(answerPos)
					}

					const choicePos = choiceArr.indexOf(0)

					rowComponents[choicePos].setStyle("Success")

					await response
						.edit({
							content: `**Work** — Emojis\nGood work!`,
							components: [row],
						})
						.catch((err) => {})

					await Economy.update(
						{ wallet: getUser.wallet + coins_earned },
						{ where: { id: interaction.member.id } }
					)

					let expiry = new Date().getTime() + 60000 * 10

					if (findSuperbike) {
						expiry = new Date().getTime() + 60000 * 4
					} else if (findMotorcycle && !findSuperbike) {
						expiry = new Date().getTime() + 60000 * 7
					}

					await workCooldown.create({
						id: interaction.member.id,
						expiry: expiry,
					})

					return await i
						.reply({
							content: `You earned **${coins_earned}** Dashcoins:tm:!`,
						})
						.catch((err) => {})
				} else {
					await i.deferUpdate().catch((err) => {})

					for (let i = 0; i < rowComponents.length; i++) {
						rowComponents[i].setStyle("Secondary")
						rowComponents[i].setDisabled(true)
					}

					let choiceArr = []
					let correctArr = []

					for (let i = 0; i < rowComponents.length; i++) {
						const answer = rowComponents[i].data.custom_id

						const answerPos = answer.indexOf(ans)
						const correctPos = answer.indexOf(correctEmoji)

						choiceArr.push(answerPos)
						correctArr.push(correctPos)
					}

					const choicePos = choiceArr.indexOf(0)
					const correctPos = correctArr.indexOf(0)

					rowComponents[choicePos].setStyle("Danger")
					rowComponents[correctPos].setStyle("Success")

					await response
						.edit({
							content: `**Work** — Emojis\nTerrible work!`,
							components: [row],
						})
						.catch((err) => {})

					coins_earned = Math.round(coins_earned * 0.15)

					await Economy.update(
						{ wallet: getUser.wallet + coins_earned },
						{ where: { id: interaction.member.id } }
					)

					let expiry = new Date().getTime() + 60000 * 10

					if (findSuperbike) {
						expiry = new Date().getTime() + 60000 * 4
					} else if (findMotorcycle && !findSuperbike) {
						expiry = new Date().getTime() + 60000 * 7
					}

					await workCooldown.create({
						id: interaction.member.id,
						expiry: expiry,
					})

					await i
						.followUp({
							content: `You earned **${coins_earned}** Dashcoins:tm:!`,
						})
						.catch((err) => {})
				}
			})

			collector.on("end", async (collected, reason) => {
				if (reason === "time") {
					for (let i = 0; i < rowComponents.length; i++) {
						rowComponents[i].setStyle("Secondary")
						rowComponents[i].setDisabled(true)
					}

					await response
						.edit({
							content: `**Work** — Emojis\nTerrible work!`,
							components: [row],
						})
						.catch((err) => {})

					coins_earned = Math.round(coins_earned * 0.15)

					await Economy.update(
						{ wallet: getUser.wallet + coins_earned },
						{ where: { id: interaction.member.id } }
					)

					let expiry = new Date().getTime() + 60000 * 10

					if (findSuperbike) {
						expiry = new Date().getTime() + 60000 * 4
					} else if (findMotorcycle && !findSuperbike) {
						expiry = new Date().getTime() + 60000 * 7
					}

					await workCooldown.create({
						id: interaction.member.id,
						expiry: expiry,
					})

					await interaction
						.followUp({
							content: `You earned **${coins_earned}** Dashcoins:tm:!`,
						})
						.catch((err) => {})
				}
			})
		} else if (randomvalue < 5) {
			let expiry = new Date().getTime() + 60000 * 10

			if (findSuperbike) {
				expiry = new Date().getTime() + 60000 * 4
			} else if (findMotorcycle && !findSuperbike) {
				expiry = new Date().getTime() + 60000 * 7
			}

			await workCooldown.create({
				id: interaction.member.id,
				expiry: expiry,
			})

			return await interaction
				.editReply({
					content:
						"Unfortunately, you had a bad day and couldn't work.",
				})
				.catch((err) => {})
		}
	} else if (!findWife) {
		if (randomvalue >= 10) {
			if (findHammer && findSickle) {
				coins_earned = Math.floor(Math.random() * 20) + 131
			} else if (findHammer && !findSickle) {
				coins_earned = Math.floor(Math.random() * 20) + 81
			} else if (!findHammer && findSickle) {
				coins_earned = Math.floor(Math.random() * 35) + 116
			}

			let row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setLabel(`${fiveEmojis[0]}`)
					.setStyle("Primary")
					.setCustomId(`${fiveEmojis[0]}`),

				new ButtonBuilder()
					.setLabel(`${fiveEmojis[1]}`)
					.setStyle("Primary")
					.setCustomId(`${fiveEmojis[1]}`),

				new ButtonBuilder()
					.setLabel(`${fiveEmojis[2]}`)
					.setStyle("Primary")
					.setCustomId(`${fiveEmojis[2]}`),

				new ButtonBuilder()
					.setLabel(`${fiveEmojis[3]}`)
					.setStyle("Primary")
					.setCustomId(`${fiveEmojis[3]}`),

				new ButtonBuilder()
					.setLabel(`${fiveEmojis[4]}`)
					.setStyle("Primary")
					.setCustomId(`${fiveEmojis[4]}`)
			)

			await interaction
				.editReply({
					content: `**Work** — Emojis\nMemorize the emoji below.\n${correctEmoji}`,
				})
				.catch((err) => {})

			await wait(3000)

			const response = await interaction
				.editReply({
					content: `**Work** — Emojis\nWhat was the emoji?\nYou have 6 seconds to answer.`,
					components: [row],
				})
				.catch((err) => {})

			const filter = (i) => {
				return i.user.id === interaction.user.id
			}

			const collector = response.createMessageComponentCollector({
				filter,
				max: 1,
				time: 6000,
			})

			const rowComponents = row.components

			collector.on("collect", async (i) => {
				const ans = i.customId

				if (ans === correctEmoji) {
					for (let i = 0; i < rowComponents.length; i++) {
						rowComponents[i].setStyle("Secondary")
						rowComponents[i].setDisabled(true)
					}

					let choiceArr = []

					for (let i = 0; i < rowComponents.length; i++) {
						const answer = rowComponents[i].data.custom_id

						const answerPos = answer.indexOf(ans)

						choiceArr.push(answerPos)
					}

					const choicePos = choiceArr.indexOf(0)

					rowComponents[choicePos].setStyle("Success")

					await response
						.edit({
							content: `**Work** — Emojis\nGood work!`,
							components: [row],
						})
						.catch((err) => {})

					await Economy.update(
						{ wallet: getUser.wallet + coins_earned },
						{ where: { id: interaction.member.id } }
					)

					let expiry = new Date().getTime() + 60000 * 10

					if (findSuperbike) {
						expiry = new Date().getTime() + 60000 * 4
					} else if (findMotorcycle && !findSuperbike) {
						expiry = new Date().getTime() + 60000 * 7
					}

					await workCooldown.create({
						id: interaction.member.id,
						expiry: expiry,
					})

					return await i
						.reply({
							content: `You earned **${coins_earned}** Dashcoins:tm:!`,
						})
						.catch((err) => {})
				} else {
					await i.deferUpdate().catch((err) => {})

					for (let i = 0; i < rowComponents.length; i++) {
						rowComponents[i].setStyle("Secondary")
						rowComponents[i].setDisabled(true)
					}

					let choiceArr = []
					let correctArr = []

					for (let i = 0; i < rowComponents.length; i++) {
						const answer = rowComponents[i].data.custom_id

						const answerPos = answer.indexOf(ans)
						const correctPos = answer.indexOf(correctEmoji)

						choiceArr.push(answerPos)
						correctArr.push(correctPos)
					}

					const choicePos = choiceArr.indexOf(0)
					const correctPos = correctArr.indexOf(0)

					rowComponents[choicePos].setStyle("Danger")
					rowComponents[correctPos].setStyle("Success")

					await response
						.edit({
							content: `**Work** — Emojis\nTerrible work!`,
							components: [row],
						})
						.catch((err) => {})

					coins_earned = Math.round(coins_earned * 0.15)

					await Economy.update(
						{ wallet: getUser.wallet + coins_earned },
						{ where: { id: interaction.member.id } }
					)

					let expiry = new Date().getTime() + 60000 * 10

					if (findSuperbike) {
						expiry = new Date().getTime() + 60000 * 4
					} else if (findMotorcycle && !findSuperbike) {
						expiry = new Date().getTime() + 60000 * 7
					}

					await workCooldown.create({
						id: interaction.member.id,
						expiry: expiry,
					})

					await i
						.followUp({
							content: `You earned **${coins_earned}** Dashcoins:tm:!`,
						})
						.catch((err) => {})
				}
			})

			collector.on("end", async (collected, reason) => {
				if (reason === "time") {
					for (let i = 0; i < rowComponents.length; i++) {
						rowComponents[i].setStyle("Secondary")
						rowComponents[i].setDisabled(true)
					}

					await response
						.edit({
							content: `**Work** — Emojis\nTerrible work!`,
							components: [row],
						})
						.catch((err) => {})

					coins_earned = Math.round(coins_earned * 0.15)

					await Economy.update(
						{ wallet: getUser.wallet + coins_earned },
						{ where: { id: interaction.member.id } }
					)

					let expiry = new Date().getTime() + 60000 * 10

					if (findSuperbike) {
						expiry = new Date().getTime() + 60000 * 4
					} else if (findMotorcycle && !findSuperbike) {
						expiry = new Date().getTime() + 60000 * 7
					}

					await workCooldown.create({
						id: interaction.member.id,
						expiry: expiry,
					})

					await interaction
						.followUp({
							content: `You earned **${coins_earned}** Dashcoins:tm:!`,
						})
						.catch((err) => {})
				}
			})
		} else if (randomvalue < 10) {
			let expiry = new Date().getTime() + 60000 * 10

			if (findSuperbike) {
				expiry = new Date().getTime() + 60000 * 4
			} else if (findMotorcycle && !findSuperbike) {
				expiry = new Date().getTime() + 60000 * 7
			}

			await workCooldown.create({
				id: interaction.member.id,
				expiry: expiry,
			})

			return await interaction
				.editReply({
					content:
						"Unfortunately, you had a bad day and couldn't work.",
				})
				.catch((err) => {})
		}
	}
}
