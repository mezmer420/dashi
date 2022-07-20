const { ChannelType } = require("discord.js")

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

module.exports = {
	callback: async (client, message, args) => {
		if (message.channel.type !== ChannelType.GuildText) return
		
		await message.channel.send("<@826841451945787412>").catch((err) => {
			console.log(err)
		})

		message.channel
			.send(
				"https://tenor.com/view/groundhog-chicken-chalken-chalk-gh-gif-21808428"
			)
			.catch((err) => {
				console.log(err)
			})
	},
}
