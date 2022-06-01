const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

function RandArray(array){
    var rand = Math.random()*array.length | 0
    var rValue = array[rand]
    return rValue
}

module.exports.data = new SlashCommandBuilder()
.setName("draw")
.setDescription("Gives something to draw")

module.exports.run = async (client, interaction) => {
    const things = ["dog", "bedroom", "rainbow dash", "m1a2 abrams", "tree", "window", "f-15e strike eagle", "hand", "house", "applejack", "brother", "your face", "chair", "glasses", "yuri", "reid", "spedy face"]
    const randomthing = RandArray(things)

    if(randomthing == "dog"){
        await interaction.editReply({
            content: "dog"
        })
    }

    else if(randomthing == "bedroom"){
        await interaction.editReply({
            content: "bedroom"
        })
    }

    else if(randomthing == "rainbow dash"){
        await interaction.editReply({
            content: "rainbow dash"
        })
    }

    else if(randomthing == "m1a2 abrams"){
        await interaction.editReply({
            content: "m1a2 abrams"
        })
    }

    else if(randomthing == "tree"){
        await interaction.editReply({
            content: "tree"
        })
    }

    else if(randomthing == "window"){
        await interaction.editReply({
            content: "window"
        })
    }

    else if(randomthing == "f-15e strike eagle"){
        await interaction.editReply({
            content: "f-15e strike eagle"
        })
    }

    else if(randomthing == "hand"){
        await interaction.editReply({
            content: "hand"
        })
    }

    else if(randomthing == "house"){
        await interaction.editReply({
            content: "house"
        })
    }

    else if(randomthing == "applejack"){
        await interaction.editReply({
            content: "applejack"
        })
    }

    else if(randomthing == "brother"){
        await interaction.editReply({
            content: "brother"
        })
    }

    else if(randomthing == "your face"){
        await interaction.editReply({
            content: "your face"
        })
    }

    else if(randomthing == "chair"){
        await interaction.editReply({
            content: "chair"
        })
    }

    else if(randomthing == "glasses"){
        await interaction.editReply({
            content: "glasses"
        })
    }

    else if(randomthing == "yuri"){
        await interaction.editReply({
            content: "yuri"
        })
    }

    else if(randomthing == "reid"){
        await interaction.editReply({
            content: "reid"
        })
    }

    else if(randomthing == "spedy face"){
        await interaction.editReply({
            content: "spedy face"
        })
    }
}