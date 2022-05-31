const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

function RandArray(array){
    var rand = Math.random()*array.length | 0
    var rValue = array[rand]
    return rValue
}

module.exports.data = new SlashCommandBuilder()
.setName("choose")
.setDescription("Dashi will choose something for you")
.addStringOption(option => option
    .setName("1st")
    .setRequired(true)
    .setDescription("The 1st thing to choose from"))
.addStringOption(option => option
    .setName("2nd")
    .setRequired(true)
    .setDescription("The 2nd thing to choose from"))
.addStringOption(option => option
    .setName("3rd")
    .setRequired(false)
    .setDescription("The 3rd thing to choose from"))
.addStringOption(option => option
    .setName("4th")
    .setRequired(false)
    .setDescription("The 4th thing to choose from"))
.addStringOption(option => option
    .setName("5th")
    .setRequired(false)
    .setDescription("The 5th thing to choose from"))
.addStringOption(option => option
    .setName("6th")
    .setRequired(false)
    .setDescription("The 6th thing to choose from"))
.addStringOption(option => option
    .setName("7th")
    .setRequired(false)
    .setDescription("The 7th thing to choose from"))
.addStringOption(option => option
    .setName("8th")
    .setRequired(false)
    .setDescription("The 8th thing to choose from"))
.addStringOption(option => option
    .setName("9th")
    .setRequired(false)
    .setDescription("The 9th thing to choose from"))
.addStringOption(option => option
    .setName("10th")
    .setRequired(false)
    .setDescription("The 10th thing to choose from"))


module.exports.run = (client, interaction, options) => {
    const choice1 = options.getString("1st")
    const choice2 = options.getString("2nd")
    const choice3 = options.getString("3rd")
    const choice4 = options.getString("4th")
    const choice5 = options.getString("5th")
    const choice6 = options.getString("6th")
    const choice7 = options.getString("7th")
    const choice8 = options.getString("8th")
    const choice9 = options.getString("9th")
    const choice10 = options.getString("10th")

    const responsevalues = [choice1, choice2, choice3, choice4, choice5, choice6, choice7, choice8, choice9, choice10]
    const response = RandArray(responsevalues)

    if(response == choice1){
        return interaction.editReply({
            content: `I choose... **${choice1}**!`
        })
    }

    else if(response == choice2){
        return interaction.editReply({
            content: `I choose... **${choice2}**!`
        })
    }

    else if(response == choice3){
        return interaction.editReply({
            content: `I choose... **${choice3}**!`
        })
    }

    else if(response == choice4){
        return interaction.editReply({
            content: `I choose... **${choice4}**!`
        })
    }

    else if(response == choice5){
        return interaction.editReply({
            content: `I choose... **${choice5}**!`
        })
    }

    else if(response == choice6){
        return interaction.editReply({
            content: `I choose... **${choice6}**!`
        })
    }

    else if(response == choice7){
        return interaction.editReply({
            content: `I choose... **${choice7}**!`
        })
    }

    else if(response == choice8){
        return interaction.editReply({
            content: `I choose... **${choice8}**!`
        })
    }

    else if(response == choice9){
        return interaction.editReply({
            content: `I choose... **${choice9}**!`
        })
    }

    else if(response == choice10){
        return interaction.editReply({
            content: `I choose... **${choice10}**!`
        })
    }
}