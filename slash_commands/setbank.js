const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("setbank")
.setDescription("Set a user's bank balance")
.addUserOption(option => option
    .setName("user")
    .setRequired(true)
    .setDescription("The user to set the bank balance of"))
.addIntegerOption(option => option
    .setName("amount")
    .setRequired(true)
    .setDescription("The bank balance to set"))

module.exports.run = async (client, interaction, options, Economy) => {
    if(interaction.member.id == "527285622809952256" || interaction.member.id == "842775855632744478"){
        let amount = options.getInteger("amount")
        let member = options.getMember("user")
    
        let getUser = await Economy.findOne({where: {id: interaction.member.id}})
        if(!getUser) {
            getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
        }
    
        const memberWallet = await Economy.findOne({where: {id: member.id}})
    
        if(!memberWallet) {
            memberWallet = await Economy.create({id: member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
        }
    
        const newWallet = amount
    
        await Economy.update({bank: newWallet}, {where: {id: member.id}})
    
        const embed = new MessageEmbed()
        .setTitle("💸 New Balance Set 💸")
        .setDescription(`**${member.displayName}**'s bank balance has been set to **${amount}** Dashcoins:tm:!`)
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