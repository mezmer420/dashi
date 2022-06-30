const {SlashCommandBuilder} = require("@discordjs/builders")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
.setName("set-birthday")
.setDescription("Set your birthday")
.addIntegerOption(option => option
    .setName("month")
    .setDescription("Month of your birthday")
    .setMinValue(1)
    .setMaxValue(12)
    .setRequired(true)
)
.addIntegerOption(option => option
    .setName("day")
    .setDescription("Day of your birthday")
    .setMinValue(1)
    .setMaxValue(31)
    .setRequired(true)
)
.addIntegerOption(option => option
    .setName("year")
    .setDescription("Year of your birthday")
    .setMinValue(1950)
    .setMaxValue(2009)
    .setRequired(true)
)

module.exports.run = async ({client, interaction, Birthdays}) => {
    const monthInput = interaction.options.getInteger("month")
    const dayInput = interaction.options.getInteger("day")
    const yearInput = interaction.options.getInteger("year")

    if(monthInput == 2 && dayInput > 28){
        return await interaction.editReply({
            content: "Invalid date"
        })
        .catch((err) => {
            return
        })
    }

    if(monthInput == 4 && dayInput > 30){
        return await interaction.editReply({
            content: "Invalid date"
        })
        .catch((err) => {
            return
        })
    }

    if(monthInput == 6 && dayInput > 30){
        return await interaction.editReply({
            content: "Invalid date"
        })
        .catch((err) => {
            return
        })
    }

    if(monthInput == 9 && dayInput > 30){
        return await interaction.editReply({
            content: "Invalid date"
        })
        .catch((err) => {
            return
        })
    }

    if(monthInput == 11 && dayInput > 30){
        return await interaction.editReply({
            content: "Invalid date"
        })
        .catch((err) => {
            return
        })
    }

    const year = `${yearInput}`
    let month = `${monthInput}`
    let day = `${dayInput}`

    if(monthInput < 10){
        month = month.replace(/^/, "0")
    }

    if(dayInput < 10){
        day = day.replace(/^/, "0")
    }

    const getUser = await Birthdays.findOne({where: {id: interaction.member.id}})

    const date = new Date(`${year}-${month}-${day}T00:00:00`)
    const datets = date.getTime()

    if(getUser){
        await Birthdays.update({date: datets}, {where: {id: interaction.member.id}})

        return await interaction.editReply({
            content: `Your birthday has been set to ${month}-${day}-${year}`
        })
        .catch((err) => {
            return
        })
    }

    if(!getUser){
        await Birthdays.create({id: interaction.member.id, date: datets})

        return await interaction.editReply({
            content: `Your birthday has been set to ${month}-${day}-${year}`
        })
        .catch((err) => {
            return
        })
    }
}