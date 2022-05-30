const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("kick")
.setDescription("Kick a user")
.addUserOption(option => option
    .setName("user")
    .setDescription("The user to kick")
    .setRequired(true))
.addStringOption(option => option
    .setName("reason")
    .setDescription("Reason the user is being kicked").setRequired(true))

module.exports.run = (client, interaction, options) => {
    let permissions = interaction.member.permissions
    if(!permissions.has("KICK_MEMBERS")) return interaction.editReply({content: `lol did you just try to ban **${member.displayName}**`})
    
    let member = options.getMember("user")
    let reason = options.getString("reason")

    member.kick(reason).then(() => {
        interaction.editReply({content: `**${member.displayName}** was successfully kicked for **${reason}**!`})
    }).catch(error => {
        console.log(error)
        interaction.editReply({content: "An error occured (check terminal)"})
    })
}