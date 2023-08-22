const { ChannelType, MessageType } = require("discord.js")

module.exports.run = async ({ client }) => {
	client.on("messageCreate", async (message) => {
		if (message.channel.type === ChannelType.DM) return
		if (
			message.channel.id !== "990813253707911268" && // dashi changelog
			message.channel.id !== "992630810186367016" // #song-requests
		)
			return
		if (message.author.id === client.user.id) return

		const current = new Date()
		console.log(current.toLocaleString())

		console.log(
			`#${message.channel.name}, ${message.author.username}: ${message.content}`
		)

		message.delete().catch((err) => {})
	})
}
