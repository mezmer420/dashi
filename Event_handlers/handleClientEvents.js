const fs = require("fs")

module.exports = (client, defaultColor, logChannel, announcementsChannel) => {
	const clientEventFiles = fs
		.readdirSync("./Events/Client/")
		.filter((file) => file.endsWith(".js"))

	for (const file of clientEventFiles) {
		const event = require(`../Events/Client/${file}`)

		if (event.once) {
			client.once(event.name, (...args) =>
				event.run(
					...args,
					defaultColor,
					logChannel,
					announcementsChannel
				)
			)
		} else {
			client.on(event.name, (...args) =>
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
}
