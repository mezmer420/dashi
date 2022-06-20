const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Sequelize = require("sequelize")

module.exports.data = new SlashCommandBuilder()
.setName("breakup")
.setDescription("Break up with your current waifu")

module.exports.run = async ({client, interaction, Waifus}) => {
    let getUser = await Waifus.findOne({where: {id: interaction.member.id}})

    if(!getUser){
        getUser = await Waifus.create({id: interaction.member.id, haswaifu: false})
    }

    if(getUser.haswaifu == true){
        const existingwaifu = getUser.waifu

        await interaction.editReply({
            content: `You broke up with ${existingwaifu}`
        })
        .catch((err) => {
            return
        })

        await Waifus.destroy({where: {id: interaction.member.id}}, {truncate: true})
    }

    else if(getUser.haswaifu == false){
        await interaction.editReply({
            content: "You don't have a waifu to break up with LOL"
        })
        .catch((err) => {
            return
        })
    }
}