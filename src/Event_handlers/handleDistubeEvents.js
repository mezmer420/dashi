const fs = require("fs")

module.exports = (client, defaultColor, logChannel, announcementsChannel) => {
	const distubeEventFiles = fs
		.readdirSync("./Events/Distube/")
		.filter((file) => file.endsWith(".js"))

	for (const file of distubeEventFiles) {
		const event = require(`../Events/Distube/${file}`)

		client.distube.on(event.name, (...args) =>
			event.run(
				client,
				...args,
				defaultColor,
				logChannel,
				announcementsChannel
			)
		)
	}
}
