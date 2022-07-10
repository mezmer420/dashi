module.exports = {
	name: "trackStart",
	async execute(client, queue, track) {
		const songrequests = await client.channels.cache.get(
			"992630810186367016"
		)

		songrequests
			.send(`🎶 | Now playing **${track.title}**`)
			.catch((err) => {
				console.log(err)
			})
			.then((message) => {
				setTimeout(() => message.delete().catch((err) => {}), 15000)
			})
	},
}
