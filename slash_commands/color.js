const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("color")
.setDescription("Gives a random color")

module.exports.run = async ({client, interaction}) => {
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "purple", "cyan", "magenta"]
    const randomcolor = colors[Math.floor(Math.random() * colors.length)]

    await interaction.editReply({
        content: `${randomcolor}`
    })
    .catch((err) => {
        return
    })
}