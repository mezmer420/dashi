const { ChannelType } = require("discord.js")

// const {
// 	blacklistedchannels,
// 	blacklistedcategories,
// } = require("../blacklisted-channels-and-categories")

module.exports = async ({ client, Systems, Suppress }) => {
	client.on("messageCreate", async (message) => {
		const getCrazySuppress = await Systems.findOne({
			where: { system: "Crazy Suppress" },
		})

		if (getCrazySuppress.online === false) return

		if (message.channel.type === ChannelType.DM) return
		// if (
		// 	blacklistedchannels.includes(message.channel.id) ||
		// 	blacklistedcategories.includes(message.channel.parent.id)
		// )
		// 	return

		const data = await Suppress.findAll()

		let crazyUsers = []

		for (let obj of data) {
			crazyUsers.push(obj.memberid)
		}

		if (!crazyUsers.includes(message.author.id)) return

		console.log(
			`#${message.channel.name}, ${message.author.username}: ${message.content}`
		)

		message.delete().catch((err) => {})
	})
}
