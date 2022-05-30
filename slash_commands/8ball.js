const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

function RandArray(array){
    var rand = Math.random()*array.length | 0
    var rValue = array[rand]
    return rValue
}

module.exports.data = new SlashCommandBuilder()
.setName("8ball")
.setDescription("Ask the magic 8ball a question")
.addStringOption(option => option
    .setName("question")
    .setRequired(true)
    .setDescription("The question you want to ask the magic 8ball"))

module.exports.run = (client, interaction, options) => {
    let inquiry = options.getString("question")

    let responsevalues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    let response = RandArray(responsevalues)

    if(response == "1"){
        const Embed = new MessageEmbed()
        .setColor("#CC9CDF")
        .setTitle(`${inquiry}`)
        .setDescription("🎱 yep!")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(response == "2"){
        const Embed = new MessageEmbed()
        .setColor("#202225")
        .setTitle(`${inquiry}`)
        .setDescription("🎱 i guess")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(response == "3"){
        const Embed = new MessageEmbed()
        .setColor("#202225")
        .setTitle(`${inquiry}`)
        .setDescription("🎱 probably not")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(response == "4"){
        const Embed = new MessageEmbed()
        .setColor("#202225")
        .setTitle(`${inquiry}`)
        .setDescription("🎱 YES YES YES!!!11")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(response == "5"){
        const Embed = new MessageEmbed()
        .setColor("#202225")
        .setTitle(`${inquiry}`)
        .setDescription("🎱 hell no")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(response == "6"){
        const Embed = new MessageEmbed()
        .setColor("#202225")
        .setTitle(`${inquiry}`)
        .setDescription("🎱 um.. what?")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(response == "7"){
        const Embed = new MessageEmbed()
        .setColor("#202225")
        .setTitle(`${inquiry}`)
        .setDescription("🎱 sorry, say again?")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(response == "8"){
        const Embed = new MessageEmbed()
        .setColor("#202225")
        .setTitle(`${inquiry}`)
        .setDescription("🎱 what is that")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(response == "9"){
        const Embed = new MessageEmbed()
        .setColor("#202225")
        .setTitle(`${inquiry}`)
        .setDescription("🎱 you know what just ask someone else")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(response == "10"){
        const Embed = new MessageEmbed()
        .setColor("#202225")
        .setTitle(`${inquiry}`)
        .setDescription("🎱 i mean sure, if you believe")
        return interaction.editReply({
            embeds: [Embed]
        })
    }
}