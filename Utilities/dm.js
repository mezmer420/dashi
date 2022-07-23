const { ChannelType } = require("discord.js")

module.exports = async ({ client }) => {
	client.on("messageCreate", async (message) => {
		if (message.channel.type !== ChannelType.DM) return

		if (message.author.id === "956345939130482750") return
		if (
			message.author.id === "527285622809952256" &&
			message.content.toLowerCase() !== "!test"
		)
			return

		const me = await client.users
			.fetch("527285622809952256")
			.catch(console.error)

		me.send(
			`**${message.author.username}** DM'd me **${message.content}**`
		).catch((err) => {
			console.log(err)
		})
	})
}
