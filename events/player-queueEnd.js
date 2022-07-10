module.exports = {
	name: "queueEnd",
	async execute(client, queue) {
		const songrequests = await client.channels.cache.get(
			"992630810186367016"
		)

		songrequests
			.send(`🎶 | Queue finished, bye!`)
			.catch((err) => {
				console.log(err)
			})
			.then((message) => {
				setTimeout(() => message.delete().catch((err) => {}), 10000)
			})
	},
}
