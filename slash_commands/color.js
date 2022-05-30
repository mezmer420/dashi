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
    let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "purple", "cyan", "magenta"]
    let randomcolor = RandArray(colors)

    if(randomcolor == "red"){
        return interaction.editReply({
            content: "red"
        })
    }

    else if(randomcolor == "orange"){
        return interaction.editReply({
            content: "orange"
        })
    }

    else if(randomcolor == "yellow"){
        return interaction.editReply({
            content: "yellow"
        })
    }

    else if(randomcolor == "green"){
        return interaction.editReply({
            content: "green"
        })
    }

    else if(randomcolor == "blue"){
        return interaction.editReply({
            content: "blue"
        })
    }

    else if(randomcolor == "indigo"){
        return interaction.editReply({
            content: "indigo"
        })
    }

    else if(randomcolor == "violet"){
        return interaction.editReply({
            content: "violet"
        })
    }

    else if(randomcolor == "purple"){
        return interaction.editReply({
            content: "purple"
        })
    }

    else if(randomcolor == "cyan"){
        return interaction.editReply({
            content: "cyan"
        })
    }

    else if(randomcolor == "magenta"){
        return interaction.editReply({
            content: "magenta"
        })
    }
}