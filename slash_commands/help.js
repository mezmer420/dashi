const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("help")
.setDescription("Provides first aid")

module.exports.run = async ({client, interaction}) => {
    const infoEmbed = new MessageEmbed()
    .setColor("#9BDBF5")
    .setTitle("dashi Help")
    // .setURL("https://github.com/mezmer420/dashi")
    .setAuthor({name: "mezmer420", iconURL: "https://cdn.discordapp.com/avatars/527285622809952256/8ed4b61e12610fe4c6e332beb00a4fed.webp?size=4096"})
    // .addField("**About**", "Every Eoician has a unique dialect. <@527285622809952256> pays careful attention to what you say and regularly updates my dialect database.")
    // .addField("**Dialects**", "`vcash dialect\n\nmezmer dialect\n\n\choc dialect\n\nspeedychoc dialect\n\nspeedy dialect uwu owu uwo ow- -w- -wu uWu\n\ndelta airlines dialect`")
    
    await interaction.editReply({
        embeds: [infoEmbed]
    })
    .catch((err) => {
        return
    })
}