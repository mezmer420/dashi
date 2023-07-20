const { Collection } = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10")
const { token } = require("./config.json")
const fs = require("fs")
const path = require("path")

module.exports = async (client, updateCommands) => {
	let commands = []

	client.commands = new Collection()

	handleCommands = (commandFolders, foldersPath) => {
		for (const folder of commandFolders) {
			const commandsPath = path.join(foldersPath, folder)
			const commandFiles = fs
				.readdirSync(commandsPath)
				.filter((file) => file.endsWith(".js"))

			for (const file of commandFiles) {
				const commandPath = path.join(commandsPath, file)
				const command = require(commandPath)

				if (command.category && command.data && command.run) {
					// console.log(command)

					client.commands.set(command.data.name, command)
					commands.push(command.data.toJSON())
				} else {
					console.log(
						`[WARNING] The command at ${commandPath} is missing required category/data/run property(ies); command not loaded.`
					)
				}
			}
		}
	}

	const foldersPath = path.join(__dirname, "./Commands/Interaction")
	const commandFolders = fs.readdirSync(foldersPath)

	await handleCommands(commandFolders, foldersPath)

	// console.log(client.commands)
	// console.log(commands)

	if (updateCommands === true) {
		;(async () => {
			try {
				console.log("Started refreshing application commands")

				const rest = new REST({ version: "10" }).setToken(token)
				const clientId = "956345939130482750"
				const guildId = "939674946379083847"

				await rest.put(Routes.applicationCommands(clientId), {
					body: commands,
				})

				// await rest.put(
				// 	Routes.applicationGuildCommands(clientId, guildId),
				// 	{ body: commands }
				// )

				console.log(
					`Successfully reloaded ${commands.length} application commands`
				)
			} catch (error) {
				console.error(error)
			}
		})()
	}
}
