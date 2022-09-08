const { ChannelType } = require("discord.js")

module.exports.run = async ({ client }) => {
	client.on("messageCreate", async (message) => {
		if (message.channel.type === ChannelType.DM) return
		if (message.channel.id !== "973334244178919504") return
		if (
			!message.member.roles.cache.some(
				(role) => role.id === "973334603253317702"
			)
		)
			return

		message.channel
			.send("https://c.tenor.com/eUGNMYebEwoAAAAd/bleu-blanc-rouge-france.gif")
			.catch((err) => {
				console.log(err)
			})
	})
}
