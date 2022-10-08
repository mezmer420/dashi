const { ChannelType } = require("discord.js")
const Chatbot = require("discord-chatbot")
const chatbot = new Chatbot({ name: "dashi", gender: "Female" })
const wait = require("node:timers/promises").setTimeout

module.exports.run = async ({ client }) => {
	client.on("messageCreate", async (message) => {
		if (message.channel.type === ChannelType.DM) return
		if (message.channel.id !== "995386274091380826") return
		if (message.author.bot) return

		async function TypeWaitSend(str) {
			await message.channel.sendTyping().catch((err) => {
				console.log(err)
			})

			await wait(Math.floor(Math.random() * 7000) + 3001)

			await message.channel.send(str).catch((err) => {
				console.log(err)
			})
		}

		try {
			const reply = await chatbot.chat(message.content)

			await wait(Math.floor(Math.random() * 3001) + 0)

			if (!message) return

			TypeWaitSend(reply)
		} catch (err) {
			message.reply(
				"The chat API failed to return a response or is currently down"
			)
		}
	})
}
