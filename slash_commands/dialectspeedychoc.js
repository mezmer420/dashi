const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("dialectspeedychoc")
.setDescription("View speedychoc dialect")

module.exports.run = async (client, interaction) => {
    const speedychocEmbed = new MessageEmbed()
    .setColor("#9BDBF5")
    .setTitle("speedychoc dialect")
    .addField("`e`\n—————", "<@691727350051635262> x <@826841451945787412> ")
    await interaction.editReply({
        embeds: [speedychocEmbed]
    })
    .catch((err) => {
        return
    })
}