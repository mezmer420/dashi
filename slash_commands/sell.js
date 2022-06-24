const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("sell")
.setDescription("Sell items you own")
.addStringOption(option => option
    .setName("item")
    .setDescription("The item to purchase")
    .setRequired(true)
    .addChoices(
        {name: "debit card", value: "debitcard"},
        {name: "motorcycle", value: "motorcycle"},
        {name: "superbike", value: "superbike"},
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

    if(item == "debitcard"){
        if(findItem){
            const minnewWallet = getUser.wallet + 750
            const maxnewWallet = getUser.wallet + 950

            const embed = new MessageEmbed()
            .setTitle(`Confirm you wish to sell ***${itemname}*** for 750-950 Dashcoins:tm:`)
            .setDescription(`The Dashcoins:tm: will be transferred to your wallet.`)
            .addFields(
                {name: "Original Purchase Price", value: "1000 Dashcoins:tm:", inline: true},
                {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                {name: "Wallet After Purchase", value: `${minnewWallet}-${maxnewWallet} Dashcoins:tm:`, inline: true}
            )
            .setColor("#9BDBF5")

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Confirm Sale")
                .setStyle("PRIMARY")
                .setCustomId(`sell_${item}-${interaction.member.id}`)
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
    
        else if(!findItem){
            return await interaction.editReply({ 
                content: "You don't own **debit card**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(item == "motorcycle"){
        if(findItem){
            const minnewWallet = getUser.wallet + 350
            const maxnewWallet = getUser.wallet + 450

            const embed = new MessageEmbed()
            .setTitle(`Confirm you wish to sell ***${itemname}*** for 350-450 Dashcoins:tm:`)
            .setDescription(`The Dashcoins:tm: will be transferred to your wallet.`)
            .addFields(
                {name: "Original Purchase Price", value: "500 Dashcoins:tm:", inline: true},
                {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                {name: "Wallet After Purchase", value: `${minnewWallet}-${maxnewWallet} Dashcoins:tm:`, inline: true}
            )
            .setColor("#9BDBF5")

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Confirm Sale")
                .setStyle("PRIMARY")
                .setCustomId(`sell_${item}-${interaction.member.id}`)
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
    
        else if(!findItem){
            return await interaction.editReply({ 
                content: "You don't own **motorcycle**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(item == "superbike"){
        if(findItem){
            const minnewWallet = getUser.wallet + 2800
            const maxnewWallet = getUser.wallet + 3350

            const embed = new MessageEmbed()
            .setTitle(`Confirm you wish to sell ***${itemname}*** for 2800-3350 Dashcoins:tm:`)
            .setDescription(`The Dashcoins:tm: will be transferred to your wallet.`)
            .addFields(
                {name: "Original Purchase Price", value: "3500 Dashcoins:tm:", inline: true},
                {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                {name: "Wallet After Purchase", value: `${minnewWallet}-${maxnewWallet} Dashcoins:tm:`, inline: true}
            )
            .setColor("#9BDBF5")

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Confirm Sale")
                .setStyle("PRIMARY")
                .setCustomId(`sell_${item}-${interaction.member.id}`)
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
    
        else if(!findItem){
            return await interaction.editReply({ 
                content: "You don't own **superbike**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    if(item == "hammer"){
        if(findItem){
            const minnewWallet = getUser.wallet + 750
            const maxnewWallet = getUser.wallet + 950

            const embed = new MessageEmbed()
            .setTitle(`Confirm you wish to sell ***${itemname}*** for 750-950 Dashcoins:tm:`)
            .setDescription(`The Dashcoins:tm: will be transferred to your wallet.`)
            .addFields(
                {name: "Original Purchase Price", value: "1000 Dashcoins:tm:", inline: true},
                {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                {name: "Wallet After Purchase", value: `${minnewWallet}-${maxnewWallet} Dashcoins:tm:`, inline: true}
            )
            .setColor("#9BDBF5")

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Confirm Sale")
                .setStyle("PRIMARY")
                .setCustomId(`sell_${item}-${interaction.member.id}`)
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
    
        else if(!findItem){
            return await interaction.editReply({ 
                content: "You don't own **hammer**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(item == "sickle"){
        if(findItem){
            const minnewWallet = getUser.wallet + 1100
            const maxnewWallet = getUser.wallet + 1400

            const embed = new MessageEmbed()
            .setTitle(`Confirm you wish to sell ***${itemname}*** for 1100-1400 Dashcoins:tm:`)
            .setDescription(`The Dashcoins:tm: will be transferred to your wallet.`)
            .addFields(
                {name: "Original Purchase Price", value: "1500 Dashcoins:tm:", inline: true},
                {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                {name: "Wallet After Purchase", value: `${minnewWallet}-${maxnewWallet} Dashcoins:tm:`, inline: true}
            )
            .setColor("#9BDBF5")

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Confirm Sale")
                .setStyle("PRIMARY")
                .setCustomId(`sell_${item}-${interaction.member.id}`)
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
    
        else if(!findItem){
            return await interaction.editReply({ 
                content: "You don't own **sickle**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(item == "wife"){
        if(findItem){
            const minnewWallet = getUser.wallet + 750
            const maxnewWallet = getUser.wallet + 950

            const embed = new MessageEmbed()
            .setTitle(`Confirm you wish to sell ***${itemname}*** for 750-950 Dashcoins:tm:`)
            .setDescription(`The Dashcoins:tm: will be transferred to your wallet.`)
            .addFields(
                {name: "Original Purchase Price", value: "1000 Dashcoins:tm:", inline: true},
                {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                {name: "Wallet After Purchase", value: `${minnewWallet}-${maxnewWallet} Dashcoins:tm:`, inline: true}
            )
            .setColor("#9BDBF5")

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Confirm Sale")
                .setStyle("PRIMARY")
                .setCustomId(`sell_${item}-${interaction.member.id}`)
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
    
        else if(!findItem){
            return await interaction.editReply({ 
                content: "You don't own **wife**!"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(item == "bailbonds"){
        if(findItem){
            const minnewWallet = getUser.wallet + 1500
            const maxnewWallet = getUser.wallet + 1850

            const embed = new MessageEmbed()
            .setTitle(`Confirm you wish to sell ***${itemname}*** for 1500-1850 Dashcoins:tm:`)
            .setDescription(`The Dashcoins:tm: will be transferred to your wallet.`)
            .addFields(
                {name: "Original Purchase Price", value: "2000 Dashcoins:tm:", inline: true},
                {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
                {name: "Wallet After Purchase", value: `${minnewWallet}-${maxnewWallet} Dashcoins:tm:`, inline: true}
            )
            .setColor("#9BDBF5")

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Confirm Sale")
                .setStyle("PRIMARY")
                .setCustomId(`sell_${item}-${interaction.member.id}`)
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
    
        else if(!findItem){
            return await interaction.editReply({ 
                content: "You don't own **bail bonds**!"
            })
            .catch((err) => {
                return
            })
        }
    }
}