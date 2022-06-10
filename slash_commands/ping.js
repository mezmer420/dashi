const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("ping")
.setDescription('Says "Pong!"')

module.exports.run = async ({client, interaction}) => {
    await interaction.editReply({ 
        content: "Pong!"
    })
    .catch((err) => {
        return
    })
}