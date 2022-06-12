const {Economy, workCooldown, begCooldown, robCooldown, Waifus} = require("../database")
const {commands} = require("../slash-register")

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction){
        await interaction.deferReply()
        if(interaction.isCommand()){
            const name = interaction.commandName
            const commandMethod = commands.get(name)
            
            if(!commandMethod) return
            commandMethod({client, interaction, Economy, workCooldown, begCooldown, robCooldown, Waifus})
        }

        else if(interaction.isButton()){
            const button_id = interaction.customId
            const [command, id] = button_id.split("-")
            const guild = interaction.guild
            const member = guild.members.cache.get(id)
    
            if(command == "ban"){
                member.ban()
                .catch((err) => {
                    return
                })
                return interaction.editReply({
                    content: "Successfully banned the user",
                    ephemeral: true
                })
            }
            
            else if(command == "kick"){
                member.kick()
                .catch((err) => {
                    return
                })
                return interaction.editReply({
                    content: "Successfully kicked the user",
                    ephemeral: true
                })
            }
        }
    }
}