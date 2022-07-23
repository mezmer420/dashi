const { ChannelType } = require("discord.js")

module.exports = async ({ client }) => {
	client.on("messageCreate", async (message) => {
		if (message.channel.type === ChannelType.DM) return
		if (
			message.channel.id !== "990813253707911268" && // dashi changelog
			message.channel.id !== "992630810186367016" // #song-requests
		)
			return
		if (message.author.id === "956345939130482750") return

		message.delete().catch((err) => {})
	})
}
