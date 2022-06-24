const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("set-waifu")
.setDescription("Set a user's waifu")
.addUserOption(option => option
    .setName("user")
    .setDescription("The user to set the waifu of")
    .setRequired(true)
)
.addStringOption(option => option
    .setName("waifu")
    .setDescription("The waifu to set; type 'none' to remove their waifu")
    .setRequired(true)
)

module.exports.run = async ({client, interaction, Waifus}) => {
    const member = interaction.options.getMember("user")
    const waifu = interaction.options.getString("waifu")

    const getUser = await Waifus.findOne({where: {id: member.id}})

    if(waifu.toLowerCase() == "none"){
        if(!getUser){
            return await interaction.editReply({
                content: `${member.nickname} didn't have a waifu to begin with lol`
            })
        }

        else if(getUser){
            const existingwaifu = getUser.waifu

            await interaction.editReply({
                content: `${member.nickname}'s waifu **${existingwaifu}** has been removed`
            })

            await Waifus.destroy({where: {id: member.id}}, {truncate: true})
        }
    }

    else if(waifu.toLowerCase() !== "none"){
        if(!getUser){
            await Waifus.create({id: member.id, waifu: waifu})

            return await interaction.editReply({
                content: `${member.nickname}'s new waifu is **${waifu}**`
            })
        }
    
        else if(getUser){
            await Waifus.update({waifu: waifu}, {where: {id: member.id}})

            return await interaction.editReply({
                content: `${member.nickname}'s new waifu is **${waifu}**`
            })
        }
    }
}