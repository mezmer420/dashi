const wait = require("node:timers/promises").setTimeout
const clear = require("clear-screen")

module.exports.run = async (client, message, args) => {
	if (message.author.id !== "527285622809952256") {
		message.channel.sendTyping().catch((err) => {
			console.log(err)
		})

		await wait(Math.floor(Math.random() * 0) + 1001)

		return message.channel.send("no").catch((err) => {
			console.log(err)
		})
	}

	clear()

	message.reply("Done").catch((err) => {})
}
