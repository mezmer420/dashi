const {
	blacklistedchannels,
	blacklistedcategories,
} = require("../blacklisted-channels-and-categories")

module.exports = async ({ client }) => {
	client.on("messageCreate", async (message) => {
		// if (message.channel.type == "DM") return
		// if (
		// 	blacklistedchannels.includes(message.channel.id) ||
		// 	blacklistedcategories.includes(message.channel.parent.id)
		// )
		// 	return
		// if (message.author.id !== "762133129209053244") return

		// await console.log(message.content)
		
		// message.delete().catch((err) => {})
	})
}
