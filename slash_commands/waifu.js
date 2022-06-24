const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("waifu")
.setDescription("View your or another user's waifu; leave blank to view your own")
.addUserOption(option => option
    .setName("user")
    .setDescription("User to view the avatar of")
    .setRequired(false)
)

module.exports.run = async ({client, interaction, Waifus}) => {
    const member = interaction.options.getMember("user") || interaction.member

    const getUser = await Waifus.findOne({where: {id: member.id}})

    if(getUser){
        const existingwaifu = getUser.waifu

        let response = `Your waifu is **${existingwaifu}**`

        if(member.id !== interaction.member.id){
            response = `${member.nickname}'s waifu is **${existingwaifu}**`
        }

        return await interaction.editReply({
            content: response
        })
    }

    else if(!getUser){
        let response = `You don't have a waifu lol`

        if(member.id !== interaction.member.id){
            response = `${member.nickname} doesn't have a waifu lol`
        }

        return await interaction.editReply({
            content: response
        })
    }
}