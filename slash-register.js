const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { token } = require("./config.json")
const fs = require("node:fs")
const commands = []
const commandList = new Map()

module.exports = (updateCommands) => {
    const commandFiles = fs.readdirSync("./slash_commands/").filter(file => file.endsWith(".js"))
    
    // Place your client and guild ids here
    const clientId = "956345939130482750"
    const guildId = "939674946379083847"
    
    for (const file of commandFiles) {
        const command = require(`./slash_commands/${file}`)
        commands.push(command.data.toJSON())
        commandList.set(command.data.name, command.run)
    }
    
    const rest = new REST({ version: "9" }).setToken(token)

    if(updateCommands){
        (async () => {
            try {
                // console.log("Started refreshing application (/) commands.")
        
                // await rest.put(
                //     Routes.applicationCommands(clientId),
                //     { body: commands },
                // )
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                )
        
                console.log("Successfully reloaded application (/) commands.")
            } catch (error) {
                console.error(error)
            }
        })()
    }
}

module.exports.commands = commandList