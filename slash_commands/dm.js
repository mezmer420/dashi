const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("dm")
.setDescription("Make me DM a user")
.addUserOption(option => option
    .setName("user")
    .setDescription("The user to DM")
    .setRequired(true)
)
.addStringOption(option => option
    .setName("message")
    .setDescription("The message to DM")
    .setRequired(true)
)

module.exports.run = async ({client, interaction}) => {
    const user = interaction.options.getMember("user")
    const message = interaction.options.getString("message")

    if(user.id == "956345939130482750"){
        return await interaction.editReply({
            content: "i can't DM myself idot"
        })
        .catch((err) => {
            return
        })
    }

    user.send(message)
    .catch(async (err) => {
        return await interaction.editReply({
            content: `Failed to send that message, please try again`
        })
        .catch((err) => {
            return
        })
    })

    await interaction.editReply({
        content: `**${message}** successsfully sent to **${user}**! (this message will autodelete)`
    })
    .catch((err) => {
        return
    })
    .then(interaction => {
        setTimeout(() => interaction.delete()
        .catch((err) => {
            return
        }), 6000)
    })
}