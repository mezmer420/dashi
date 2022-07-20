module.exports = {
	name: "playSong",
	async execute(client, queue, song) {
		const songrequests = await client.channels.cache.get(
			"992630810186367016"
		)

		songrequests
			.send(
				`🎶 | Now playing \`${song.name}\` — \`${
					song.formattedDuration
				}\``
				// \nRequested by: ${song.user}
			)
			.catch((err) => {
				console.log(err)
			})
			.then((message) => {
				setTimeout(() => message.delete().catch((err) => {}), 15000)
			})
	},
}
