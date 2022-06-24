const {SlashCommandBuilder} = require("@discordjs/builders")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
.setName("work")
.setDescription("Work for Dashcoins; default earned is 65-100")

module.exports.run = async ({client, interaction, Economy, Items, dailyCooldown, workCooldown, begCooldown, robCooldown}) => {
    const getworkCooldown = await workCooldown.findOne({where: {id: interaction.member.id}})
    const workcooldownTime = getworkCooldown?.expiry

    if(getworkCooldown && workcooldownTime > new Date().getTime()){
        return await interaction.editReply({
            content: `Wait **${ms(workcooldownTime - new Date().getTime(), {long: true})}** before trying to work again!`
        })
        .catch((err) => {
            return
        })
    }

    if(getworkCooldown){
        await workCooldown.destroy({where: {id: interaction.member.id}})
    }

    let getUser = await Economy.findOne({where: {id: interaction.member.id}})

    if(!getUser){
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0})
    }

    const randomvalue = Math.floor(Math.random() * 100)

    const findWife = await Items.findOne({where: {memberid: interaction.member.id, item: "5"}})
    const findMotorcycle = await Items.findOne({where: {memberid: interaction.member.id, item: "2"}})
    const findSuperbike = await Items.findOne({where: {memberid: interaction.member.id, item: "3"}})
    const findHammer = await Items.findOne({where: {memberid: interaction.member.id, item: "4"}})
    const findSickle = await Items.findOne({where: {memberid: interaction.member.id, item: "5"}})

    let coins_earned = Math.floor(Math.random() * 35) + 66

    if(findWife){
        if(randomvalue >= 5){
            if(findHammer && findSickle){
                coins_earned = Math.floor(Math.random() * 20) + 131
            } else if(findHammer && !findSickle){
                coins_earned = Math.floor(Math.random() * 20) + 81
            } else if(!findHammer && findSickle){
                coins_earned = Math.floor(Math.random() * 35) + 116
            }
            
            await Economy.update({wallet: getUser.wallet + coins_earned}, {where: {id: interaction.member.id}})
    
            if(findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 4)
                })
            }
    
            else if(findMotorcycle && !findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 7)
                })
            }
    
            else if(!findMotorcycle && !findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 10)
                })
            }
        
            return await interaction.editReply({
                content: `You earned **${coins_earned}** Dashcoins:tm:!`
            })
            .catch((err) => {
                return
            })
        }
    
        else if(randomvalue < 5){
            if(findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 4)
                })
            }
    
            else if(findMotorcycle && !findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 7)
                })
            }
    
            else if(!findMotorcycle && !findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 10)
                })
            }
        
            return await interaction.editReply({
                content: "Unfortunately, you had a bad day and couldn't work."
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(!findWife){
        if(randomvalue >= 10){
            if(findHammer && findSickle){
                coins_earned = Math.floor(Math.random() * 20) + 131
            } else if(findHammer && !findSickle){
                coins_earned = Math.floor(Math.random() * 20) + 81
            } else if(!findHammer && findSickle){
                coins_earned = Math.floor(Math.random() * 35) + 116
            }
    
            await Economy.update({wallet: getUser.wallet + coins_earned}, {where: {id: interaction.member.id}})
    
            if(findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 4)
                })
            }
    
            else if(findMotorcycle && !findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 7)
                })
            }
    
            else if(!findMotorcycle && !findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 10)
                })
            }
        
            return await interaction.editReply({
                content: `You earned **${coins_earned}** Dashcoins:tm:!`
            })
            .catch((err) => {
                return
            })
        }
    
        else if(randomvalue < 10){
            if(findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 4)
                })
            }

            else if(findMotorcycle && !findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 7)
                })
            }
    
            else if(!findMotorcycle && !findSuperbike){
                workCooldown.create({
                    id: interaction.member.id,
                    expiry: new Date().getTime() + (60000 * 10)
                })
            }
        
            return await interaction.editReply({
                content: "Unfortunately, you had a bad day and couldn't work."
            })
            .catch((err) => {
                return
            })
        }
    }
}