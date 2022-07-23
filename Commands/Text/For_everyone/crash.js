const { ChannelType } = require("discord.js")

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

module.exports = {
	callback: async (client, message, args) => {
		if (message.channel.type !== ChannelType.GuildText) return
		
		const msg = await message.channel.send("uwu")

		await msg.delete()

		msg.edit("hi")

		// const chnl = await client.channels.cache.get("456765432134567")

		// const msg = await chnl.send("uwu")

		// await msg.delete()

		// msg.edit("hi")
	},
}
