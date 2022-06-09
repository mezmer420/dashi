const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("breakup")
.setDescription("Break up with your current waifu")

module.exports.run = async (client, interaction, Waifus) => {
    let getUser = await Waifus.findOne({where: {id: interaction.member.id}})

    if(!getUser){
        getUser = await Waifus.create({id: interaction.member.id, haswaifu: false})
    }

    if(getUser.haswaifu == true){
        // const existingwaifu = await Waifus.findOne({where: {id: interaction.member.id}})

        interaction.editReply({
            content: `You broke up with your waifu`
        })
        .catch((err) => {
            return
        })

        await Waifus.destroy({where: {id: interaction.member.id}}, {truncate: true})
        await Waifus.update({haswaifu: false}, {where: {id: interaction.member.id}})
    }

    else if(getUser.haswaifu == false){
        interaction.editReply({
            content: "You don't have a waifu to break up with LOL"
        })
        .catch((err) => {
            return
        })
    }
}