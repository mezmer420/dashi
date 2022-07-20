const { ChannelType } = require("discord.js")

module.exports = async ({ client }) => {
	client.on("messageCreate", async (message) => {
		if (message.channel.type === ChannelType.DM) return
		if (message.channel.id !== "992630810186367016") return
		if (message.author.id === "956345939130482750") return

		message.delete().catch((err) => {})
	})
}
