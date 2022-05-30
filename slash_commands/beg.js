const {SlashCommandBuilder} = require("@discordjs/builders")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
.setName("beg")
.setDescription("Beg for Dashcoins; cooldown 30 sec")

module.exports.run = async (client, interaction, options, Economy, workCooldown, begCooldown, robCooldown) => {
    let member = interaction.member
    let getbegCooldown = await begCooldown.findOne({where: {id: member.id, command: "beg"}})
    let begcooldownTime = getbegCooldown?.expiry
    if(getbegCooldown && begcooldownTime > new Date().getTime()) {
        return interaction.editReply({content: `Wait **${ms(begcooldownTime - new Date().getTime(), {long: true})}** before trying to beg again!`})
    } else if (getbegCooldown) {
        begCooldown.destroy({where: {id: member.id, command: "beg"}})
    }

    let getUser = await Economy.findOne({where: {id: member.id}})
    if(!getUser) {
        getUser = await Economy.create({id: member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    if(getUser.wallet >= 100 && getUser.bank < 100){
        return interaction.editReply({
            content: "bruh you have over 100 Dashcoins:tm: in your wallet; nobody's going to donate to you lmao"
        })
    }

    else if(getUser.wallet < 100 && getUser.bank >= 100){
        return interaction.editReply({
            content: "bruh you have over 100 Dashcoins:tm: in your bank; what are you doing begging lmao"
        })
    }

    else if(getUser.wallet >= 100 && getUser.bank >= 100){
        return interaction.editReply({
            content: "bruh you have over 100 Dashcoins:tm: in both your wallet and bank; what are you doing begging lmao"
        })
    }

    else if(getUser.wallet < 100 && getUser.bank < 100){
        const randomvalue = Math.floor(Math.random() * 100)

        if(randomvalue >= 20){
            const coins_earned = Math.floor(Math.random() * 5) + 5
    
            await Economy.update({wallet: getUser.wallet + coins_earned}, {where: {id: member.id}})
        
            begCooldown.create({
                id: member.id,
                expiry: new Date().getTime() + (15000 * 2),
                command: "beg"
            })
        
            return interaction.editReply({
                content: `You recieved **${coins_earned}** Dashcoins:tm:!`
            })
        }
    
        else if(10 <= randomvalue && randomvalue < 20){
            const coins_earned = Math.floor(Math.random() * 50) + 100
    
            await Economy.update({wallet: getUser.wallet + coins_earned}, {where: {id: member.id}})
        
            begCooldown.create({
                id: member.id,
                expiry: new Date().getTime() + (15000 * 2),
                command: "beg"
            })
        
            return interaction.editReply({
                content: `Woah, was that MrBeast? You recieved **${coins_earned}** Dashcoins:tm:!`
            })
        }
    
        else if(randomvalue < 10){
            begCooldown.create({
                id: member.id,
                expiry: new Date().getTime() + (15000 * 2),
                command: "beg"
            })
        
            return interaction.editReply({
                content: "Unfortunately, nobody donated you anything. Better luck next time."
            })
        }
    }
}