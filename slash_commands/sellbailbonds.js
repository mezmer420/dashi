const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("sellbailbonds")
.setDescription("Sell bail bonds")

module.exports.run = async (client, interaction, options, Economy) => {

    const getUser = await Economy.findOne({where: {id: interaction.member.id}})
    if(!getUser) {
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }
    
    if(getUser.bailbonds == true){
        const sellprice = Math.floor(Math.random() * 350) + 1500
        const newWallet = getUser.wallet + sellprice
        await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
        await Economy.update({bailbonds: false}, {where: {id: interaction.member.id}})

        const embed = new MessageEmbed()
        .setTitle(`💸 Sale Complete 💸`)
        .setDescription(`You just sold **bail bonds** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
        .setColor("#9BDBF5")
        .setThumbnail(interaction.member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.bailbonds == false){
        interaction.editReply({ 
            content: "You don't own **bail bonds**!"
        })
    }
}