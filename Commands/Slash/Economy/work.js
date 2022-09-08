const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
} = require("discord.js")
const ms = require("ms")
const wait = require("node:timers/promises").setTimeout

module.exports.data = new SlashCommandBuilder()
	.setName("work")
	.setDescription("Work for Dashcoins; default earned is 65-100")

module.exports.category = "Economy"

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

	const randomValue = Math.floor(Math.random() * 100)

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
	const findFalsifiedCollegeDegree = await Items.findOne({
		where: {
			memberid: interaction.member.id,
			item: "Falsified College Degree",
		},
	})

	let result

	if (findWife) {
		if (randomValue < 5) {
			result = "bad day"
		}
	} else if (!findWife) {
		if (randomValue < 10) {
			result = "bad day"
		}
	}

	if (result === "bad day") {
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
				content: "Unfortunately, you had a bad day and couldn't work.",
			})
			.catch((err) => {})
	}

	let coinsEarned = Math.floor(Math.random() * 35) + 66

	if (findFalsifiedCollegeDegree && findHammer) {
		coinsEarned = Math.floor(Math.random() * 20) + 481
	} else if (findFalsifiedCollegeDegree && !findHammer) {
		coinsEarned = Math.floor(Math.random() * 35) + 466
	} else if (findSickle && findHammer) {
		coinsEarned = Math.floor(Math.random() * 20) + 131
	} else if (findSickle && !findHammer) {
		coinsEarned = Math.floor(Math.random() * 35) + 116
	} else if (findHammer) {
		coinsEarned = Math.floor(Math.random() * 20) + 81
	}

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

	let tenEmojis = getRandom(emojisAll, 10)

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

	tenEmojis = shuffle(tenEmojis)

	const correctEmoji = tenEmojis[Math.floor(Math.random() * tenEmojis.length)]

	let row1 = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setLabel(`${tenEmojis[0]}`)
			.setStyle("Primary")
			.setCustomId(`${tenEmojis[0]}`),

		new ButtonBuilder()
			.setLabel(`${tenEmojis[1]}`)
			.setStyle("Primary")
			.setCustomId(`${tenEmojis[1]}`),

		new ButtonBuilder()
			.setLabel(`${tenEmojis[2]}`)
			.setStyle("Primary")
			.setCustomId(`${tenEmojis[2]}`),

		new ButtonBuilder()
			.setLabel(`${tenEmojis[3]}`)
			.setStyle("Primary")
			.setCustomId(`${tenEmojis[3]}`),

		new ButtonBuilder()
			.setLabel(`${tenEmojis[4]}`)
			.setStyle("Primary")
			.setCustomId(`${tenEmojis[4]}`)
	)

	let row2 = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setLabel(`${tenEmojis[5]}`)
			.setStyle("Primary")
			.setCustomId(`${tenEmojis[5]}`),

		new ButtonBuilder()
			.setLabel(`${tenEmojis[6]}`)
			.setStyle("Primary")
			.setCustomId(`${tenEmojis[6]}`),

		new ButtonBuilder()
			.setLabel(`${tenEmojis[7]}`)
			.setStyle("Primary")
			.setCustomId(`${tenEmojis[7]}`),

		new ButtonBuilder()
			.setLabel(`${tenEmojis[8]}`)
			.setStyle("Primary")
			.setCustomId(`${tenEmojis[8]}`),

		new ButtonBuilder()
			.setLabel(`${tenEmojis[9]}`)
			.setStyle("Primary")
			.setCustomId(`${tenEmojis[9]}`)
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
			components: [row1, row2],
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

	const row1Components = row1.components

	const row2Components = row2.components

	collector.on("collect", async (i) => {
		const ans = i.customId

		if (ans === correctEmoji) {
			for (let i = 0; i < row1Components.length; i++) {
				row1Components[i].setStyle("Secondary")
				row1Components[i].setDisabled(true)
			}

			for (let i = 0; i < row2Components.length; i++) {
				row2Components[i].setStyle("Secondary")
				row2Components[i].setDisabled(true)
			}

			let choiceArr = []

			for (let i = 0; i < row1Components.length; i++) {
				const answer = row1Components[i].data.custom_id

				const answerPos = answer.indexOf(ans)

				choiceArr.push(answerPos)
			}

			for (let i = 0; i < row2Components.length; i++) {
				const answer = row2Components[i].data.custom_id

				const answerPos = answer.indexOf(ans)

				choiceArr.push(answerPos)
			}

			const choicePos = choiceArr.indexOf(0)

			if (choicePos <= 4) {
				row1Components[choicePos].setStyle("Success")
			} else {
				row2Components[choicePos - 5].setStyle("Success")
			}

			await response
				.edit({
					content: `**Work** — Emojis\nGood work!`,
					components: [row1, row2],
				})
				.catch((err) => {})

			await Economy.update(
				{ wallet: getUser.wallet + coinsEarned },
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
					content: `You earned **${coinsEarned}** Dashcoins:tm:!`,
				})
				.catch((err) => {})
		} else {
			await i.deferUpdate().catch((err) => {})

			for (let i = 0; i < row1Components.length; i++) {
				row1Components[i].setStyle("Secondary")
				row1Components[i].setDisabled(true)
			}

			for (let i = 0; i < row2Components.length; i++) {
				row2Components[i].setStyle("Secondary")
				row2Components[i].setDisabled(true)
			}

			let choiceArr = []
			let correctArr = []

			for (let i = 0; i < row1Components.length; i++) {
				const answer = row1Components[i].data.custom_id

				const answerPos = answer.indexOf(ans)
				const correctPos = answer.indexOf(correctEmoji)

				choiceArr.push(answerPos)
				correctArr.push(correctPos)
			}

			for (let i = 0; i < row2Components.length; i++) {
				const answer = row2Components[i].data.custom_id

				const answerPos = answer.indexOf(ans)
				const correctPos = answer.indexOf(correctEmoji)

				choiceArr.push(answerPos)
				correctArr.push(correctPos)
			}

			const choicePos = choiceArr.indexOf(0)
			const correctPos = correctArr.indexOf(0)

			if (choicePos <= 4) {
				row1Components[choicePos].setStyle("Danger")
			} else {
				row2Components[choicePos - 5].setStyle("Danger")
			}

			if (correctPos <= 4) {
				row1Components[correctPos].setStyle("Success")
			} else {
				row2Components[correctPos - 5].setStyle("Success")
			}

			await response
				.edit({
					content: `**Work** — Emojis\nTerrible work!`,
					components: [row1, row2],
				})
				.catch((err) => {})

			coinsEarned = Math.round(coinsEarned * 0.15)

			await Economy.update(
				{ wallet: getUser.wallet + coinsEarned },
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
				.followUp({
					content: `You earned **${coinsEarned}** Dashcoins:tm:!`,
				})
				.catch((err) => {})
		}
	})

	collector.on("end", async (collected, reason) => {
		if (reason === "time") {
			for (let i = 0; i < row1Components.length; i++) {
				row1Components[i].setStyle("Secondary")
				row1Components[i].setDisabled(true)
			}

			for (let i = 0; i < row2Components.length; i++) {
				row2Components[i].setStyle("Secondary")
				row2Components[i].setDisabled(true)
			}

			await response
				.edit({
					content: `**Work** — Emojis\nTerrible work!`,
					components: [row1, row2],
				})
				.catch((err) => {})

			coinsEarned = Math.round(coinsEarned * 0.15)

			await Economy.update(
				{ wallet: getUser.wallet + coinsEarned },
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

			return await interaction
				.followUp({
					content: `You earned **${coinsEarned}** Dashcoins:tm:!`,
				})
				.catch((err) => {})
		}
	})
}
