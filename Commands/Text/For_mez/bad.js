const { ChannelType } = require("discord.js")

const wait = require("node:timers/promises").setTimeout

module.exports = {
	callback: async (client, message, args) => {
		if (message.channel.type !== ChannelType.GuildText) return
		
		if (message.author.id !== "527285622809952256") {
			message.channel.sendTyping().catch((err) => {
				console.log(err)
			})

			await wait(Math.floor(Math.random() * 0) + 1001)

			return message.channel.send("no").catch((err) => {
				console.log(err)
			})
		}

		message.channel.sendTyping().catch((err) => {
			console.log(err)
		})

		await wait(Math.floor(Math.random() * 0) + 1001)

		message.channel.send("sowwy").catch((err) => {
			console.log(err)
		})
	},
}
