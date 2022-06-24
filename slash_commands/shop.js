const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("shop")
.setDescription("Open the shop")

module.exports.run = async ({client, interaction}) => {
    const shopopenEmbed = new MessageEmbed()
    .setColor("#9BDBF5")
    .setTitle("Shop")
    .addField("**About**", "Cost and info below each item. To buy, type `/buy`. To sell an item you own (at a reduced price of its original), type `/sell`.")
    
    .addField("Debit Card", "`1000 Dashcoins`   Purchases will be made by default from your bank")
    .addField("Motorcycle", "`500 Dashcoins`   Get places fast! Work cooldown reduced from 10 min to 7 min")
    .addField("Superbike", "`3500 Dashcoins`   Get places super fast! Work cooldown reduced to 4 minutes")
    .addField("Hammer", "`1000 Dashcoins`   Randomized range of Dashcoins:tm: earned from working reduced from 35 to 20 from the max")
    .addField("Sickle", "`1500 Dashcoins`   Max Dashcoins:tm: earned from working increased from 100 to 150")
    .addField("Wife", "`1000 Dashcoins`   Aw, a loving partner~ Chances of having a bad day at work reduced from 10% to 5%")
    .addField("Bail Bonds", "`2000 Dashcoins`   If you're caught robbing, eco cooldowns reduced from 1 hour to 30 min")
    
    await interaction.editReply({
        embeds: [shopopenEmbed]
    })
    .catch((err) => {
        return
    })
}