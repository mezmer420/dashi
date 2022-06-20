const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("d-speedychocdelta")
.setDescription("View speedychocdelta dialect")

module.exports.run = async ({client, interaction}) => {
    const speedychocEmbed = new MessageEmbed()
    .setColor("#9BDBF5")
    .setTitle("speedychocdelta dialect")
    .addField("`e`\n—————", "<@691727350051635262> x <@826841451945787412> x <@251778379211210755>")
    
    await interaction.editReply({
        embeds: [speedychocEmbed]
    })
    .catch((err) => {
        return
    })
}