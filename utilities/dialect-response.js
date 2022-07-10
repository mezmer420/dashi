const {
	blacklistedchannels,
	blacklistedcategories,
} = require("../blacklisted-channels-and-categories")

const wait = require("node:timers/promises").setTimeout

module.exports = async ({ client, Dialects }) => {
	client.on("messageCreate", async (message) => {
		async function TypeWaitSend(str) {
			await message.channel.sendTyping().catch((err) => {
				console.log(err)
			})

			await wait(Math.floor(Math.random() * 0) + 1001)

			message.channel.send(str).catch((err) => {
				console.log(err)
			})
		}

		if (message.channel.type == "DM") return
		if (message.author.bot) return
		if (
			blacklistedchannels.includes(message.channel.id) ||
			blacklistedcategories.includes(message.channel.parent.id) ||
			message.channel.type == "GUILD_PUBLIC_THREAD"
		)
			return

		const vcashDialectData = await Dialects.findAll({
			where: { dialectid: "1" },
		})
		let vcashDialect = []
		for (let obj of vcashDialectData) {
			vcashDialect.push(obj)
		}
		let vcashDialectPhrases = []
		for (let i = 0; i < vcashDialect.length; i++) {
			const phrase = vcashDialect[i].phrase
			vcashDialectPhrases.push(phrase)
		}

		const mezmerDialectData = await Dialects.findAll({
			where: { dialectid: "2" },
		})
		let mezmerDialect = []
		for (let obj of mezmerDialectData) {
			mezmerDialect.push(obj)
		}
		let mezmerDialectPhrases = []
		for (let i = 0; i < mezmerDialect.length; i++) {
			const phrase = mezmerDialect[i].phrase
			mezmerDialectPhrases.push(phrase)
		}

		const chocDialectData = await Dialects.findAll({
			where: { dialectid: "3" },
		})
		let chocDialect = []
		for (let obj of chocDialectData) {
			chocDialect.push(obj)
		}
		let chocDialectPhrases = []
		for (let i = 0; i < chocDialect.length; i++) {
			const phrase = chocDialect[i].phrase
			chocDialectPhrases.push(phrase)
		}

		const deltaDialectData = await Dialects.findAll({
			where: { dialectid: "4" },
		})
		let deltaDialect = []
		for (let obj of deltaDialectData) {
			deltaDialect.push(obj)
		}
		let deltaDialectPhrases = []
		for (let i = 0; i < deltaDialect.length; i++) {
			const phrase = deltaDialect[i].phrase
			deltaDialectPhrases.push(phrase)
		}

		const speedyDialectData = await Dialects.findAll({
			where: { dialectid: "5" },
		})
		let speedyDialect = []
		for (let obj of speedyDialectData) {
			speedyDialect.push(obj)
		}
		let speedyDialectPhrases = []
		for (let i = 0; i < speedyDialect.length; i++) {
			const phrase = speedyDialect[i].phrase
			speedyDialectPhrases.push(phrase)
		}

		if (vcashDialectPhrases.includes(message.content)) {
			const getvcashDialectPhrase = await Dialects.findOne({
				where: { dialectid: "1", phrase: message.content },
			})

			TypeWaitSend(`${getvcashDialectPhrase.dialectname}`)

			if (message.channel.id !== "945527434655187006") {
				const vcashDialectPhraseOldCount = getvcashDialectPhrase.count
				await Dialects.update(
					{ count: vcashDialectPhraseOldCount + 1 },
					{ where: { dialectid: "1", phrase: message.content } }
				)
			}
		} else if (mezmerDialectPhrases.includes(message.content)) {
			const getmezmerDialectPhrase = await Dialects.findOne({
				where: { dialectid: "2", phrase: message.content },
			})

			TypeWaitSend(`${getmezmerDialectPhrase.dialectname}`)

			if (message.channel.id !== "945527434655187006") {
				const mezmerDialectPhraseOldCount = getmezmerDialectPhrase.count
				await Dialects.update(
					{ count: mezmerDialectPhraseOldCount + 1 },
					{ where: { dialectid: "2", phrase: message.content } }
				)
			}
		} else if (chocDialectPhrases.includes(message.content)) {
			const getchocDialectPhrase = await Dialects.findOne({
				where: { dialectid: "3", phrase: message.content },
			})

			TypeWaitSend(`${getchocDialectPhrase.dialectname}`)

			if (message.channel.id !== "945527434655187006") {
				const chocDialectPhraseOldCount = getchocDialectPhrase.count
				await Dialects.update(
					{ count: chocDialectPhraseOldCount + 1 },
					{ where: { dialectid: "3", phrase: message.content } }
				)
			}
		} else if (deltaDialectPhrases.includes(message.content)) {
			const getdeltaDialectPhrase = await Dialects.findOne({
				where: { dialectid: "4", phrase: message.content },
			})

			TypeWaitSend(`${getdeltaDialectPhrase.dialectname}`)

			if (message.channel.id !== "945527434655187006") {
				const deltaDialectPhraseOldCount = getdeltaDialectPhrase.count
				await Dialects.update(
					{ count: deltaDialectPhraseOldCount + 1 },
					{ where: { dialectid: "4", phrase: message.content } }
				)
			}
		} else if (speedyDialectPhrases.includes(message.content)) {
			const getspeedyDialectPhrase = await Dialects.findOne({
				where: { dialectid: "5", phrase: message.content },
			})

			TypeWaitSend(`${getspeedyDialectPhrase.dialectname}`)

			if (message.channel.id !== "945527434655187006") {
				const speedyDialectPhraseOldCount = getspeedyDialectPhrase.count
				await Dialects.update(
					{ count: speedyDialectPhraseOldCount + 1 },
					{ where: { dialectid: "5", phrase: message.content } }
				)
			}
		}
	})
}
