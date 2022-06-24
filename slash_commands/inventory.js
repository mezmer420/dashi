const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("inventory")
.setDescription("View the inventory of yourself or another user; leave blank to view your own inventory")
.addUserOption(option => option
    .setName("user")
    .setDescription("User to check the balance of")
    .setRequired(false)
)

module.exports.run = async ({client, interaction, Items}) => {
    const member = interaction.options.getMember("user") || interaction.member

    const data = await Items.findAll({where: {memberid: member.id}})

    let items = []

    for (let obj of data) {
        items.push(obj)
    }

    const embed = new MessageEmbed()
    .setColor("#9BDBF5")
    .setTitle(`${member.displayName}'s Inventory`)
    .setThumbnail(member.user.avatarURL())

    items = items.sort(function (b, a) {
        return b.item - a.item
    })

    let desc = ""

    for (let i = 0; i < items.length; i++) {
        const itemid = items[i].item
        let item
        if(itemid == "1"){
            item = "debit card"
        } else if(itemid == "2"){
            item = "motorcycle"
        } else if(itemid == "3"){
            item = "superbike"
        } else if(itemid == "4"){
            item = "hammer"
        } else if(itemid == "5"){
            item = "sickle"
        } else if(itemid == "6"){
            item = "wife"
        } else if(itemid == "7"){
            item = "bail bonds"
        }

        desc += `**${item}**\n`
    }

    embed.setDescription(desc)

    if(embed.description == ""){
        return await interaction.editReply({
            embeds: [
                new MessageEmbed()
                .setColor("#9BDBF5")
                .setTitle(`${member.displayName}'s Inventory`)
                .setDescription(`Nothing but empty in here`)
                .setThumbnail(member.user.avatarURL())
            ]
        })
        .catch((err) => {
            return
        })
    }

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}