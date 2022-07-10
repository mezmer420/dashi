const Chat = require("easy-discord-chatbot")
const chat = new Chat({ name: "dashi" })
const wait = require("node:timers/promises").setTimeout

module.exports = async ({ client }) => {
	client.on("messageCreate", async (message) => {
		if (message.channel.type == "DM") return
		if (message.channel.id !== "995386274091380826") return
		if (message.author.bot) return

		async function WaitTypeWaitSend(str) {
			await wait(Math.floor(Math.random() * 3001) + 0)

			await message.channel.sendTyping().catch((err) => {
				console.log(err)
			})

			await wait(Math.floor(Math.random() * 7000) + 3001)

			await message.channel.send(str).catch((err) => {
				console.log(err)
			})
		}

		const reply = await chat.chat(message.content)

		WaitTypeWaitSend(reply)
	})
}
