const {SlashCommandBuilder} = require("@discordjs/builders")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
.setName("beg")
.setDescription("Beg for Dashcoins; cooldown 30 sec")

module.exports.run = async ({client, interaction, Economy, workCooldown, begCooldown, robCooldown}) => {
    let getbegCooldown = await begCooldown.findOne({where: {id: interaction.member.id, command: "beg"}})
    let begcooldownTime = getbegCooldown?.expiry

    if(getbegCooldown && begcooldownTime > new Date().getTime()) {
        return await interaction.editReply({
            content: `Wait **${ms(begcooldownTime - new Date().getTime(), {long: true})}** before trying to beg again!`
        })
        .catch((err) => {
            return
        })
    }
    
    else if(getbegCooldown){
        begCooldown.destroy({where: {id: interaction.member.id, command: "beg"}})
    }

    let getUser = await Economy.findOne({where: {id: interaction.member.id}})

    if(!getUser){
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    if(getUser.wallet >= 1000 && getUser.bank < 1000){
        await interaction.editReply({
            content: "bruh you have over 1000 Dashcoins:tm: in your wallet; nobody's going to donate to you lmao"
        })
        .catch((err) => {
            return
        })
    }

    else if(getUser.wallet < 1000 && getUser.bank >= 1000){
        await interaction.editReply({
            content: "bruh you have over 1000 Dashcoins:tm: in your bank; what are you doing begging lmao"
        })
        .catch((err) => {
            return
        })
    }

    else if(getUser.wallet >= 1000 && getUser.bank >= 1000){
        await interaction.editReply({
            content: "bruh you have over 1000 Dashcoins:tm: in both your wallet and bank; what are you doing begging lmao"
        })
        .catch((err) => {
            return
        })
    }

    else if(getUser.wallet < 1000 && getUser.bank < 1000){
        const randomvalue = Math.floor(Math.random() * 100)

        if(randomvalue >= 20){
            const coins_earned = Math.floor(Math.random() * 5) + 5
    
            await Economy.update({wallet: getUser.wallet + coins_earned}, {where: {id: interaction.member.id}})
        
            begCooldown.create({
                id: interaction.member.id,
                expiry: new Date().getTime() + (15000 * 2),
                command: "beg"
            })
        
            await interaction.editReply({
                content: `You recieved **${coins_earned}** Dashcoins:tm:!`
            })
            .catch((err) => {
                return
            })
        }
    
        else if(10 <= randomvalue && randomvalue < 20){
            const coins_earned = Math.floor(Math.random() * 50) + 100
    
            await Economy.update({wallet: getUser.wallet + coins_earned}, {where: {id: interaction.member.id}})
        
            begCooldown.create({
                id: interaction.member.id,
                expiry: new Date().getTime() + (15000 * 2),
                command: "beg"
            })
        
            await interaction.editReply({
                content: `Woah, was that MrBeast? You recieved **${coins_earned}** Dashcoins:tm:!`
            })
            .catch((err) => {
                return
            })
        }
    
        else if(randomvalue < 10){
            begCooldown.create({
                id: interaction.member.id,
                expiry: new Date().getTime() + (15000 * 2),
                command: "beg"
            })
        
            await interaction.editReply({
                content: "Unfortunately, nobody donated you anything. Better luck next time."
            })
            .catch((err) => {
                return
            })
        }
    }
}