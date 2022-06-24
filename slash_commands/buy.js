const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("buy")
.setDescription("Buy items from the shop")
.addStringOption(option => option
    .setName("item")
    .setDescription("The item to purchase")
    .setRequired(true)
    .addChoices(
        {name: "debit card", value: "debitcard"},
        {name: "motorcycle", value: "motorcycle"},
        {name: "superbike", value: "superbike"},
        {name: "hammer", value: "hammer"},
        {name: "sickle", value: "sickle"},
        {name: "wife", value: "wife"},
        {name: "bail bonds", value: "bailbonds"}
    )
)

module.exports.run = async ({client, interaction, Economy, Items}) => {
    const item = interaction.options.getString("item")

    let getUser = await Economy.findOne({where: {id: interaction.member.id}})

    if(!getUser){
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0})
    }

    let itemid
    let itemname = item

    if(item == "debitcard"){
        itemid = "1"
        itemname = "debit card"
    } else if(item == "motorcycle"){
        itemid = "2"
    } else if(item == "superbike"){
        itemid = "3"
    } else if(item == "hammer"){
        itemid = "4"
    } else if(item == "sickle"){
        itemid = "5"
    } else if(item == "wife"){
        itemid = "6"
    } else if(item == "bailbonds"){
        itemid = "7"
        itemname = "bail bonds"
    }

    const findItem = await Items.findOne({where: {memberid: interaction.member.id, item: itemid}})
    const findDebitcard = await Items.findOne({where: {memberid: interaction.member.id, item: "1"}})

    if(item == "debitcard"){
        if(!findItem){
            if(getUser.wallet >= 1000){
                const newWallet = getUser.wallet - 1000

                const embed = new MessageEmbed()
                .setTitle(`Confirm you wish to purchase **${itemname}** for 1000 Dashcoins:tm:`)
                .setDescription(`The purchase will be made from your wallet.`)
                .addFields(
                    {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                    {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                )
                .setColor("#9BDBF5")

                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel("Confirm Purchase")
                    .setStyle("PRIMARY")
                    .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                )

                const response = await interaction.editReply({
                    embeds: [embed],
                    components: [row]
                })
                .catch((err) => {
                    return
                })
        
                setTimeout(async function () {
                    row.components[0].setDisabled(true)
        
                    await response.edit({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
                }, 10000)
            }
    
            else if(getUser.wallet < 1000){
                const coinstogo = 1000 - getUser.wallet
    
                const embed = new MessageEmbed()
                .setTitle(`⚠️ Insufficient Funds ❌`)
                .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more in your wallet.`)
                .setColor("#9BDBF5")
                .setThumbnail(interaction.member.user.avatarURL())
            
                return await interaction.editReply({
                    embeds: [embed]
                })
                .catch((err) => {
                    return
                })
            }
        }
    
        else if(findItem){
            return await interaction.editReply({ 
                content: "You already own **debit card**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(item == "motorcycle"){
        if(!findItem){
            if(findDebitcard){
                if(getUser.bank >= 500){
                    const newBank = getUser.bank - 500

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 1000 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your bank.`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Bank After Purchase", value: `${newBank} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_bank-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
    
                else if(getUser.bank < 500 && getUser.wallet >= 500){
                    const newWallet = getUser.wallet - 500

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 500 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet. (You don't have enough Dashcoins:tm: in your bank to use your debit card)`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
    
                else if(getUser.bank < 500 && getUser.wallet < 500){
                    const walletcoinstogo = 500 - getUser.wallet
                    const bankcoinstogo = 500 - getUser.bank
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet or bank! You need **${walletcoinstogo}** Dashcoins:tm: more in your wallet **or** **${bankcoinstogo}** Dashcoins:tm: more in your bank.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    return await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
            }
    
            else if(!findDebitcard){
                if(getUser.wallet >= 500){
                    const newWallet = getUser.wallet - 500

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 500 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet.`)
                    .addFields(
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
        
                else if(getUser.wallet < 500){
                    const coinstogo = 500 - getUser.wallet
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    return await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
            }
        }
    
        else if(findItem){
            return await interaction.editReply({ 
                content: "You already own **motorcycle**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(item == "superbike"){
        if(!findItem){
            if(findDebitcard){
                if(getUser.bank >= 3500){
                    const newBank = getUser.bank - 3500

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 3500 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your bank.`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Bank After Purchase", value: `${newBank} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_bank-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
    
                else if(getUser.bank < 3500 && getUser.wallet >= 3500){
                    const newWallet = getUser.wallet - 3500

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 3500 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet. (You don't have enough Dashcoins:tm: in your bank to use your debit card)`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
    
                else if(getUser.bank < 3500 && getUser.wallet < 3500){
                    const walletcoinstogo = 3500 - getUser.wallet
                    const bankcoinstogo = 3500 - getUser.bank
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet or bank! You need **${walletcoinstogo}** Dashcoins:tm: more in your wallet **or** **${bankcoinstogo}** Dashcoins:tm: more in your bank.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    return await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
            }
    
            else if(!findDebitcard){
                if(getUser.wallet >= 3500){
                    const newWallet = getUser.wallet - 3500

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 3500 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet.`)
                    .addFields(
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
        
                else if(getUser.wallet < 3500){
                    const coinstogo = 3500 - getUser.wallet
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    return await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
            }
        }
    
        else if(findItem){
            return await interaction.editReply({ 
                content: "You already own **superbike**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(item == "hammer"){
        if(!findItem){
            if(findDebitcard){
                if(getUser.bank >= 1000){
                    const newBank = getUser.bank - 1000

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 1000 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your bank.`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Bank After Purchase", value: `${newBank} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_bank-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
    
                else if(getUser.bank < 1000 && getUser.wallet >= 1000){
                    const newWallet = getUser.wallet - 1000

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 1000 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet. (You don't have enough Dashcoins:tm: in your bank to use your debit card)`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
    
                else if(getUser.bank < 1000 && getUser.wallet < 1000){
                    const walletcoinstogo = 1000 - getUser.wallet
                    const bankcoinstogo = 1000 - getUser.bank
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet or bank! You need **${walletcoinstogo}** Dashcoins:tm: more in your wallet **or** **${bankcoinstogo}** Dashcoins:tm: more in your bank.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    return await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
            }
    
            else if(!findDebitcard){
                if(getUser.wallet >= 1000){
                    const newWallet = getUser.wallet - 1000

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 1000 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet.`)
                    .addFields(
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
        
                else if(getUser.wallet < 1000){
                    const coinstogo = 1000 - getUser.wallet
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    return await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
            }
        }
    
        else if(findItem){
            return await interaction.editReply({ 
                content: "You already own **hammer**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(item == "sickle"){
        if(!findItem){
            if(findDebitcard){
                if(getUser.bank >= 1500){
                    const newBank = getUser.bank - 1500

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 1500 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your bank.`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Bank After Purchase", value: `${newBank} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_bank-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
    
                else if(getUser.bank < 1500 && getUser.wallet >= 1500){
                    const newWallet = getUser.wallet - 1500

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 1500 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet. (You don't have enough Dashcoins:tm: in your bank to use your debit card)`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
    
                else if(getUser.bank < 1500 && getUser.wallet < 1500){
                    const walletcoinstogo = 1500 - getUser.wallet
                    const bankcoinstogo = 1500 - getUser.bank
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet or bank! You need **${walletcoinstogo}** Dashcoins:tm: more in your wallet **or** **${bankcoinstogo}** Dashcoins:tm: more in your bank.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    return await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
            }
    
            else if(!findDebitcard){
                if(getUser.wallet >= 1500){
                    const newWallet = getUser.wallet - 1500

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 1500 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet.`)
                    .addFields(
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
        
                else if(getUser.wallet < 1500){
                    const coinstogo = 1500 - getUser.wallet
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    return await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
            }
        }
    
        else if(findItem){
            return await interaction.editReply({ 
                content: "You already own **sickle**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(item == "wife"){
        if(!findItem){
            if(findDebitcard){
                if(getUser.bank >= 1000){
                    const newBank = getUser.bank - 1000

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 1000 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your bank.`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Bank After Purchase", value: `${newBank} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_bank-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
    
                else if(getUser.bank < 1000 && getUser.wallet >= 1000){
                    const newWallet = getUser.wallet - 1000

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 1000 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet. (You don't have enough Dashcoins:tm: in your bank to use your debit card)`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
    
                else if(getUser.bank < 1000 && getUser.wallet < 1000){
                    const walletcoinstogo = 1000 - getUser.wallet
                    const bankcoinstogo = 1000 - getUser.bank
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet or bank! You need **${walletcoinstogo}** Dashcoins:tm: more in your wallet **or** **${bankcoinstogo}** Dashcoins:tm: more in your bank.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    return await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
            }
            
            else if(!findDebitcard){
                if(getUser.wallet >= 1000){
                    const newWallet = getUser.wallet - 1000

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 1000 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet.`)
                    .addFields(
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
        
                else if(getUser.wallet < 1000){
                    const coinstogo = 1000 - getUser.wallet
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    return await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
            }
        }
    
        else if(findItem){
            return await interaction.editReply({ 
                content: "You already own **wife**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(item == "bailbonds"){
        if(!findItem){
            if(findDebitcard){
                if(getUser.bank >= 2000){
                    const newBank = getUser.bank - 2000

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 2000 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your bank.`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Bank After Purchase", value: `${newBank} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_bank-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
    
                else if(getUser.bank < 2000 && getUser.wallet >= 2000){
                    const newWallet = getUser.wallet - 2000

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 2000 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet. (You don't have enough Dashcoins:tm: in your bank to use your debit card)`)
                    .addFields(
                        {name: "Current Bank", value: `${getUser.bank} Dashcoins:tm:`, inline: true},
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
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
            else if(!findDebitcard){
                if(getUser.wallet >= 2000){
                    const newWallet = getUser.wallet - 2000

                    const embed = new MessageEmbed()
                    .setTitle(`Confirm you wish to purchase **${itemname}** for 2000 Dashcoins:tm:`)
                    .setDescription(`The purchase will be made from your wallet.`)
                    .addFields(
                        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                        {name: "Wallet After Purchase", value: `${newWallet} Dashcoins:tm:`, inline: true}
                    )
                    .setColor("#9BDBF5")
    
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel("Confirm Purchase")
                        .setStyle("PRIMARY")
                        .setCustomId(`buy_${item}_wallet-${interaction.member.id}`)
                    )
    
                    const response = await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                    })
                    .catch((err) => {
                        return
                    })
            
                    setTimeout(async function () {
                        row.components[0].setDisabled(true)
            
                        await response.edit({
                            embeds: [embed],
                            components: [row]
                        })
                        .catch((err) => {
                            return
                        })
                    }, 10000)
                }
        
                else if(getUser.wallet < 2000){
                    const coinstogo = 2000 - getUser.wallet
        
                    const embed = new MessageEmbed()
                    .setTitle(`⚠️ Insufficient Funds ❌`)
                    .setDescription(`You don't have enough Dashcoins:tm: in your wallet! You need **${coinstogo}** Dashcoins:tm: more.`)
                    .setColor("#9BDBF5")
                    .setThumbnail(interaction.member.user.avatarURL())
                
                    return await interaction.editReply({
                        embeds: [embed]
                    })
                    .catch((err) => {
                        return
                    })
                }
            }
        }
    
        else if(findItem){
            return await interaction.editReply({ 
                content: "You already own **bail bonds**!"
            })
            .catch((err) => {
                return
            })
        }
    }
}