module.exports = {
	name: "addList",
	async execute(client, queue, playlist) {
		const songrequests = await client.channels.cache.get(
			"992630810186367016"
		)

		songrequests
			.send(
				`🎶 | Added \`${playlist.name}\` playlist (${
					playlist.songs.length
				} songs)`
			)
			.catch((err) => {
				console.log(err)
			})
			.then((message) => {
				setTimeout(() => message.delete().catch((err) => {}), 15000)
			})
	},
}
