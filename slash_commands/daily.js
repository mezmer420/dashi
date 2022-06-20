const {SlashCommandBuilder} = require("@discordjs/builders")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
.setName("daily")
.setDescription("Get 150 Dashcoins for free every 16 hours")

module.exports.run = async ({client, interaction, Economy, dailyCooldown, workCooldown, begCooldown, robCooldown}) => {
    let getdailyCooldown = await dailyCooldown.findOne({where: {id: interaction.member.id}})
    let dailycooldownTime = getdailyCooldown?.expiry

    if(getdailyCooldown && dailycooldownTime > new Date().getTime()) return await interaction.editReply({
        content: `Wait **${ms(dailycooldownTime - new Date().getTime(), {long: true})}** before using ` + "`/daily`" + " again!"
    })
    .catch((err) => {
        return
    })

    if(getdailyCooldown){
        dailyCooldown.destroy({where: {id: interaction.member.id}})
    }

    let getUser = await Economy.findOne({where: {id: interaction.member.id}})

    if(!getUser){
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    const coins_earned = 150
    
    await Economy.update({wallet: getUser.wallet + coins_earned}, {where: {id: interaction.member.id}})

    dailyCooldown.create({
        id: interaction.member.id,
        expiry: new Date().getTime() + 57600000
    })

    await interaction.editReply({
        content: `You got **150** Dashcoins:tm:!`
    })
    .catch((err) => {
        return
    })
}