const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("role-info")
.setDescription("View info about a role")
.addRoleOption(option => option
    .setName("role")
    .setDescription("The role to view info of")
    .setRequired(true)
)

module.exports.run = async ({client, interaction}) => {
    const role = interaction.options.getRole("role")

    let displayed
    if(role.hoist == true){
        displayed = "Yes"
    } else if(role.hoist == false){
        displayed = "No"
    }

    let mentionable
    if(role.mentionable == true){
        mentionable = "Yes"
    } else if(role.mentionable == false){
        mentionable = "No"
    }

    const createdts = new Date(role.createdTimestamp + 6 * 3600000)
    const createdtime = createdts.toLocaleString()

    const Embed = new MessageEmbed()
    .setColor("#9BDBF5")
    .addFields(
        {name: "Role Name", value: `<@&${role.id}>`, inline: true},
        {name: "Role ID", value: `${role.id}`, inline: true},
        {name: "Users in Role", value: `${role.members.size}`, inline: true},
    )
    .addFields(
        {name: "Mentionable", value: `${mentionable}`, inline: true},
        {name: "Displayed Seperately?", value: `${displayed}`, inline: true},
        {name: "Color", value: `${role.hexColor}`, inline: true},
    )
    .setFooter(`Role Creation Date | ${createdtime}`)

    // console.log(role.members)

    await interaction.editReply({
        embeds: [Embed]
    })
    .catch((err) => {
        return
    })
}