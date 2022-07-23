const { ChannelType } = require("discord.js")

module.exports = {
	callback: async (client, message, args) => {
		if (message.channel.type !== ChannelType.GuildText) return

		if (message.author.id !== "527285622809952256") {
			return message
				.reply(
					"Only mezmer420 can use that command! (these messages will autodelete)"
				)
				.catch((err) => {})
				.then((msg) => {
					setTimeout(() => message.delete().catch((err) => {}), 6000)
					setTimeout(() => msg.delete().catch((err) => {}), 6000)
				})
		}

		await console.log(`${message.author.tag} used !killdashi`)

		client.destroy()
	},
}
