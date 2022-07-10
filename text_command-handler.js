const fs = require("fs")

const getFiles = (dir, suffix) => {
	const files = fs.readdirSync(dir, {
		withFileTypes: true,
	})

	let commandFiles = []

	for (const file of files) {
		if (file.isDirectory()) {
			commandFiles = [
				...commandFiles,
				...getFiles(`${dir}/${file.name}`, suffix),
			]
		} else if (file.name.endsWith(suffix)) {
			commandFiles.push(`${dir}/${file.name}`)
		}
	}

	return commandFiles
}

module.exports = (client) => {
	const commands = {}

	const suffix = ".js"

	const commandFiles = getFiles("./text_commands", suffix)
	// console.log(commandFiles)

	for (const command of commandFiles) {
		let commandFile = require(command)
		if (commandFile.default) commandFile = commandFile.default

		const split = command.replace(/\\/g, "/").split("/")
		const commandName = split[split.length - 1].replace(suffix, "")

		commands[commandName.toLowerCase()] = commandFile
	}

	// console.log(commands)
	console.log("Successfully loaded text (!) commands.")

	client.on("messageCreate", (message) => {
		if (
			!message.content.startsWith("!") ||
			message.channel.type == "DM" ||
			message.author.bot
		)
			return

		const args = message.content.slice(1).split(/ +/)
		const commandName = args.shift().toLowerCase()

		if (!commands[commandName]) return

		try {
			commands[commandName].callback(client, message, ...args)
		} catch (error) {
			console.error(error)
		}
	})
}
