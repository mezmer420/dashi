const { ChannelType } = require("discord.js")

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

module.exports = {
	callback: async (client, message, args) => {
		if (message.channel.type !== ChannelType.GuildText) return
		
		message.channel.sendTyping().catch((err) => {
			console.log(err)
		})

		await sleep(Math.floor(Math.random() * 0) + 1001)

		message.channel.send(">;)").catch((err) => {
			console.log(err)
		})
	},
}
