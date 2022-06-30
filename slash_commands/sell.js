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
        {name: "debit card", value: "Debit Card"},
        {name: "motorcycle", value: "Motorcycle"},
        {name: "superbike", value: "Superbike"},
        {name: "hammer", value: "Hammer"},
        {name: "sickle", value: "Sickle"},
        {name: "wife", value: "Wife"},
        {name: "bail bonds", value: "Bail Bonds"}
    )
)

module.exports.run = async ({client, interaction, Economy, Items}) => {
    const item = interaction.options.getString("item")

    let getUser = await Economy.findOne({where: {id: interaction.member.id}})

    if(!getUser){
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0})
    }

    const findItem = await Items.findOne({where: {memberid: interaction.member.id, item: item}})

    const itemLowercase = item.toLowerCase()

    let minprice
    let maxprice
    let price
    let sellprice
    if(item == "Debit Card"){
        minprice = 750
        maxprice = 950
        price = 1000
        sellprice = Math.floor(Math.random() * 200) + 751
    } else if(item == "Motorcycle"){
        minprice = 350
        maxprice = 450
        price = 500
        sellprice = Math.floor(Math.random() * 100) + 351
    } else if(item == "Superbike"){
        minprice = 2800
        maxprice = 3350
        price = 3500
        sellprice = Math.floor(Math.random() * 550) + 2801
    } else if(item == "Hammer"){
        minprice = 750
        maxprice = 950
        price = 1000
        sellprice = Math.floor(Math.random() * 200) + 751
    } else if(item == "Sickle"){
        minprice = 1100
        maxprice = 1400
        price = 1500
        sellprice = Math.floor(Math.random() * 300) + 1101
    } else if(item == "Wife"){
        minprice = 750
        maxprice = 950
        price = 1000
        sellprice = Math.floor(Math.random() * 200) + 751
    } else if(item == "Bail Bonds"){
        minprice = 1500
        maxprice = 1850
        price = 2000
        sellprice = Math.floor(Math.random() * 350) + 150
    }

    if(!findItem){
        return await interaction.editReply({ 
            content: `You don't own **${itemLowercase}**!`
        })
        .catch((err) => {
            return
        })
    }

    const minnewWallet = getUser.wallet + minprice
    const maxnewWallet = getUser.wallet + maxprice

    const embed = new MessageEmbed()
    .setTitle(`Confirm you wish to sell ***${itemLowercase}*** for ${minprice}-${maxprice} Dashcoins:tm:`)
    .setDescription(`The Dashcoins:tm: will be transferred to your wallet.`)
    .addFields(
        {name: "Original Purchase Price", value: `${price} Dashcoins:tm:`, inline: true},
        {name: "Current Wallet", value: `${getUser.wallet} Dashcoins:tm:`, inline: true},
        {name: "Wallet After Purchase", value: `${minnewWallet}-${maxnewWallet} Dashcoins:tm:`, inline: true}
    )
    .setColor("#9BDBF5")

    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel("Confirm Sale")
        .setStyle("PRIMARY")
        .setCustomId(`sell_${item}`)
    )

    const response = await interaction.editReply({
        embeds: [embed],
        components: [row]
    })
    .catch((err) => {
        return
    })

    const filter = i => {
        return i.user.id == interaction.user.id
    }

    const collector = response.createMessageComponentCollector({
        filter,
        max: 1,
        time: 10000
    })

    collector.on("collect", async i => {
        const newfindItem = await Items.findOne({where: {memberid: interaction.member.id, item: item}})

        if(!newfindItem) return

        const command = i.customId

        if(command !== `sell_${item}`) return

        const getNewUser = await Economy.findOne({where: {id: interaction.member.id}})

        const updateWallet = getNewUser.wallet + sellprice

        await Economy.update({wallet: updateWallet}, {where: {id: interaction.member.id}})
        await Items.destroy({where: {memberid: interaction.member.id, item: item}})

        const getNewNewUser = await Economy.findOne({where: {id: interaction.member.id}})

        const newBalance = getNewNewUser.wallet

        await i.reply({
            embeds: [
                new MessageEmbed()
                .setTitle(`💸 Sale Complete 💸`)
                .setDescription(`You just sold **${itemLowercase}** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newBalance} Dashcoins:tm:.`)
                .setColor("#9BDBF5")
                .setThumbnail(interaction.member.user.avatarURL())
            ]
        })
        .catch((err) => {
            return
        })
    })

    collector.on("end", async i => {
        row.components[0].setDisabled(true)

        await response.edit({
            components: [row]
        })
        .catch((err) => {
            return
        })
    })
}