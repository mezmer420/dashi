const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

function RandArray(array){
    var rand = Math.random()*array.length | 0
    var rValue = array[rand]
    return rValue
}

module.exports.data = new SlashCommandBuilder()
.setName("color")
.setDescription("Gives a random color")

module.exports.run = async (client, interaction) => {
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "purple", "cyan", "magenta"]
    const randomcolor = RandArray(colors)

    if(randomcolor == "red"){
        await interaction.editReply({
            content: "red"
        })
        .catch((err) => {
            return
        })
    }

    else if(randomcolor == "orange"){
        await interaction.editReply({
            content: "orange"
        })
        .catch((err) => {
            return
        })
    }

    else if(randomcolor == "yellow"){
        await interaction.editReply({
            content: "yellow"
        })
        .catch((err) => {
            return
        })
    }

    else if(randomcolor == "green"){
        await interaction.editReply({
            content: "green"
        })
        .catch((err) => {
            return
        })
    }

    else if(randomcolor == "blue"){
        await interaction.editReply({
            content: "blue"
        })
        .catch((err) => {
            return
        })
    }

    else if(randomcolor == "indigo"){
        await interaction.editReply({
            content: "indigo"
        })
        .catch((err) => {
            return
        })
    }

    else if(randomcolor == "violet"){
        await interaction.editReply({
            content: "violet"
        })
        .catch((err) => {
            return
        })
    }

    else if(randomcolor == "purple"){
        await interaction.editReply({
            content: "purple"
        })
        .catch((err) => {
            return
        })
    }

    else if(randomcolor == "cyan"){
        await interaction.editReply({
            content: "cyan"
        })
        .catch((err) => {
            return
        })
    }

    else if(randomcolor == "magenta"){
        await interaction.editReply({
            content: "magenta"
        })
        .catch((err) => {
            return
        })
    }
}