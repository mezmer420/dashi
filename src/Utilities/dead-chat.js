module.exports.run = async ({ client }) => {
	async function checkForActivity() {
		const channel = await client.channels.cache.get("939674946953682976")

		if (channel) {
			channel.messages
				.fetch({ limit: 1 })
				.then((messages) => {
					const lastMessage = messages.first()
					const responses = [
						"https://tenor.com/view/dead-chat-dead-chat-skeleton-gif-25954239",
						"https://tenor.com/view/dead-chat-xd-dead-chat-gif-22992239",
						"https://tenor.com/view/dead-group-chat-gif-24956654",
						"https://tenor.com/view/googas-wet-wet-cat-dead-chat-dead-chat-xd-gif-20820186",
						"https://tenor.com/view/rip-chat-chat-dead-dead-chat-inactive-gif-18754855",
						"https://tenor.com/view/dead-chat-xd-gif-25076264",
						"https://tenor.com/view/minecraft-dead-chat-dead-chat-xd-gif-24629150",
					]

					if (responses.includes(lastMessage.content)) return

					const timeSinceLastMessage =
						Date.now() - lastMessage.createdTimestamp

					// if the last message is older than 18 hours
					if (timeSinceLastMessage > 60 * 60 * 18 * 1000) {
						// console.log(timeSinceLastMessage)

						const response =
							responses[
								Math.floor(Math.random() * responses.length)
							]

						channel.send(response)
					}
				})
				.catch(console.error)
		}

		const intervalTime =
			Math.floor(
				Math.random() * (2 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000 + 1)
			) +
			1 * 60 * 60 * 1000

		// Call the checkForActivity function again after the random interval time
		setTimeout(checkForActivity, intervalTime)
	}

	checkForActivity()
}
