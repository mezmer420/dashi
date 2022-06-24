const {SlashCommandBuilder} = require("@discordjs/builders")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
.setName("hack")
.setDescription("heck someone")
.addUserOption(option => option
    .setName("target")
    .setDescription("The user to heck")
    .setRequired(true)
  )

module.exports.run = async ({client, interaction}) => {
    const victim = interaction.options.getMember("target") 

    await interaction.editReply(`Hacking ${victim.displayName}....`)
    .catch((err) => {
        return
    })

    const time = "1s"
    setTimeout(async function () {
      await interaction.editReply(`Finding ${victim.displayName}'s Email and Password.....`)
      .catch((err) => {
          return
      })
    }, ms(time));

    const time1 = "6s"
    setTimeout(async function () {
      await interaction.editReply(`E-Mail: ${victim.displayName}@gmail.com \nPassword: ********`)
      .catch((err) => {
          return
      })
    }, ms(time1));

    const time2 = "9s"
    setTimeout(async function () {
      await interaction.editReply("Finding Other Accounts.....")
      .catch((err) => {
          return
      })
    }, ms(time2));

    const time3 = "15s"
    setTimeout(async function () {
      await interaction.editReply("Setting up Epic Games Account.....")
      .catch((err) => {
          return
      })
    }, ms(time3))

    const time4 = "21s"
    setTimeout(async function () {
      await interaction.editReply("Hacking Epic Games Account......")
      .catch((err) => {
          return
      })
    }, ms(time4))

    const time5 = "28s"
    setTimeout(async function () {
      await interaction.editReply("Hacked Epic Games Account!!")
      .catch((err) => {
          return
      })
    }, ms(time5))

    const time6 = "31s"
    setTimeout(async function () {
      await interaction.editReply("Collecting Info.....")
      .catch((err) => {
          return
      })
    }, ms(time6))

    const time7 = "38s"
    setTimeout(async function () {
      await interaction.editReply("Selling data to FBI....")
      .catch((err) => {
          return
      })
    }, ms(time7))

    const time8 = "41s"
    setTimeout(async function () {
      await interaction.editReply(`Finished hacking ${victim.displayName}`)
      .catch((err) => {
          return
      })
    }, ms(time8))
}