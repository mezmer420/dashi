const {SlashCommandBuilder} = require("@discordjs/builders")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
.setName("work")
.setDescription("Work for Dashcoins; default cooldown 5 min—reducable to 3 or 1 min")

module.exports.run = async ({client, interaction, Economy, dailyCooldown, workCooldown, begCooldown, robCooldown}) => {
    let getworkCooldown = await workCooldown.findOne({where: {id: interaction.member.id}})
    let workcooldownTime = getworkCooldown?.expiry

    if(getworkCooldown && workcooldownTime > new Date().getTime()) return await interaction.editReply({
        content: `Wait **${ms(workcooldownTime - new Date().getTime(), {long: true})}** before trying to work again!`
    })
    .catch((err) => {
        return
    })

    if(getworkCooldown){
        await workCooldown.destroy({where: {id: interaction.member.id}})
    }

    let getUser = await Economy.findOne({where: {id: interaction.member.id}})

    if(!getUser){
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    const randomvalue = Math.floor(Math.random() * 100)

    if(getUser.wife == true){
        if(randomvalue >= 5){
            const coins_earned = Math.floor(Math.random() * 35) + 65
    
            await Economy.update({wallet: getUser.wallet + coins_earned}, {where: {id: interaction.member.id}})
    
            if(getUser.superbike == true){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000)
                })
            }
    
            else if(getUser.motorcycle == true && getUser.superbike == false){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (180000)
                })
            }
    
            else if(getUser.motorcycle == false && getUser.superbike == false){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (150000 * 2)
                })
            }
        
            await interaction.editReply({
                content: `You earned **${coins_earned}** Dashcoins:tm:!`
            })
            .catch((err) => {
                return
            })
        }
    
        else if(randomvalue < 5){
            if(getUser.superbike == true){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000)
                })
            }
    
            else if(getUser.motorcycle == true && getUser.superbike == false){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (180000)
                })
            }
    
            else if(getUser.motorcycle == false && getUser.superbike == false){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (150000 * 2)
                })
            }
        
            await interaction.editReply({
                content: "Unfortunately, you had a bad day and couldn't work."
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(getUser.wife == false){
        if(randomvalue >= 10){
            const coins_earned = Math.floor(Math.random() * 35) + 65
    
            await Economy.update({wallet: getUser.wallet + coins_earned}, {where: {id: interaction.member.id}})
    
            if(getUser.superbike == true){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000)
                })
            }
    
            else if(getUser.motorcycle == true && getUser.superbike == false){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (180000)
                })
            }
    
            else if(getUser.motorcycle == false && getUser.superbike == false){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (150000 * 2)
                })
            }
        
            await interaction.editReply({
                content: `You earned **${coins_earned}** Dashcoins:tm:!`
            })
            .catch((err) => {
                return
            })
        }
    
        else if(randomvalue < 10){
            if(getUser.superbike == true){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000)
                })
            }
    
            else if(getUser.motorcycle == true && getUser.superbike == false){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (180000)
                })
            }
    
            else if(getUser.motorcycle == false && getUser.superbike == false){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (150000 * 2)
                })
            }
        
            await interaction.editReply({
                content: "Unfortunately, you had a bad day and couldn't work."
            })
            .catch((err) => {
                return
            })
        }
    }
}