module.exports = async ({ client }) => {
	client.on("messageCreate", async (message) => {
		if (message.channel.type == "DM") return

		if (
			message.author.id == "527285622809952256" || // mezmer
			message.author.id == "826841451945787412" || // choc
			message.author.id == "956345939130482750" || // dashi
			message.author.id == "969084144141344788" // boomer
		)
			return

		const blacklistedchannels = [
			"939675256765939863", // #court
			"992630810186367016", // #song-requests
		]

		const blacklistedcategories = [
			"964730854922403843", // TALKING TO SELF
			"961417053284221028", // THE ARCHIVES
		]

		if (
			blacklistedchannels.includes(message.channel.id) ||
			blacklistedcategories.includes(message.channel.parent.id)
		)
			return

		const ping = ["@everyone", "@here"]

		for (var i = 0; i < ping.length; i++) {
			const index = message.content.indexOf(ping[i])
			if (index !== -1) {
				return message
					.reply("Only government officials can use that ping idot!")
					.catch((err) => {})
			}
		}
	})
}
