const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("avatar")
.setDescription("View your or another user's avatar")
.addUserOption(option => option
    .setName("user")
    .setRequired(true)
    .setDescription("User to view the avatar of"))

module.exports.run = (client, interaction, options) => {
    const member = options.getMember("user")
    const avatar = member.displayAvatarURL({dynamic: true, size: 4096})

    const embed = new MessageEmbed()
    .setTitle(`${member.displayName}'s Avatar`)
    .setColor("RANDOM")
    .setImage(avatar)

    return interaction.editReply({
        embeds: [embed]
    })
}