const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("embed")
.setDescription("Manually send an embed from my database")
.addStringOption(option => option
    .setName("embed cluster")
    .setDescription("the group of embeds to choose from")
    .setRequired(true)
    .addChoice("ponies", "My Little Pony: Friendship is Magic")
    .addChoice("yuris", "purple girls"))
    

module.exports.run = (client, interaction, options) => {
    if(interaction.member.id == "527285622809952256" || interaction.member.id == "842775855632744478"){

    }
    else {
        interaction.editReply({
            content: "only mezmer420 can use that command!"
        })
    }
}