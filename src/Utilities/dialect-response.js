const { ChannelType } = require("discord.js")

const {
	blacklistedChannels,
	blacklistedCategories,
} = require("../blacklisted-channels-and-categories")

const wait = require("node:timers/promises").setTimeout

module.exports.run = async ({ client, Dialects, Systems }) => {
	client.on("messageCreate", async (message) => {
		const getDialects = await Systems.findOne({
			where: { system: "Dialects" },
		})

		if (getDialects.online === false) return

		async function typeWaitSend(str) {
			await message.channel.sendTyping().catch((err) => {
				console.log(err)
			})

			await wait(Math.floor(Math.random() * 0) + 1001)

			message.channel.send(str).catch((err) => {
				console.log(err)
			})
		}

		if (message.channel.type === ChannelType.DM) return
		if (message.author.bot) return
		if (
			blacklistedChannels.includes(message.channel.id) ||
			blacklistedCategories.includes(message.channel.parent.id) ||
			message.channel.type === "GUILD_PUBLIC_THREAD"
		)
			return

		const vcashDialectData = await Dialects.findAll({
			where: { dialectid: "1" },
		})
		let vcashDialectPhrases = []
		for (let obj of vcashDialectData) {
			vcashDialectPhrases.push(obj.phrase)
		}

		const mezmerDialectData = await Dialects.findAll({
			where: { dialectid: "2" },
		})
		let mezmerDialectPhrases = []
		for (let obj of mezmerDialectData) {
			mezmerDialectPhrases.push(obj.phrase)
		}

		const chocDialectData = await Dialects.findAll({
			where: { dialectid: "3" },
		})
		let chocDialectPhrases = []
		for (let obj of chocDialectData) {
			chocDialectPhrases.push(obj.phrase)
		}

		const deltaDialectData = await Dialects.findAll({
			where: { dialectid: "4" },
		})
		let deltaDialectPhrases = []
		for (let obj of deltaDialectData) {
			deltaDialectPhrases.push(obj.phrase)
		}

		const speedyDialectData = await Dialects.findAll({
			where: { dialectid: "5" },
		})
		let speedyDialectPhrases = []
		for (let obj of speedyDialectData) {
			speedyDialectPhrases.push(obj.phrase)
		}

		const vchocDialectData = await Dialects.findAll({
			where: { dialectid: "6" },
		})
		let vchocDialectPhrases = []
		for (let obj of vchocDialectData) {
			vchocDialectPhrases.push(obj.phrase)
		}

		const ballsDialectData = await Dialects.findAll({
			where: { dialectid: "7" },
		})
		let ballsDialectPhrases = []
		for (let obj of ballsDialectData) {
			ballsDialectPhrases.push(obj.phrase)
		}

		if (vcashDialectPhrases.includes(message.content)) {
			const getvcashDialectPhrase = await Dialects.findOne({
				where: { dialectid: "1", phrase: message.content },
			})

			typeWaitSend(getvcashDialectPhrase.dialectname)

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

			typeWaitSend(getmezmerDialectPhrase.dialectname)

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

			typeWaitSend(getchocDialectPhrase.dialectname)

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

			typeWaitSend(getdeltaDialectPhrase.dialectname)

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

			typeWaitSend(getspeedyDialectPhrase.dialectname)

			if (message.channel.id !== "945527434655187006") {
				const speedyDialectPhraseOldCount = getspeedyDialectPhrase.count
				await Dialects.update(
					{ count: speedyDialectPhraseOldCount + 1 },
					{ where: { dialectid: "5", phrase: message.content } }
				)
			}
		} else if (vchocDialectPhrases.includes(message.content)) {
			const getvchocDialectPhrase = await Dialects.findOne({
				where: { dialectid: "6", phrase: message.content },
			})

			typeWaitSend(getvchocDialectPhrase.dialectname)

			if (message.channel.id !== "945527434655187006") {
				const vchocDialectPhraseOldCount = getvchocDialectPhrase.count
				await Dialects.update(
					{ count: vchocDialectPhraseOldCount + 1 },
					{ where: { dialectid: "6", phrase: message.content } }
				)
			}
		} else if (ballsDialectPhrases.includes(message.content)) {
			const getballsDialectPhrase = await Dialects.findOne({
				where: { dialectid: "7", phrase: message.content },
			})

			typeWaitSend(getballsDialectPhrase.dialectname)

			if (message.channel.id !== "945527434655187006") {
				const ballsDialectPhraseOldCount = getballsDialectPhrase.count
				await Dialects.update(
					{ count: ballsDialectPhraseOldCount + 1 },
					{ where: { dialectid: "7", phrase: message.content } }
				)
			}
		}
	})
}
