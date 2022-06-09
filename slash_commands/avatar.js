const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("avatar")
.setDescription("View your or another user's avatar")
.addUserOption(option => option
    .setName("user")
    .setDescription("User to view the avatar of")
    .setRequired(true)
)

module.exports.run = async (client, interaction) => {
    const member = interaction.options.getMember("user")
    const avatar = member.displayAvatarURL({dynamic: true, size: 4096})

    const embed = new MessageEmbed()
    .setTitle(`${member.displayName}'s Avatar`)
    .setColor("RANDOM")
    .setImage(avatar)

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}