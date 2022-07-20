module.exports = {
	name: "error",
	async execute(client, channel, e) {
		const songrequests = await client.channels.cache.get(
			"992630810186367016"
		)

		console.log(e)

		songrequests
			.send(` ❌ | An error encountered`)
			.catch((err) => {
				console.log(err)
			})
			.then((message) => {
				setTimeout(() => message.delete().catch((err) => {}), 15000)
			})
	},
}
