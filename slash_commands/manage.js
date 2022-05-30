const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("manage")
.setDescription("Manage a user; can only be used in government channels")
.addUserOption(option => option
    .setName("user")
    .setDescription("The user to manage")
    .setRequired(true))

module.exports.run = (client, interaction, options) => {
    let permissions = interaction.member.permissions
    if(!permissions.has("BAN_MEMBERS")) return interaction.editReply({content: "you don't have sufficient perms!"})
    
    if(interaction.channel.id == "965054741480636496" || interaction.channel.id == "950196454880866314" || interaction.channel.id == "955948174894325782"){
        let member = options.getMember("user")

                          //      vcash                                       mezmer                                       mee6                                      carl                                   vcashcar                                     hydra
        if(member.user.id == "762133129209053244" || member.user.id == "527285622809952256" || member.user.id == "159985870458322944" || member.user.id == "235148962103951360" || member.user.id == "975952163090071553" || member.user.id == "547905866255433758"){
            interaction.editReply({ 
                content: "lol did you just try to manage an admin"
            })
        }

        else {
            const embed = new MessageEmbed()
            .setTitle(`Manage ${member.user.username}`)
            .setDescription(`Click one of the buttons below to manage ${member.user.username}. This interaction will autodelete in 30 seconds.`)
        
            const row = new MessageActionRow()
            .addComponents(
                [new MessageButton()
                    .setLabel("Ban")
                    .setStyle("DANGER")
                    .setCustomId(`ban-${member.id}`),
        
                new MessageButton()
                    .setLabel("Kick")
                    .setStyle("DANGER")
                    .setCustomId(`kick-${member.id}`)]
            )
        
            return interaction.editReply({
                embeds: [embed],
                components: [row]
            })
            .then(interaction => {
                setTimeout(() => interaction.delete(), 30000)
              })
              .catch()
        }
    }
    else {
        interaction.editReply({ 
            content: "For safety, you can only use this command in government channels"
        })
    }
}