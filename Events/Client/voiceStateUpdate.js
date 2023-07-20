module.exports = {
	name: "voiceStateUpdate",
	async run(client, oldState, newState, defaultColor) {
		if (oldState.channelId && !newState.channelId) {
			// Bot was disconnected?
			if (newState.id !== client.user.id) return

			const queue = await client.distube.getQueue(newState.guild.id)

			if (!queue) return

			try {
				await queue.stop()
			} catch {
				return
			}

			const songRequests = await client.channels.cache.get(
				"992630810186367016"
			)

			songRequests
				.send("I was manually disconnected; the queue has been cleared")
				.catch((err) => {})
				.then((msg) => {
					setTimeout(() => msg.delete().catch((err) => {}), 10000)
				})
		}
	},
}
