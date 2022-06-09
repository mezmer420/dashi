const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("draw")
.setDescription("Gives something to draw")

module.exports.run = async (client, interaction) => {
    const things = ["dog", "bedroom", "rainbow dash", "m1a2 abrams", "tree", "window", "f-15e strike eagle", "hand", "house", "applejack", "brother", "your face", "chair", "glasses", "yuri", "reid", "spedy face"]
    const randomthing = things[Math.floor(Math.random() * things.length)]

    await interaction.editReply({
        content: `${randomthing}`
    })
    .catch((err) => {
        return
    })
}