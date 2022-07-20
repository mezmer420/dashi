const { ChannelType } = require("discord.js")

const sayWord = "!s"

module.exports = {
	callback: (client, message, args) => {
		if (message.channel.type !== ChannelType.GuildText) return

		if (
			message.author.id !== "527285622809952256" && // mezmer
			message.author.id !== "762133129209053244" // vcash
		) {
			return message
				.reply(
					"Only mezmer420 and vcash can use that command! (these messages will autodelete)"
				)
				.catch((err) => {})
				.then((msg) => {
					setTimeout(() => message.delete().catch((err) => {}), 6000)
					setTimeout(() => msg.delete().catch((err) => {}), 6000)
				})
		}

		for (var i = 0; i < sayWord.length; i++) {
			const index = message.content.indexOf(sayWord[i])
			if (index !== -1) {
				// add one to include the space
				const messagetosend = message.content.slice(
					index + sayWord[i].length + 1
				)

				if (!messagetosend) {
					return message
						.reply(
							"specify what you want me to say! command format is `!s [message]`"
						)
						.catch((err) => {})
				}

				message.delete().catch((err) => {})

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
	},
}
