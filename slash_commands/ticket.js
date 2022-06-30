const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js")

const { openticketid } = require("../config.json")

module.exports.data = new SlashCommandBuilder()
.setName("ticket")
.setDescription("Send the interactive ticketing message")

module.exports.run = async ({client, interaction}) => {
    if(interaction.member.id == "527285622809952256"){
        const { guild } = interaction

        const Embed = new MessageEmbed()
        .setColor("#9BDBF5")
        .setAuthor("Tickets 🎫", guild.iconURL({dynamic: true}))
        .setDescription("Click a button below to open a ticket and personally discuss an issue with the Government")
        .addFields(
            {name: "User Report", value: "For ~~snitching~~ informing us of someone who violated the law as outlined in the Constitution", inline: true},
            {name: "Bug Report", value: "For informing us a bug you are aware of with one of our bots", inline: true},
            {name: "Other Report", value: "Select this option if the issue is something else", inline: true},
        )
    
        const Buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("reportuser")
            .setLabel("User Report")
            .setStyle("PRIMARY")
            .setEmoji("👮"),
    
            new MessageButton()
            .setCustomId("reportbug")
            .setLabel("Bug Report")
            .setStyle("SUCCESS")
            .setEmoji("🐛"),
    
            new MessageButton()
            .setCustomId("reportother")
            .setLabel("Other Report")
            .setStyle("SECONDARY")
            .setEmoji("❓")
        )
    
        await guild.channels.cache.get(openticketid).send({
            embeds: [Embed],
            components: [Buttons]
        })
        .catch((err) => {
            return console.log(err)
        })
    
        await interaction.deleteReply()
        .catch((err) => {
            return
        })
    }

    else {
        return interaction.editReply({
            content: "only mezmer can use this command"
        })
    }
}