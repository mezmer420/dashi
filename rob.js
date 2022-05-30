const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
.setName("rob")
.setDescription("Attempt to rob 10% of another user's wallet balance; cooldown 5 min")
.addUserOption(option => option
    .setName("user")
    .setRequired(true)
    .setDescription("The user you want to attempt to rob"))

module.exports.run = async (client, interaction, options, Economy, workCooldown, begCooldown, robCooldown) => {
    // if(interaction.member.id == "527285622809952256"){
    const member = options.getMember("user")
    const getrobCooldown = await robCooldown.findOne({where: {id: interaction.member.id, command: "rob"}})
    const robcooldownTime = getrobCooldown?.expiry
    if(getrobCooldown && robcooldownTime > new Date().getTime()) {
        return interaction.editReply({content: `Wait **${ms(robcooldownTime - new Date().getTime(), {long: true})}** before trying to rob again!`})
    } else if (getrobCooldown) {
        robCooldown.destroy({where: {id: interaction.member.id, command: "rob"}})
    }

    const getUser = await Economy.findOne({where: {id: interaction.member.id}})
    if(!getUser) {
        getUser = await Economy.create({id: interaction.member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    const memberWallet = await Economy.findOne({where: {id: member.id}})

    if(!memberWallet) {
        memberWallet = await Economy.create({id: member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    if(getUser.wallet < 100 || memberWallet.wallet < 100){
        // if(getUser.wallet = 0) interaction.editReply({content: "Bruh your wallet is empty. I'm going to stop you right there and urge you not to start off your money-making career by being a lawbreaker."})
        if(getUser.wallet < 100) interaction.editReply({content: "Bro your wallet balance is so low (less than 100 Dashcoins:tm:). I'm going to stop you right there."})
        // else if(memberWallet.wallet = 0) interaction.editReply({content: "Bruh the person you're trying to rob has **0** coins in his wallet. At least show some decency for the homeless."})
        else if(memberWallet.wallet < 100) interaction.editReply({content: "Bruh the person you're trying to rob has less than 100 Dashcoins:tm: in their wallet. Why bother trying to steal 10 Dashcoins:tm: at most?"})
    }

    else {
        if(member.id == interaction.member.id){
            interaction.editReply({
                content: "bruh did you just try to rob yourself"
            })
        }

        if(member.id == "956345939130482750"){
            interaction.editReply({
                content: "you can't rob me >:)"
            })
        }
        else {
            const randomvalue = Math.floor(Math.random() * 100)

            if(randomvalue >= 30){
                robCooldown.create({
                    id: interaction.member.id,
                    // expiry: new Date().getTime() + (150000 * 2),
                    expiry: new Date().getTime() + (150000 * 2),
                    command: "rob"
                })
        
                member.send(`**${interaction.member.displayName}** attempted and **failed** to rob you!`)
        
                const failembed = new MessageEmbed()
                .setTitle("🤦‍♂️ Robbery Failed 🤦‍♂️")
                .setDescription(`**${interaction.member.displayName}** failed to rob **${member.displayName}**!`)
                .setColor("YELLOW")
                .setThumbnail(member.user.avatarURL())
            
                interaction.editReply({
                    embeds: [failembed]
                })

                // console.log(randomvalue)
            }
        
            else if(20 <= randomvalue && randomvalue < 30){
                const coins_fined = (Math.round(getUser.wallet * 0.1))
        
                const newrobberWallet = getUser.wallet - coins_fined
            
                await Economy.update({wallet: newrobberWallet}, {where: {id: interaction.member.id}})
            
                const getworkCooldown = await workCooldown.findOne({where: {id: interaction.member.id, command: "work"}})
                if(getworkCooldown){
                    await workCooldown.destroy({where: {id: interaction.member.id, command: "work"}})
                }
                const getbegCooldown = await begCooldown.findOne({where: {id: interaction.member.id, command: "beg"}})
                if(getbegCooldown){
                    await begCooldown.destroy({where: {id: interaction.member.id, command: "beg"}})
                }

                if(getUser.bailbonds == true){
                    workCooldown.create({
                        id: interaction.member.id,
                        // expiry: new Date().getTime() + (150000 * 2),
                        expiry: new Date().getTime() + (900000),
                        command: "work"
                    })
    
                    begCooldown.create({
                        id: interaction.member.id,
                        // expiry: new Date().getTime() + (150000 * 2),
                        expiry: new Date().getTime() + (900000),
                        command: "beg"
                    })
                
                    robCooldown.create({
                        id: interaction.member.id,
                        // expiry: new Date().getTime() + (150000 * 2),
                        expiry: new Date().getTime() + (900000),
                        command: "rob"
                    })

                    const caughtembed = new MessageEmbed()
                    .setTitle("👮 Robbery Foiled 🚨")
                    .setDescription(`**${interaction.member.displayName}** attempted to rob **${member.displayName}** and was caught by the police! **${interaction.member.displayName}** was fined **${coins_fined}** Dashcoins:tm: and is in jail for **15** minutes.`)
                    .setColor("RED")
                    .setThumbnail(member.user.avatarURL())
                
                    interaction.editReply({
                        embeds: [caughtembed]
                    })

                    interaction.member.send(`You were caught by the police. You were fined **${coins_fined}** Dashcoins:tm: and since you have bail bonds, you are unable to work, beg, or rob for **15** minutes.`)
                }

                else if(getUser.bailbonds == false){
                    workCooldown.create({
                        id: interaction.member.id,
                        // expiry: new Date().getTime() + (150000 * 2),
                        expiry: new Date().getTime() + (900000 * 2),
                        command: "work"
                    })
    
                    begCooldown.create({
                        id: interaction.member.id,
                        // expiry: new Date().getTime() + (150000 * 2),
                        expiry: new Date().getTime() + (900000 * 2),
                        command: "beg"
                    })
                
                    robCooldown.create({
                        id: interaction.member.id,
                        // expiry: new Date().getTime() + (150000 * 2),
                        expiry: new Date().getTime() + (900000 * 2),
                        command: "rob"
                    })

                    const caughtembed = new MessageEmbed()
                    .setTitle("👮 Robbery Foiled 🚨")
                    .setDescription(`**${interaction.member.displayName}** attempted to rob **${member.displayName}** and was caught by the police! **${interaction.member.displayName}** was fined **${coins_fined}** Dashcoins:tm: and is in jail for **30** minutes.`)
                    .setColor("RED")
                    .setThumbnail(member.user.avatarURL())
                
                    interaction.editReply({
                        embeds: [caughtembed]
                    })

                    interaction.member.send(`You were caught by the police. You were fined **${coins_fined}** Dashcoins:tm: and you are unable to work, beg, or rob for **30** minutes.`)
                }
        
                member.send(`**${interaction.member.displayName}** attempted to rob you but was caught by the police.`)
                
                // console.log(randomvalue)
            }

            else if(randomvalue < 20){
                const coins_robbed = (Math.round(memberWallet.wallet * 0.1))
        
                const newrobberWallet = getUser.wallet + coins_robbed
                const newvictimWallet = memberWallet.wallet - coins_robbed
            
                await Economy.update({wallet: newvictimWallet}, {where: {id: member.id}})
                await Economy.update({wallet: newrobberWallet}, {where: {id: interaction.member.id}})
            
                robCooldown.create({
                    id: interaction.member.id,
                    // expiry: new Date().getTime() + (150000 * 2),
                    expiry: new Date().getTime() + (150000 * 2),
                    command: "rob"
                })
        
                member.send(`**${interaction.member.displayName}** robbed **${coins_robbed}** Dashcoins:tm: from you!`)
            
                const successembed = new MessageEmbed()
                .setTitle("💸 Robbery Successful 💸")
                .setDescription(`**${interaction.member.displayName}** has robbed **${coins_robbed}** Dashcoins:tm: from **${member.displayName}**!`)
                .setColor("GREEN")
                .setThumbnail(member.user.avatarURL())
            
                interaction.editReply({
                    embeds: [successembed]
                })
                
                // console.log(randomvalue)
            }
        }
    }
// }
// else {
//     interaction.editReply({
//         content: "this is still a wip command; mezmer420 can use this command!"
//     })
// }
}