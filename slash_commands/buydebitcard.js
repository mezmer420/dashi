const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("buydebitcard")
.setDescription("Buy debit card")

module.exports.run = async (client, interaction, options, Economy) => {

    let getUser = await Economy.findOne({where: {id: interaction.member.id}})
    if(!getUser) {
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }
    
    if(getUser.debitcard == false){
        if(getUser.wallet >= 1000){
            const newWallet = getUser.wallet - 1000
            await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
            await Economy.update({debitcard: true}, {where: {id: interaction.member.id}})

            const embed = new MessageEmbed()
            .setTitle(`💸 Purchase Complete 💸`)
            .setDescription(`You just purchased **debit card** for 1000 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
            .setColor("#9BDBF5")
            .setThumbnail(interaction.member.user.avatarURL())
        
            await interaction.editReply({
                embeds: [embed]
            })
            .catch((err) => {
                return
            })  
        }

        else if(getUser.wallet < 1000){
            const coinstogo = 1000 - getUser.wallet

            const embed = new MessageEmbed()
            .setTitle(`⚠️ Insufficient Funds ❌`)
            .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more in your wallet.`)
            .setColor("#9BDBF5")
            .setThumbnail(interaction.member.user.avatarURL())
        
            await interaction.editReply({
                embeds: [embed]
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(getUser.debitcard == true){
        interaction.editReply({ 
            content: "You already own **debit card**!"
        })
        .catch((err) => {
            return
        })
    }
}