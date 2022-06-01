const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("dm")
.setDescription("Make me DM a user")
.addUserOption(option => option
    .setName("user")
    .setRequired(true)
    .setDescription("The user to DM"))
.addStringOption(option => option
    .setName("message")
    .setRequired(true)
    .setDescription("The message to DM"))

module.exports.run = async (client, interaction, options) => {
    let user = options.getMember("user")
    let message = options.getString("message")

    if(user.id == "956345939130482750") return interaction.editReply({
        content: "i can't DM myself idot"
    })

    user.send(message)

    await interaction.editReply({
        content: `**${message}** successsfully sent to **${user}**! (this message will autodelete)`
    })
    .then(interaction => {
        setTimeout(() => interaction.delete(), 5000)
    })
    .catch()
}