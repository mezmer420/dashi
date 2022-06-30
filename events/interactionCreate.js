const {Dialects, Tickets, Infractions, Economy, Items, dailyCooldown, workCooldown, begCooldown, robCooldown, Waifus, Birthdays, Spam} = require("../database")
const {commands} = require("../slash-register")
const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

const { everyoneid, categoryid, transcriptsid } = require("../config.json")

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction){
        if(interaction.isCommand()){
            await interaction.deferReply()
            .catch((err) => {
                return console.log(err)
            })

            const name = interaction.commandName
            const commandMethod = commands.get(name)
            
            if(!commandMethod) return

            commandMethod({client, interaction, Dialects, Infractions, Economy, Items, dailyCooldown, workCooldown, begCooldown, robCooldown, Waifus, Birthdays, Spam})
        }

        else if(interaction.isButton()){
            // const button_id = interaction.customId
            // const [command, id] = button_id.split("-")

            // if(interaction.member.id !== id) return

            // const member = interaction.guild.members.cache.get(id)
            // const permissions = interaction.member.permissions

            const { guild, member, customId, channel } = interaction

            if(["reportuser", "reportbug", "reportother"].includes(customId)){
                await interaction.deferReply({
                    ephemeral: true
                })
                .catch((err) => {
                    return console.log(err)
                })

                const ID = Math.floor(Math.random() * 8989000) + 1010000

                await guild.channels.create(`${customId + "-" + ID}`, {
                    type: "GUILD_TEXT",
                    parent: categoryid,
                    permissionOverwrites: [
                        {
                            id: member.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                        },
                        {
                            id: "950173176246177823",
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                        },
                        {
                            id: everyoneid,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                        }
                    ]
                }).then(async (channel) => {
                    await Tickets.create({
                        memberid: member.id,
                        ticketid: ID,
                        channelid: channel.id,
                        closed: false,
                        locked: false,
                        type: customId
                    })
    
                    const Embed = new MessageEmbed()
                    .setColor("#9BDBF5")
                    .setAuthor(`Ticket: ${ID}`, guild.iconURL({dynamic: true}))
                    .setDescription(
                        "Please wait for a response from the Government. In the meantime, please describe your issue in as much detail as possible. All messages sent in this channel will be logged and saved to a government-access transcript file."
                    )
                    .setFooter("The buttons below are Admins-only")
        
                    const Buttons = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId("lock")
                        .setLabel("Lock")
                        .setStyle("SECONDARY")
                        .setEmoji("🔒"),
                
                        new MessageButton()
                        .setCustomId("unlock")
                        .setLabel("Unlock")
                        .setStyle("SUCCESS")
                        .setEmoji("🔓"),

                        new MessageButton()
                        .setCustomId("close")
                        .setLabel("Save & Close Ticket")
                        .setStyle("PRIMARY")
                        .setEmoji("💾")
                    )
        
                    const sentMessage = await channel.send({
                        embeds: [Embed],
                        components: [Buttons]
                    })
                    .catch((err) => {
                        return console.log(err)
                    })

                    await sentMessage.pin()
                    .catch((err) => {
                        return console.log(err)
                    })
    
                    await channel.send(`${member} here is your ticket (this message will autodelete)`)
                    .catch((err) => {
                        return
                    })
                    .then(msg => {
                        if(msg){
                            setTimeout(() => msg.delete()
                            .catch((err) => {
                                return
                            }), 10000)
                        }
                    })

                    await channel.send("<@&950173176246177823>")
                    .catch((err) => {
                        return
                    })
        
                    await interaction.editReply({
                        content: `${member} your ticket has been created: ${channel}`,
                        ephemeral: true
                    })
                    .catch((err) => {
                        return
                    })
                })
            }

            else if(["close", "lock", "unlock"].includes(customId)){
                if(!member.permissions.has("KICK_MEMBERS")) return

                await interaction.deferReply()
                .catch((err) => {
                    return console.log(err)
                })
                
                const { createTranscript } = require("discord-html-transcripts")

                let Embed = new MessageEmbed()
                .setColor("#9BDBF5")

                const getTicket = await Tickets.findOne({where: {channelid: channel.id}})

                if(!getTicket){
                    return await interaction.editReply({
                        content: `No data was found related to this ticket, <@527285622809952256> delete this DB entry`
                    })
                    .catch((err) => {
                        return
                    })
                }

                if(customId == "lock"){
                    if(getTicket.locked == true){
                        return await interaction.editReply({
                            content: "The ticket is already locked (this message will autodelete)"
                        })
                        .catch((err) => {
                            return
                        })
                        .then(interaction => {
                            setTimeout(() => interaction.delete()
                            .catch((err) => {
                                return
                            }), 6000)
                        })

                    }

                    await Tickets.update({locked: true}, {where: {channelid: channel.id}})

                    Embed.setDescription("🔒 | This ticket is now locked for review")

                    await channel.permissionOverwrites.edit(getTicket.memberid, {
                        SEND_MESSAGES: false
                    })
                    .catch((err) => {
                        return console.log(err)
                    })

                    return await interaction.editReply({
                        embeds: [Embed]
                    })
                    .catch((err) => {
                        return console.log(err)
                    })
                }

                else if(customId == "unlock"){
                    if(getTicket.locked == false){
                        return await interaction.editReply({
                            content: "The ticket is already unlocked (this message will autodelete)"
                        })
                        .catch((err) => {
                            return
                        })
                        .then(interaction => {
                            setTimeout(() => interaction.delete()
                            .catch((err) => {
                                return
                            }), 6000)
                        })
                    }

                    await Tickets.update({locked: false}, {where: {channelid: channel.id}})

                    Embed.setDescription("🔓 | This ticket is now unlocked")

                    await channel.permissionOverwrites.edit(getTicket.memberid, {
                        SEND_MESSAGES: true
                    })
                    .catch((err) => {
                        return console.log(err)
                    })

                    return await interaction.editReply({
                        embeds: [Embed]
                    })
                    .catch((err) => {
                        return console.log(err)
                    })
                }

                else if(customId == "close"){
                    if(getTicket.closed == true){
                        return await interaction.editReply({
                            content: "The ticket is already closed and is about to be autodeleted (this message will autodelete)"
                        })
                        .catch((err) => {
                            return
                        })
                        .then(interaction => {
                            setTimeout(() => interaction.delete()
                            .catch((err) => {
                                return
                            }), 6000)
                        })
                    }

                    const attachment = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `${getTicket.type} - ${getTicket.ticketid}.html`
                    })

                    await Tickets.update({closed: true}, {where: {channelid: channel.id}})

                    const MEMBER = await guild.members.cache.get(getTicket.memberid)

                    const Message = await guild.channels.cache.get(transcriptsid).send({
                        embeds: [
                            Embed
                            .setAuthor(MEMBER.user.tag, MEMBER.user.displayAvatarURL())
                            .setTitle(`Report Type: ${getTicket.type}\nID: ${getTicket.ticketid}`)
                        ],
                        files: [attachment]
                    })

                    await interaction.editReply({
                        embeds: [
                            Embed
                            .setDescription(`The transcript is now saved [TRANSCRIPT](${Message.url})`)
                        ]
                    })

                    await channel.send("This channel and respective ticket will autodelete in 10 seconds")

                    setTimeout(async () => {
                        channel.delete()
                        .catch((err) => {
                            return
                        })

                        const getNewTicket = await Tickets.findOne({where: {channelid: channel.id}})
                        if(getNewTicket){
                            Tickets.destroy({where: {channelid: channel.id}})
                        }
                    }, 10000)
                }
            }

            // if(command == "test"){
            //     return await interaction.reply({
            //         embeds: [
            //             new MessageEmbed()
            //             .setTitle(`💸 Purchase Complete 💸`)
            //             .setDescription(`You just purchased **motorcycle** for 500 Dashcoins:tm: from your bank! Your new bank balance is Dashcoins:tm:.`)
            //             .setColor("#9BDBF5")
            //             .setThumbnail(interaction.member.user.avatarURL())
            //         ]
            //     })
            // }
    
            // if(command == "ban"){
            //     if(!permissions.has("BAN_MEMBERS")) return

            //     member.ban()
            //     .catch((err) => {
            //         console.log(err)
            //         return await interaction.editReply({
            //             content: "Failed to ban the user"
            //         })
            //         .catch((err) => {
            //             return
            //         })
            //     })

            //     return await interaction.editReply({
            //         content: "Banned the user"
            //     })
            // }
            
            // else if(command == "kick"){
            //     if(!permissions.has("BAN_MEMBERS")) return

            //     member.kick()
            //     .catch((err) => {
            //         console.log(err)
            //         return await interaction.editReply({
            //             content: "Failed to ban the user"
            //         })
            //         .catch((err) => {
            //             return
            //         })
            //     })

            //     return await interaction.editReply({
            //         content: "Kicked the user"
            //     })
            // }
        }
    }
}