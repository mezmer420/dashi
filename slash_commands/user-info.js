const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("user-info")
.setDescription("View info of a member")
.addUserOption(option => option
    .setName("user")
    .setDescription("User to view info of")
    .setRequired(true)
)

module.exports.run = async ({client, interaction}) => {
    const member = interaction.options.getMember("user")
    const user = interaction.options.getUser("user")
    const avatar = user.avatarURL({dynamic: true, size: 4096})

    const createdts = new Date(user.createdTimestamp + 5 * 3600000)
    const createdtime = createdts.toLocaleString()

    const joinedts = new Date(member.joinedTimestamp + 6 * 3600000)
    const joinedtime = joinedts.toLocaleString()

    let nick = member.nickname

    if(!nick){
        nick = `${user.username}`
    }

    const boostingts = new Date(member.premiumSinceTimestamp + 6 * 3600000)
    let boostingtime = boostingts.toLocaleString()

    if(!member.premiumSinceTimestamp){
        boostingtime = "Not boosting"
    }

    const embed = new MessageEmbed()
    .setColor("#9BDBF5")
    .setAuthor({name: `${user.tag}`, iconURL: `${avatar}`})
    .addFields(
        {name: "User ID", value: `${user.id}`, inline: true},
        {name: "Account Created at", value: `${createdtime}`, inline: true}
    )
    .addFields(
        {name: "Server Nickname", value: `${nick}`, inline: true},
        {name: "Joined Server at", value: `${joinedtime}`, inline: true},
        {name: "Boosting Since", value: `${boostingtime}`, inline: true}
    )
    .setThumbnail(avatar)

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}