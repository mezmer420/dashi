const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("sell")
.setDescription("Sell items you own")
.addSubcommand((subcommand) => subcommand
    .setName("debitcard")
    .setDescription("Sell debit card")
)
.addSubcommand((subcommand) => subcommand
    .setName("motorcycle")
    .setDescription("Sell motorcycle")
)
.addSubcommand((subcommand) => subcommand
    .setName("superbike")
    .setDescription("Sell superbike")
)
.addSubcommand((subcommand) => subcommand
    .setName("wife")
    .setDescription("Sell wife")
)
.addSubcommand((subcommand) => subcommand
    .setName("bailbonds")
    .setDescription("Sell bail bonds")
)

module.exports.run = async ({client, interaction, Economy}) => {
    let getUser = await Economy.findOne({where: {id: interaction.member.id}})

    if(!getUser){
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    if(interaction.options.getSubcommand() == "debitcard"){
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

    else if(interaction.options.getSubcommand() == "motorcycle"){
        if(getUser.motorcycle == true){
            const sellprice = Math.floor(Math.random() * 100) + 350
            const newWallet = getUser.wallet + sellprice
            
            await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
            await Economy.update({motorcycle: false}, {where: {id: interaction.member.id}})
    
            const embed = new MessageEmbed()
            .setTitle(`💸 Sale Complete 💸`)
            .setDescription(`You just sold **motorcycle** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
            .setColor("#9BDBF5")
            .setThumbnail(interaction.member.user.avatarURL())
        
            await interaction.editReply({
                embeds: [embed]
            })
            .catch((err) => {
                return
            })
        }
    
        else if(getUser.motorcycle == false){
            interaction.editReply({ 
                content: "You don't own **motorcycle**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(interaction.options.getSubcommand() == "superbike"){
        if(getUser.superbike == true){
            const sellprice = Math.floor(Math.random() * 550) + 2800
            const newWallet = getUser.wallet + sellprice
    
            await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
            await Economy.update({superbike: false}, {where: {id: interaction.member.id}})
    
            const embed = new MessageEmbed()
            .setTitle(`💸 Sale Complete 💸`)
            .setDescription(`You just sold **superbike** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
            .setColor("#9BDBF5")
            .setThumbnail(interaction.member.user.avatarURL())
        
            await interaction.editReply({
                embeds: [embed]
            })
            .catch((err) => {
                return
            })
        }
    
        else if(getUser.superbike == false){
            interaction.editReply({ 
                content: "You don't own **superbike**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(interaction.options.getSubcommand() == "wife"){
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

    else if(interaction.options.getSubcommand() == "bailbonds"){
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
        
            await interaction.editReply({
                embeds: [embed]
            })
            .catch((err) => {
                return
            })
        }
    
        else if(getUser.bailbonds == false){
            interaction.editReply({ 
                content: "You don't own **bail bonds**!"
            })
            .catch((err) => {
                return
            })
        }
    }
}