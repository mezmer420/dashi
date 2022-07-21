const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10")
const { token } = require("./config.json")
const fs = require("node:fs")

let commands = []
let commandList = new Map()

module.exports = async (updateCommands) => {
	handleCommands = (commandFolders, path) => {
		for (folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`${path}/${folder}`)
				.filter((file) => file.endsWith(".js"))

			for (const file of commandFiles) {
				const command = require(`${path}/${folder}/${file}`)

				commandList.set(command.data.name, command.run)
				commands.push(command.data.toJSON())
			}
		}
	}

	const commandFolders = fs.readdirSync("./slash_commands")

	await handleCommands(commandFolders, "./slash_commands")

	const clientId = "956345939130482750"
	const guildId = "939674946379083847"

	const rest = new REST({ version: "9" }).setToken(token)

	if (updateCommands === true) {
		;(async () => {
			try {
				// console.log("Started refreshing application (/) commands.")

				// await rest.put(Routes.applicationCommands(clientId), {
				// 	body: commands,
				// })
				await rest.put(
					Routes.applicationGuildCommands(clientId, guildId),
					{ body: commands }
				)

				console.log("Successfully reloaded application (/) commands.")
			} catch (error) {
				console.error(error)
			}
		})()
	}
}

module.exports.commands = commandList
