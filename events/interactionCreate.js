const {Economy, dailyCooldown, workCooldown, begCooldown, robCooldown, Waifus} = require("../database")
const {commands} = require("../slash-register")

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction){
        if(interaction.isCommand()){
            await interaction.deferReply()

            const name = interaction.commandName
            const commandMethod = commands.get(name)
            
            if(!commandMethod) return

            commandMethod({client, interaction, Economy, dailyCooldown, workCooldown, begCooldown, robCooldown, Waifus})
        }

        else if(interaction.isButton()){
            const button_id = interaction.customId
            const [command, id] = button_id.split("-")
            const guild = interaction.guild
            const member = guild.members.cache.get(id)
            const permissions = interaction.member.permissions
    
            if(command == "ban"){
                if(!permissions.has("BAN_MEMBERS")) return

                member.ban()
                .catch((err) => {
                    console.log(err)
                    return interaction.editReply({
                        content: "Failed to ban the user"
                    })
                    .catch((err) => {
                        return
                    })
                })

                return interaction.editReply({
                    content: "Banned the user"
                })
            }
            
            else if(command == "kick"){
                if(!permissions.has("BAN_MEMBERS")) return

                member.kick()
                .catch((err) => {
                    console.log(err)
                    return interaction.editReply({
                        content: "Failed to ban the user"
                    })
                    .catch((err) => {
                        return
                    })
                })

                return interaction.editReply({
                    content: "Kicked the user"
                })
            }
        }
    }
}