const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("sellwife")
.setDescription("Sell wife")

module.exports.run = async (client, interaction, options, Economy) => {

    let getUser = await Economy.findOne({where: {id: interaction.member.id}})
    if(!getUser) {
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }
    
    if(getUser.wife == true){
        const sellprice = Math.floor(Math.random() * 200) + 750
        const newWallet = getUser.wallet + sellprice
        await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
        await Economy.update({wife: false}, {where: {id: interaction.member.id}})

        const embed = new MessageEmbed()
        .setTitle(`💸 Sale Complete 💸`)
        .setDescription(`You just sold **wife** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
        .setColor("#9BDBF5")
        .setThumbnail(interaction.member.user.avatarURL())
    
        await interaction.editReply({
            embeds: [embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(getUser.wife == false){
        interaction.editReply({ 
            content: "You don't own **wife**!"
        })
        .catch((err) => {
            return
        })
    }
}