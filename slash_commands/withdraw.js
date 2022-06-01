const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("withdraw")
.setDescription("Withdraw Dashcoins from bank")
.addIntegerOption(option => option
    .setName("amount")
    .setRequired(true)
    .setDescription("The amount to withdraw"))

module.exports.run = async (client, interaction, options, Economy) => {
    let amount = options.getInteger("amount")

    if(amount < 1 || amount > 5000) return interaction.editReply({content: "Invalid amount; must be between 1 and 5000, inclusive"})

    let getUser = await Economy.findOne({where: {id: interaction.member.id}})
    if(!getUser) {
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }
    
    if(getUser.bank < amount) return interaction.editReply({content: "Insufficient bank balance!"})

    const newsenderWallet = getUser.wallet + amount
    const newsenderBank = getUser.bank - amount

    await Economy.update({wallet: newsenderWallet, bank: newsenderBank}, {where: {id: interaction.member.id}})

    const embed = new MessageEmbed()
    .setTitle("💸 Coin withdrawal complete 💸")
    .setDescription(`**${amount}** Dashcoins:tm: withdrawn from your bank!`)
    .setColor("GREEN")
    .setThumbnail(interaction.member.user.avatarURL())

    await interaction.editReply({
        embeds: [embed]
    })
}