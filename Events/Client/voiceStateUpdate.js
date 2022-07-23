module.exports = {
	name: "voiceStateUpdate",
	async execute(client, oldState, newState, defaultColor) {
		if (oldState.channelId && !newState.channelId) {
			// Bot was disconnected?
			if (newState.id !== client.user.id) return

			const queue = await client.distube.getQueue("939674946379083847")

			if (!queue) return

			try {
				await queue.stop()
			} catch {
				return
			}

            const songrequests = await client.channels.cache.get(
				"992630810186367016"
			)

			songrequests
				.send("I was manually disconnected; the queue has been cleared")
				.catch((err) => {})
				.then((msg) => {
					setTimeout(() => msg.delete().catch((err) => {}), 10000)
				})
		}
	},
}
