module.exports = {
	callback: async (client, message, args) => {
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

		const spam = await client.channels.cache.get("945527434655187006")

		spam.send("!stopspamwakemezmer")
			.catch((err) => {})
			.then((msg) => {
				msg.delete().catch((err) => {})
			})
	},
}
