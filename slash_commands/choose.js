const {SlashCommandBuilder} = require("@discordjs/builders")

function RandArray(array){
    var rand = Math.random()*array.length | 0
    var rValue = array[rand]
    return rValue
}

module.exports.data = new SlashCommandBuilder()
.setName("choose")
.setDescription("I will choose something for you")
.addStringOption(option => option
    .setName("1st")
    .setDescription("The 1st thing to choose from")
    .setRequired(true)
)
.addStringOption(option => option
    .setName("2nd")
    .setDescription("The 2nd thing to choose from")
    .setRequired(true)
)
.addStringOption(option => option
    .setName("3rd")
    .setDescription("The 3rd thing to choose from")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("4th")
    .setDescription("The 4th thing to choose from")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("5th")
    .setDescription("The 5th thing to choose from")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("6th")
    .setDescription("The 6th thing to choose from")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("7th")
    .setDescription("The 7th thing to choose from")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("8th")
    .setDescription("The 8th thing to choose from")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("9th")
    .setDescription("The 9th thing to choose from")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("10th")
    .setDescription("The 10th thing to choose from")
    .setRequired(false)
)

module.exports.run = async (client, interaction) => {
    const choice1 = interaction.options.getString("1st")
    const choice2 = interaction.options.getString("2nd")
    const choice3 = interaction.options.getString("3rd")
    const choice4 = interaction.options.getString("4th")
    const choice5 = interaction.options.getString("5th")
    const choice6 = interaction.options.getString("6th")
    const choice7 = interaction.options.getString("7th")
    const choice8 = interaction.options.getString("8th")
    const choice9 = interaction.options.getString("9th")
    const choice10 = interaction.options.getString("10th")

    const responsevalues = [choice1, choice2, choice3, choice4, choice5, choice6, choice7, choice8, choice9, choice10]
    const response = RandArray(responsevalues)

    if(response == choice1){
        await interaction.editReply({
            content: `I choose... **${choice1}**`
        })
        .catch((err) => {
            return
        })
    }

    else if(response == choice2){
        await interaction.editReply({
            content: `I choose... **${choice2}**`
        })
        .catch((err) => {
            return
        })
    }

    else if(response == choice3){
        await interaction.editReply({
            content: `I choose... **${choice3}**`
        })
        .catch((err) => {
            return
        })
    }

    else if(response == choice4){
        await interaction.editReply({
            content: `I choose... **${choice4}**`
        })
        .catch((err) => {
            return
        })
    }

    else if(response == choice5){
        await interaction.editReply({
            content: `I choose... **${choice5}**`
        })
        .catch((err) => {
            return
        })
    }

    else if(response == choice6){
        await interaction.editReply({
            content: `I choose... **${choice6}**`
        })
        .catch((err) => {
            return
        })
    }

    else if(response == choice7){
        await interaction.editReply({
            content: `I choose... **${choice7}**`
        })
        .catch((err) => {
            return
        })
    }

    else if(response == choice8){
        await interaction.editReply({
            content: `I choose... **${choice8}**`
        })
        .catch((err) => {
            return
        })
    }

    else if(response == choice9){
        await interaction.editReply({
            content: `I choose... **${choice9}**`
        })
        .catch((err) => {
            return
        })
    }

    else if(response == choice10){
        await interaction.editReply({
            content: `I choose... **${choice10}**`
        })
        .catch((err) => {
            return
        })
    }
}