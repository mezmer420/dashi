const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("shop")
.setDescription("Open the shop")

module.exports.run = async (client, interaction) => {
    const shopopenEmbed = new MessageEmbed()
    .setColor("#9BDBF5")
    .setTitle("Shop")
    // .addField("**About**", "Every Eoician has a unique dialect. <@527285622809952256> pays careful attention to what you say and regularly updates my dialect database.")
    .addField("**About**", "Cost and info below each item. To buy, type `/buy`. To sell an item you own (at a reduced price of its original), type `/sell`.")
    .addField("Debit Card", "`1000 Dashcoins`   Purchases will be made by default from your bank")
    .addField("Motorcycle", "`500 Dashcoins`   Get places fast! Work cooldown reduced to 3 minutes")
    .addField("Superbike", "`3500 Dashcoins`   Get places super fast! Work cooldown reduced to 1 minute")
    .addField("Wife", "`1000 Dashcoins`   Aw, a loving partner~ Chances of having a bad day at work reduced to 5%")
    .addField("Bail Bonds", "`2000 Dashcoins`   If you're caught robbing, eco cooldowns reduced to 15 minutes")
    await interaction.editReply({
        embeds: [shopopenEmbed]
    })
}