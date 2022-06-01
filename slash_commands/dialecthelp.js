const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("dialecthelp")
.setDescription("View general dialect info")

module.exports.run = async (client, interaction) => {
    const infoEmbed = new MessageEmbed()
    .setColor("#9BDBF5")
    .setTitle("Dialect Information")
    .addField("**About**", "Every Eoician has a unique dialect. <@527285622809952256> pays careful attention to what you say and regularly updates my dialect database.")
    .addField("**Dialects**", "`vcash dialect\n\nmezmer dialect\n\n\choc dialect\n\nspeedychoc dialect\n\nspeedy dialect uwu owu uwo ow- -w- -wu uWu\n\ndelta airlines dialect`")
    await interaction.editReply({
        embeds: [infoEmbed]
    })
}