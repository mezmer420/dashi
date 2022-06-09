const {SlashCommandBuilder} = require("@discordjs/builders")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
.setName("hack")
.setDescription("heck someone")
.addUserOption(option => option
    .setName("user")
    .setRequired(true)
    .setDescription("The user to heck"))

module.exports.run = async (client, interaction) => {
    const victim = interaction.options.getMember("user") 

    await interaction.editReply(`Hacking ${victim.displayName}....`)
    .catch((err) => {
        return
    })

    let time = "1s"
    setTimeout(function () {
      interaction.editReply(`Finding ${victim.displayName}'s Email and Password.....`)
      .catch((err) => {
          return
      })
    }, ms(time));

    let time1 = "6s"
    setTimeout(function () {
      interaction.editReply(`E-Mail: ${victim.displayName}@gmail.com \nPassword: ********`)
      .catch((err) => {
          return
      })
    }, ms(time1));

    let time2 = "9s"
    setTimeout(function () {
      interaction.editReply("Finding Other Accounts.....")
      .catch((err) => {
          return
      })
    }, ms(time2));

    let time3 = "15s"
    setTimeout(function () {
      interaction.editReply("Setting up Epic Games Account.....")
      .catch((err) => {
          return
      })
    }, ms(time3))

    let time4 = "21s"
    setTimeout(function () {
      interaction.editReply("Hacking Epic Games Account......")
      .catch((err) => {
          return
      })
    }, ms(time4))

    let time5 = "28s"
    setTimeout(function () {
      interaction.editReply("Hacked Epic Games Account!!")
      .catch((err) => {
          return
      })
    }, ms(time5))

    let time6 = "31s"
    setTimeout(function () {
      interaction.editReply("Collecting Info.....")
      .catch((err) => {
          return
      })
    }, ms(time6))

    let time7 = "38s"
    setTimeout(function () {
      interaction.editReply("Selling data to FBI....")
      .catch((err) => {
          return
      })
    }, ms(time7))

    let time8 = "41s"
    setTimeout(function () {
      interaction.editReply(`Finished hacking ${victim.displayName}`)
      .catch((err) => {
          return
      })
    }, ms(time8))
}