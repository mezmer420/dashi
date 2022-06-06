const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("dialectdelta")
.setDescription("View delta airlines dialect")

module.exports.run = async (client, interaction) => {
    const deltaEmbed = new MessageEmbed()
    .setColor("PURPLE")
    .setTitle("delta airlines dialect")
    .addField("`bigfunni\n\nbigL\n\nbihL\n\ncockL\n\nifusayso\n\nla mao\n\nmediumL\n\nshut\n\ntinyL\n\nyees\n\nyeees\n\nyeeees\n\nyews\n\nyeews`\n—————", "<@251778379211210755>")
    await interaction.editReply({
        embeds: [deltaEmbed]
    })
}