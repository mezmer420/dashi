const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("buy")
.setDescription("Buy items from the shop")
.addSubcommand((subcommand) => subcommand
    .setName("debitcard")
    .setDescription("Buy debit card")
)
.addSubcommand((subcommand) => subcommand
    .setName("motorcycle")
    .setDescription("Buy motorcycle")
)
.addSubcommand((subcommand) => subcommand
    .setName("superbike")
    .setDescription("Buy superbike")
)
.addSubcommand((subcommand) => subcommand
    .setName("wife")
    .setDescription("Buy wife")
)
.addSubcommand((subcommand) => subcommand
    .setName("bailbonds")
    .setDescription("Buy bail bonds")
)

module.exports.run = async ({client, interaction, Economy}) => {
    let getUser = await Economy.findOne({where: {id: interaction.member.id}})

    if(!getUser){
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    if(interaction.options.getSubcommand() == "debitcard"){
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
            await interaction.editReply({ 
                content: "You already own **debit card**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(interaction.options.getSubcommand() == "motorcycle"){
        if(getUser.motorcycle == false){
            if(getUser.debitcard == true){
                if(getUser.bank >= 500){
                    const newBank = getUser.bank - 500
                    await Economy.update({bank: newBank}, {where: {id: interaction.member.id}})
                    await Economy.update({motorcycle: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **motorcycle** for 500 Dashcoins:tm: from your bank! Your new bank balance is ${newBank} Dashcoins:tm:.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
    
                else if(getUser.bank < 500 && getUser.wallet >= 500){
                    const newWallet = getUser.wallet - 500
                    await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
                    await Economy.update({motorcycle: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **motorcycle** for 500 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
    
                else if(getUser.bank < 500 && getUser.wallet < 500){
                    const walletcoinstogo = 500 - getUser.wallet
                    const bankcoinstogo = 500 - getUser.bank
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet or bank! You need **${walletcoinstogo}** Dashcoins:tm: more in your wallet **or** **${bankcoinstogo}** Dashcoins:tm: more in your bank.`)
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
    
            else if(getUser.debitcard == false){
                if(getUser.wallet >= 500){
                    const newWallet = getUser.wallet - 500
                    await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
                    await Economy.update({motorcycle: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **motorcycle** for 500 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
        
                else if(getUser.wallet < 500){
                    const coinstogo = 500 - getUser.wallet
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more.`)
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
        }
    
        else if(getUser.motorcycle == true){
            await interaction.editReply({ 
                content: "You already own **motorcycle**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(interaction.options.getSubcommand() == "superbike"){
        if(getUser.superbike == false){
            if(getUser.debitcard == true){
                if(getUser.bank >= 3500){
                    const newBank = getUser.bank - 3500
                    await Economy.update({bank: newBank}, {where: {id: interaction.member.id}})
                    await Economy.update({superbike: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **superbike** for 3500 Dashcoins:tm: from your bank! Your new bank balance is ${newBank} Dashcoins:tm:.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
    
                else if(getUser.bank < 3500 && getUser.wallet >= 3500){
                    const newWallet = getUser.wallet - 3500
                    await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
                    await Economy.update({superbike: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **superbike** for 3500 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
    
                else if(getUser.bank < 3500 && getUser.wallet < 3500){
                    const walletcoinstogo = 3500 - getUser.wallet
                    const bankcoinstogo = 3500 - getUser.bank
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet or bank! You need **${walletcoinstogo}** Dashcoins:tm: more in your wallet **or** **${bankcoinstogo}** Dashcoins:tm: more in your bank.`)
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
    
            else if(getUser.debitcard == false){
                if(getUser.wallet >= 3500){
                    const newWallet = getUser.wallet - 3500
                    await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
                    await Economy.update({superbike: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **superbike** for 3500 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
        
                else if(getUser.wallet < 3500){
                    const coinstogo = 3500 - getUser.wallet
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more.`)
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
        }
    
        else if(getUser.superbike == true){
            await interaction.editReply({ 
                content: "You already own **superbike**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(interaction.options.getSubcommand() == "wife"){
        if(getUser.wife == false){
            if(getUser.debitcard == true){
                if(getUser.bank >= 1000){
                    const newBank = getUser.bank - 1000
                    await Economy.update({bank: newBank}, {where: {id: interaction.member.id}})
                    await Economy.update({wife: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **wife** for 1000 Dashcoins:tm: from your bank! Your new bank balance is ${newBank} Dashcoins:tm:.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
    
                else if(getUser.bank < 1000 && getUser.wallet >= 1000){
                    const newWallet = getUser.wallet - 1000
                    await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
                    await Economy.update({wife: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **wife** for 1000 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
    
                else if(getUser.bank < 1000 && getUser.wallet < 1000){
                    const walletcoinstogo = 1000 - getUser.wallet
                    const bankcoinstogo = 1000 - getUser.bank
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet or bank! You need **${walletcoinstogo}** Dashcoins:tm: more in your wallet **or** **${bankcoinstogo}** Dashcoins:tm: more in your bank.`)
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
            
            else if(getUser.debitcard == false){
                if(getUser.wallet >= 1000){
                    const newWallet = getUser.wallet - 1000
                    await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
                    await Economy.update({wife: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **wife** for 1000 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
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
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more.`)
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
        }
    
        else if(getUser.wife == true){
            await interaction.editReply({ 
                content: "You already own **wife**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(interaction.options.getSubcommand() == "bailbonds"){
        if(getUser.bailbonds == false){
            if(getUser.debitcard == true){
                if(getUser.bank >= 2000){
                    const newBank = getUser.bank - 2000
                    await Economy.update({bank: newBank}, {where: {id: interaction.member.id}})
                    await Economy.update({bailbonds: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **bail bonds** for 2000 Dashcoins:tm: from your bank! Your new bank balance is ${newBank} Dashcoins:tm:.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
    
                else if(getUser.bank < 2000 && getUser.wallet >= 2000){
                    const newWallet = getUser.wallet - 2000
                    await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
                    await Economy.update({bailbonds: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **bail bonds** for 2000 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
    
                else if(getUser.bank < 2000 && getUser.wallet < 2000){
                    const walletcoinstogo = 2000 - getUser.wallet
                    const bankcoinstogo = 2000 - getUser.bank
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet or bank! You need **${walletcoinstogo}** Dashcoins:tm: more in your wallet **or** **${bankcoinstogo}** Dashcoins:tm: more in your bank.`)
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
            else if(getUser.debitcard == false){
                if(getUser.wallet >= 2000){
                    const newWallet = getUser.wallet - 2000
                    await Economy.update({wallet: newWallet}, {where: {id: interaction.member.id}})
                    await Economy.update({bailbonds: true}, {where: {id: interaction.member.id}})
        
                    const embed = new MessageEmbed()
                    .setTitle(`💸 Purchase Complete 💸`)
                    .setDescription(`You just purchased **bail bonds** for 2000 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
        
                else if(getUser.wallet < 2000){
                    const coinstogo = 2000 - getUser.wallet
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more.`)
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
        }
    
        else if(getUser.bailbonds == true){
            await interaction.editReply({ 
                content: "You already own **bail bonds**!"
            })
            .catch((err) => {
                return
            })
        }
    }
}