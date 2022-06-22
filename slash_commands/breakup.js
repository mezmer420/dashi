const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const Sequelize = require("sequelize")

module.exports.data = new SlashCommandBuilder()
.setName("breakup")
.setDescription("Break up with your current waifu")

module.exports.run = async ({client, interaction, Waifus}) => {
    const getUser = await Waifus.findOne({where: {id: interaction.member.id}})

    if(getUser){
        const existingwaifu = getUser.waifu

        const embed = new MessageEmbed()
        .setTitle(`Are you sure you want to break up with **${existingwaifu}**?`)
        .setColor("#9BDBF5")

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("Yes")
            .setStyle("PRIMARY")
            .setCustomId(`breakup-${interaction.member.id}`)
        )

        const response = await interaction.editReply({
            embeds: [embed],
            components: [row]
        })
        .catch((err) => {
            return
        })

        setTimeout(async function () {
            row.components[0].setDisabled(true)
            // .catch((err) => {
            //     return
            // })
            await response.edit({
                embeds: [embed],
                components: [row]
            })
            .catch((err) => {
                return
            })
        }, 10000)

        // await response.edit({
        //     components: [row]
        // })
        // .catch((err) => {
        //     return
        // })

        // .then(interaction => {
        //     setTimeout(() => interaction.delete()
        //     .catch((err) => {
        //         return
        //     }), 30000)
        // })

        // await interaction.editReply({
        //     content: `You broke up with ${existingwaifu}`
        // })
        // .catch((err) => {
        //     return
        // })

        // await Waifus.destroy({where: {id: interaction.member.id}}, {truncate: true})
    }

    else if(!getUser){
        await interaction.editReply({
            content: "You don't have a waifu to break up with LOL"
        })
        .catch((err) => {
            return
        })
    }
}