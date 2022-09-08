const { ChannelType } = require("discord.js")

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

	// console.log(commandFiles)

	return commandFiles
}

module.exports = (client) => {
	const commands = {}

	const commandFiles = getFiles("./Commands/Text", ".js")
	// console.log(commandFiles)

	for (const command of commandFiles) {
		// console.log(command)

		let commandFile = require(command)
		if (commandFile.default) commandFile = commandFile.default

		const split = command.replace(/\\/g, "/").split("/")
		const commandName = split[split.length - 1].replace(".js", "")

		commands[commandName.toLowerCase()] = commandFile
	}

	// console.log(commands)
	console.log("Successfully loaded text (!) commands.")

	client.on("messageCreate", (message) => {
		if (!message.content.startsWith("!") || message.author.bot) return

		const args = message.content.slice(1).split(/ +/)
		const commandName = args.shift().toLowerCase()

		if (!commands[commandName]) return

		if (!commands[commandName].dm && message.channel.type !== ChannelType.GuildText) return
		if (commands[commandName].dm &&	message.channel.type !== ChannelType.DM) return

			try {
				commands[commandName].callback(client, message, ...args)
			} catch (error) {
				console.error(error)
			}
	})
}
