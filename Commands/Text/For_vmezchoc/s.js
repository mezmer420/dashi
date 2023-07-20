module.exports.run = async (client, message, args) => {
	const vmezchoc = [
		"527285622809952256", // mezmer
		"762133129209053244", // vcash
		"826841451945787412", // choc
	]
	const isAllowedUser = vmezchoc.includes(message.author.id)

	if (!isAllowedUser) {
		return message
			.reply(
				"Only mezmer420, cookies, and vcash can use that command! (these messages will autodelete)"
			)
			.catch(() => {})
			.then((msg) => {
				setTimeout(() => message.delete().catch(() => {}), 6000)
				setTimeout(() => msg.delete().catch(() => {}), 6000)
			})
	}

	const sayWord = "!s"
	const index = message.content.indexOf(sayWord)

	if (index !== -1) {
		const messagetosend = message.content.slice(index + sayWord.length + 1)

		if (!messagetosend) {
			return message
				.reply(
					"Specify what you want me to say! Command format is `!s [message]`"
				)
				.catch(() => {})
		}

		message.delete().catch(() => {})

		return message.channel.send(`${messagetosend}`).catch((err) => {
			console.log(err)
		})

		// message.channel
		// 	.send(`${messagetosend}`)
		// 	.catch((err) => {
		// 		return console.log(err)
		// 	})
		// 	.then((sentMessage) => {
		// 		sentMessage.react("1️⃣")
		// 		sentMessage.react("2️⃣")
		// 		sentMessage.react("3️⃣")
		// 		sentMessage.react("4️⃣")
		// 		sentMessage.react("5️⃣")
		// 		sentMessage.react("6️⃣")
		// 		sentMessage.react("7️⃣")
		// 	})
	}
}
