const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("number")
.setDescription("Pick a random integer between two numbers, inclusive")
.addIntegerOption(option => option
    .setName("number1")
    .setRequired(true)
    .setDescription("The first number"))
.addIntegerOption(option => option
    .setName("number2")
    .setRequired(true)
    .setDescription("The second number"))


module.exports.run = (client, interaction) => {
    const num1 = interaction.options.getInteger("number1")
    const num2 = interaction.options.getInteger("number2")

    function getRandomIntInclusive(min, max){
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const randomnumber = getRandomIntInclusive(num1, num2)

    interaction.editReply({ 
        content: `From ${num1} to ${num2}, I choose... **${randomnumber}**`
    })
    .catch((err) => {
        return
    })
}