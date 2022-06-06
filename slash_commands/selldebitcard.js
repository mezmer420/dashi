const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("selldebitcard")
.setDescription("Sell debit card")

module.exports.run = async (client, interaction, options, Economy) => {

    let getUser = await Economy.findOne({where: {id: interaction.member.id}})
    if(!getUser) {
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }
    
    if(getUser.debitcard == true){
        const sellprice = Math.floor(Math.random() * 200) + 750
        const newWallet = getUser.wallet + sellprice
        await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
        await Economy.update({debitcard: false}, {where: {id: interaction.member.id}})

        const embed = new MessageEmbed()
        .setTitle(`💸 Sale Complete 💸`)
        .setDescription(`You just sold **debit card** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
        .setColor("#9BDBF5")
        .setThumbnail(interaction.member.user.avatarURL())
    
        await interaction.editReply({
            embeds: [embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(getUser.debitcard == false){
        interaction.editReply({ 
            content: "You don't own **debit card**!"
        })
        .catch((err) => {
            return
        })
    }
}