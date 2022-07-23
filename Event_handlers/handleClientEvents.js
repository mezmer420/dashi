const fs = require("fs")

module.exports = (client, defaultColor) => {
	const clientEventFiles = fs
		.readdirSync("./Events/Client/")
		.filter((file) => file.endsWith(".js"))

	for (const file of clientEventFiles) {
		const event = require(`../Events/Client/${file}`)

		if (event.once) {
			client.once(event.name, (...args) => event.execute(client, ...args))
		} else {
			client.on(event.name, (...args) =>
				event.execute(client, ...args, defaultColor)
			)
		}
	}
}
