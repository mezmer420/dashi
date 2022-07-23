const fs = require("fs")

module.exports = (client, defaultColor) => {
	const distubeEventFiles = fs
		.readdirSync("./Events/Distube/")
		.filter((file) => file.endsWith(".js"))

	for (const file of distubeEventFiles) {
		const event = require(`../Events/Distube/${file}`)

		client.distube.on(event.name, (...args) =>
			event.execute(client, ...args, defaultColor)
		)
	}
}
