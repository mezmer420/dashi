const {Infractions, Economy, Items, dailyCooldown, workCooldown, begCooldown, robCooldown, Waifus, Spams} = require("../database")
const {commands} = require("../slash-register")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction){
        if(interaction.isCommand()){
            await interaction.deferReply()

            const name = interaction.commandName
            const commandMethod = commands.get(name)
            
            if(!commandMethod) return

            commandMethod({client, interaction, Infractions, Economy, Items, dailyCooldown, workCooldown, begCooldown, robCooldown, Waifus, Spams})
        }

        else if(interaction.isButton()){
            const button_id = interaction.customId
            const [command, id] = button_id.split("-")

            if(interaction.member.id !== id) return

            const member = interaction.guild.members.cache.get(id)
            const permissions = interaction.member.permissions

            if(command == "buy_debitcard_wallet"){
                const findDebitcard = await Items.findOne({where: {memberid: id, item: "1"}})

                if(findDebitcard) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newWallet = getUser.wallet - 1000

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.create({memberid: id, item: "1"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **debit card** for 1000 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "buy_motorcycle_bank"){
                const findMotorcycle = await Items.findOne({where: {memberid: id, item: "2"}})

                if(findMotorcycle) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newBank = getUser.bank - 500

                await Economy.update({bank: newBank}, {where: {id: id}})
                await Items.create({memberid: id, item: "2"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **motorcycle** for 500 Dashcoins:tm: from your bank! Your new bank balance is ${newBank} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "buy_motorcycle_wallet"){
                const findMotorcycle = await Items.findOne({where: {memberid: id, item: "2"}})

                if(findMotorcycle) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newWallet = getUser.wallet - 500

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.create({memberid: id, item: "2"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **motorcycle** for 500 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "buy_superbike_bank"){
                const findSuperbike = await Items.findOne({where: {memberid: id, item: "3"}})

                if(findSuperbike) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newBank = getUser.bank - 3500

                await Economy.update({bank: newBank}, {where: {id: id}})
                await Items.create({memberid: id, item: "3"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **superbike** for 3500 Dashcoins:tm: from your bank! Your new bank balance is ${newBank} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "buy_superbike_wallet"){
                const findSuperbike = await Items.findOne({where: {memberid: id, item: "3"}})

                if(findSuperbike) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newWallet = getUser.wallet - 3500

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.create({memberid: id, item: "3"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **superbike** for 3500 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            if(command == "buy_hammer_wallet"){
                const findHammer = await Items.findOne({where: {memberid: id, item: "4"}})

                if(findHammer) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newWallet = getUser.wallet - 1000

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.create({memberid: id, item: "4"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **hammer** for 1000 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "buy_hammer_bank"){
                const findHammer = await Items.findOne({where: {memberid: id, item: "4"}})

                if(findHammer) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newBank = getUser.bank - 1000

                await Economy.update({bank: newBank}, {where: {id: id}})
                await Items.create({memberid: id, item: "4"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **hammer** for 1000 Dashcoins:tm: from your bank! Your new bank balance is ${newBank} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "buy_sickle_bank"){
                const findSickle = await Items.findOne({where: {memberid: id, item: "5"}})

                if(findSickle) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newBank = getUser.bank - 1500

                await Economy.update({bank: newBank}, {where: {id: id}})
                await Items.create({memberid: id, item: "5"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **sickle** for 1500 Dashcoins:tm: from your bank! Your new bank balance is ${newBank} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "buy_sickle_wallet"){
                const findSickle = await Items.findOne({where: {memberid: id, item: "5"}})

                if(findSickle) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newWallet = getUser.wallet - 1500

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.create({memberid: id, item: "5"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **sickle** for 1500 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "buy_wife_bank"){
                const findWife = await Items.findOne({where: {memberid: id, item: "6"}})

                if(findWife) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newBank = getUser.bank - 1000

                await Economy.update({bank: newBank}, {where: {id: id}})
                await Items.create({memberid: id, item: "6"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **wife** for 1000 Dashcoins:tm: from your bank! Your new bank balance is ${newBank} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "buy_wife_wallet"){
                const findWife = await Items.findOne({where: {memberid: id, item: "6"}})

                if(findWife) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newWallet = getUser.wallet - 1000

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.create({memberid: id, item: "6"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **wife** for 1000 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "buy_bailbonds_bank"){
                const findBailbonds = await Items.findOne({where: {memberid: id, item: "7"}})

                if(findBailbonds) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newBank = getUser.bank - 2000

                await Economy.update({bank: newBank}, {where: {id: id}})
                await Items.create({memberid: id, item: "7"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **bail bonds** for 2000 Dashcoins:tm: from your bank! Your new bank balance is ${newBank} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "buy_bailbonds_wallet"){
                const findBailbonds = await Items.findOne({where: {memberid: id, item: "7"}})

                if(findBailbonds) return

                const getUser = await Economy.findOne({where: {id: id}})
                const newWallet = getUser.wallet - 2000

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.create({memberid: id, item: "7"})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Purchase Complete 💸`)
                        .setDescription(`You just purchased **bail bonds** for 2000 Dashcoins:tm: from your wallet! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }


            else if(command == "sell_debitcard"){
                const findDebitcard = await Items.findOne({where: {memberid: id, item: "1"}})

                if(!findDebitcard) return

                const getUser = await Economy.findOne({where: {id: id}})
                const sellprice = Math.floor(Math.random() * 200) + 751
                const newWallet = getUser.wallet + sellprice

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.destroy({where: {memberid: id, item: "1"}})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Sale Complete 💸`)
                        .setDescription(`You just sold **debit card** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "sell_motorcycle"){
                const findMotorcycle = await Items.findOne({where: {memberid: id, item: "2"}})

                if(!findMotorcycle) return

                const getUser = await Economy.findOne({where: {id: id}})
                const sellprice = Math.floor(Math.random() * 100) + 351
                const newWallet = getUser.wallet + sellprice

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.destroy({where: {memberid: id, item: "2"}})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Sale Complete 💸`)
                        .setDescription(`You just sold **motorcycle** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "sell_superbike"){
                const findSuperbike = await Items.findOne({where: {memberid: id, item: "3"}})

                if(!findSuperbike) return

                const getUser = await Economy.findOne({where: {id: id}})
                const sellprice = Math.floor(Math.random() * 550) + 2801
                const newWallet = getUser.wallet + sellprice

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.destroy({where: {memberid: id, item: "3"}})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Sale Complete 💸`)
                        .setDescription(`You just sold **superbike** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "sell_hammer"){
                const findHammer = await Items.findOne({where: {memberid: id, item: "4"}})

                if(!findHammer) return

                const getUser = await Economy.findOne({where: {id: id}})
                const sellprice = Math.floor(Math.random() * 200) + 751
                const newWallet = getUser.wallet + sellprice

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.destroy({where: {memberid: id, item: "4"}})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Sale Complete 💸`)
                        .setDescription(`You just sold **hammer** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }
            
            else if(command == "sell_sickle"){
                const findMotorcycle = await Items.findOne({where: {memberid: id, item: "5"}})

                if(!findMotorcycle) return

                const getUser = await Economy.findOne({where: {id: id}})
                const sellprice = Math.floor(Math.random() * 300) + 1101
                const newWallet = getUser.wallet + sellprice

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.destroy({where: {memberid: id, item: "5"}})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Sale Complete 💸`)
                        .setDescription(`You just sold **sickle** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "sell_wife"){
                const findWife = await Items.findOne({where: {memberid: id, item: "6"}})

                if(!findWife) return

                const getUser = await Economy.findOne({where: {id: id}})
                const sellprice = Math.floor(Math.random() * 200) + 751
                const newWallet = getUser.wallet + sellprice

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.destroy({where: {memberid: id, item: "6"}})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Sale Complete 💸`)
                        .setDescription(`You just sold **wife** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }

            else if(command == "sell_bailbonds"){
                const findBailbonds = await Items.findOne({where: {memberid: id, item: "7"}})

                if(!findBailbonds) return

                const getUser = await Economy.findOne({where: {id: id}})
                const sellprice = Math.floor(Math.random() * 350) + 1501
                const newWallet = getUser.wallet + sellprice

                await Economy.update({wallet: newWallet}, {where: {id: id}})
                await Items.destroy({where: {memberid: id, item: "7"}})

                return await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`💸 Sale Complete 💸`)
                        .setDescription(`You just sold **bail bonds** for ${sellprice} Dashcoins:tm:! Your new wallet balance is ${newWallet} Dashcoins:tm:.`)
                        .setColor("#9BDBF5")
                        .setThumbnail(interaction.member.user.avatarURL())
                    ]
                })
            }


            else if(command == "breakup"){
                const getUser = await Waifus.findOne({where: {id: id}})

                if(!getUser) return

                const existingwaifu = getUser.waifu

                await Waifus.destroy({where: {id: id}}, {truncate: true})

                return await interaction.reply({
                    content: `You broke up with **${existingwaifu}**`
                })
                .catch((err) => {
                    return
                })
            }
    
            // if(command == "ban"){
            //     if(!permissions.has("BAN_MEMBERS")) return

            //     member.ban()
            //     .catch((err) => {
            //         console.log(err)
            //         return interaction.editReply({
            //             content: "Failed to ban the user"
            //         })
            //         .catch((err) => {
            //             return
            //         })
            //     })

            //     return interaction.editReply({
            //         content: "Banned the user"
            //     })
            // }
            
            // else if(command == "kick"){
            //     if(!permissions.has("BAN_MEMBERS")) return

            //     member.kick()
            //     .catch((err) => {
            //         console.log(err)
            //         return interaction.editReply({
            //             content: "Failed to ban the user"
            //         })
            //         .catch((err) => {
            //             return
            //         })
            //     })

            //     return interaction.editReply({
            //         content: "Kicked the user"
            //     })
            // }
        }
    }
}