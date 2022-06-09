const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("pay")
.setDescription("Pay Dashcoins to another user")
.addUserOption(option => option
    .setName("user")
    .setDescription("The user you want to pay")
    .setRequired(true)
)
.addIntegerOption(option => option
    .setName("amount")
    .setDescription("The amount to give")
    .setMinValue(1)
    .setMaxValue(1000)
    .setRequired(true)
)

module.exports.run = async (client, interaction, Economy) => {
    const amount = interaction.options.getInteger("amount")
    const member = interaction.options.getMember("user")

    let getUser = await Economy.findOne({where: {id: interaction.member.id}})

    if(!getUser){
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }
    
    if(getUser.wallet < amount) return interaction.editReply({content: "Insufficient wallet balance"})
    .catch((err) => {
        return
    })

    const memberWallet = await Economy.findOne({where: {id: member.id}})

    if(!memberWallet){
        memberWallet = await Economy.create({id: member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    const newrecieverWallet = memberWallet.wallet + amount
    const newsenderWallet = getUser.wallet - amount

    await Economy.update({wallet: newrecieverWallet}, {where: {id: member.id}})
    await Economy.update({wallet: newsenderWallet}, {where: {id: interaction.member.id}})

    const embed = new MessageEmbed()
    .setTitle("💸 Coin transfer complete 💸")
    .setDescription(`**${interaction.member.displayName}** has sent **${amount}** Dashcoins:tm: to **${member.displayName}**!`)
    .setColor("GREEN")
    .setThumbnail(member.user.avatarURL())

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}