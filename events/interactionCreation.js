const {Economy, workCooldown, begCooldown, robCooldown} = require("../database")
const {commands} = require("../slash-register")

module.exports = {
    name: "interactionCreate",
    async execute(interaction){
        await interaction.deferReply()
        if(interaction.isCommand()){
    
            const name = interaction.commandName
            const options = interaction.options
        
            const commandMethod = commands.get(name)
            if(!commandMethod) return
    
            // const message = require("discord.js")
            
            commandMethod(interaction.client, interaction, options, Economy, workCooldown, begCooldown, robCooldown)
        }
        else if(interaction.isButton()){
            const button_id = interaction.customId
            // button_id = ban-826841451945787412
            // ["ban", "826841451945787412"]
            const [command, id] = button_id.split("-")
            const guild = interaction.guild
            const member = guild.members.cache.get(id)
    
            if(command == "ban"){
                member.ban()
                return interaction.editReply({
                    content: "Successfully banned the user",
                    ephemeral: true
                })
            } else if(command == "kick"){
                member.kick()
                return interaction.editReply({
                    content: "Successfully kicked the user",
                    ephemeral: true
                })
            }
        }
    }
}