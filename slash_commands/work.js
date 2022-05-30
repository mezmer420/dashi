const {SlashCommandBuilder} = require("@discordjs/builders")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
.setName("work")
.setDescription("Work for Dashcoins; default cooldown 5 min—reducable to 3 or 1 min")

module.exports.run = async (client, interaction, options, Economy, workCooldown, begCooldown, robCooldown) => {
    const member = interaction.member
    const getworkCooldown = await workCooldown.findOne({where: {id: member.id, command: "work"}})
    const workcooldownTime = getworkCooldown?.expiry
    if(getworkCooldown && workcooldownTime > new Date().getTime()) {
        return interaction.editReply({content: `Wait **${ms(workcooldownTime - new Date().getTime(), {long: true})}** before trying to work again!`})
    } else if (getworkCooldown) {
        workCooldown.destroy({where: {id: member.id, command: "work"}})
    }

    const getUser = await Economy.findOne({where: {id: member.id}})
    if(!getUser) {
        getUser = await Economy.create({id: member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    const randomvalue = Math.floor(Math.random() * 100)

    if(randomvalue >= 10){
        const coins_earned = Math.floor(Math.random() * 35) + 65

        await Economy.update({wallet: getUser.wallet + coins_earned}, {where: {id: member.id}})

        if(getUser.superbike == true){
            workCooldown.create({
                id: member.id,
                expiry: new Date().getTime() + (60000),
                command: "work"
            })
        }

        else if(getUser.motorcycle == true && getUser.superbike == false){
            workCooldown.create({
                id: member.id,
                expiry: new Date().getTime() + (180000),
                command: "work"
            })
        }

        else if(getUser.motorcycle == false && getUser.superbike == false){
            workCooldown.create({
                id: member.id,
                expiry: new Date().getTime() + (150000 * 2),
                command: "work"
            })
        }
    
        return interaction.editReply({
            content: `You earned **${coins_earned}** Dashcoins:tm:!`
        })
    }

    else if(randomvalue < 10){
        if(getUser.superbike == true){
            workCooldown.create({
                id: member.id,
                expiry: new Date().getTime() + (60000),
                command: "work"
            })
        }

        else if(getUser.motorcycle == true && getUser.superbike == false){
            workCooldown.create({
                id: member.id,
                expiry: new Date().getTime() + (180000),
                command: "work"
            })
        }

        else if(getUser.motorcycle == false && getUser.superbike == false){
            workCooldown.create({
                id: member.id,
                expiry: new Date().getTime() + (150000 * 2),
                command: "work"
            })
        }
    
        return interaction.editReply({
            content: "Unfortunately, you had a bad day and couldn't work."
        })
    }
}