const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("ban")
.setDescription("Ban a user")
.addUserOption(option => option
    .setName("user")
    .setDescription("The user to ban")
    .setRequired(true))
.addStringOption(option => option
    .setName("reason")
    .setDescription("Reason the user is being banned")
    .setRequired(true))

module.exports.run = (client, interaction, options) => {
    const permissions = interaction.member.permissions
    if(!permissions.has("BAN_MEMBERS")) return interaction.editReply({content: `lol did you just try to ban **${member.displayName}**`})
    
    const member = options.getMember("user")
    const reason = options.getString("reason")

    member.ban({reason: reason}).then(() => {
        interaction.editReply({content: `**${member.displayName}** was successfully banned for **${reason}**!`})
    }).catch(error => {
        console.log(error)
        interaction.editReply({content: "An error occured (check terminal)"})
    })
}