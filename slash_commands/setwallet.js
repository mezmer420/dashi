const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("setwallet")
.setDescription("Set a user's wallet balance")
.addUserOption(option => option
    .setName("user")
    .setRequired(true)
    .setDescription("The user to set the wallet balance of"))
.addIntegerOption(option => option
    .setName("amount")
    .setRequired(true)
    .setDescription("The wallet balance to set"))

module.exports.run = async (client, interaction, options, Economy) => {
    if(interaction.member.id == "527285622809952256" || interaction.member.id == "842775855632744478"){
        const amount = options.getInteger("amount")
        const member = options.getMember("user")
    
        const getUser = await Economy.findOne({where: {id: interaction.member.id}})
        if(!getUser) {
            getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
        }
    
        const memberWallet = await Economy.findOne({where: {id: member.id}})
    
        if(!memberWallet) {
            memberWallet = await Economy.create({id: member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
        }
    
        const newWallet = amount
    
        await Economy.update({wallet: newWallet}, {where: {id: member.id}})
    
        const embed = new MessageEmbed()
        .setTitle("💸 New Balance Set 💸")
        .setDescription(`**${member.displayName}**'s wallet balance has been set to **${amount}** Dashcoins:tm:!`)
        .setColor("GREEN")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }
    else {
        interaction.editReply({
            content: "only mezmer420 can use that command!"
        })
    }
}