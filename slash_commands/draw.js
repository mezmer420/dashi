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
        return interaction.editReply({
            content: "dog"
        })
    }

    else if(randomthing == "bedroom"){
        return interaction.editReply({
            content: "bedroom"
        })
    }

    else if(randomthing == "rainbow dash"){
        return interaction.editReply({
            content: "rainbow dash"
        })
    }

    else if(randomthing == "m1a2 abrams"){
        return interaction.editReply({
            content: "m1a2 abrams"
        })
    }

    else if(randomthing == "tree"){
        return interaction.editReply({
            content: "tree"
        })
    }

    else if(randomthing == "window"){
        return interaction.editReply({
            content: "window"
        })
    }

    else if(randomthing == "f-15e strike eagle"){
        return interaction.editReply({
            content: "f-15e strike eagle"
        })
    }

    else if(randomthing == "hand"){
        return interaction.editReply({
            content: "hand"
        })
    }

    else if(randomthing == "house"){
        return interaction.editReply({
            content: "house"
        })
    }

    else if(randomthing == "applejack"){
        return interaction.editReply({
            content: "applejack"
        })
    }

    else if(randomthing == "brother"){
        return interaction.editReply({
            content: "brother"
        })
    }

    else if(randomthing == "your face"){
        return interaction.editReply({
            content: "your face"
        })
    }

    else if(randomthing == "chair"){
        return interaction.editReply({
            content: "chair"
        })
    }

    else if(randomthing == "glasses"){
        return interaction.editReply({
            content: "glasses"
        })
    }

    else if(randomthing == "yuri"){
        return interaction.editReply({
            content: "yuri"
        })
    }

    else if(randomthing == "reid"){
        return interaction.editReply({
            content: "reid"
        })
    }

    else if(randomthing == "spedy face"){
        return interaction.editReply({
            content: "spedy face"
        })
    }
}