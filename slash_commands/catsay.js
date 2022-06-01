const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("catsay")
.setDescription("Make The Cat say thing of your choice")
.addStringOption(option => option
    .setName("text")
    .setRequired(true)
    .setDescription("The text to say"))

module.exports.run = async (client, interaction, options) => {
    let text = options.getString("text")

    await interaction.editReply({
        files: [
            {
                attachment: `https://cataas.com/cat/cute/says/${text}`,
                name: "catsay.png"
            }
        ]
    })
}