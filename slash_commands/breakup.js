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
            .setCustomId(`breakup`)
        )

        const response = await interaction.editReply({
            embeds: [embed],
            components: [row]
        })
        .catch((err) => {
            return
        })

        const filter = i => {
            return i.user.id == interaction.user.id
        }
    
        const collector = response.createMessageComponentCollector({
            filter,
            max: 1,
            time: 10000
        })

        collector.on("collect", async i => {
            const getNewUser = await Waifus.findOne({where: {id: interaction.member.id}})
    
            if(!getNewUser) return
    
            const command = i.customId
    
            if(command !== `breakup`) return

            const newExistingwaifu = getNewUser.waifu
    
            await Waifus.destroy({where: {id: interaction.member.id}}, {truncate: true})
    
            await i.reply({
                content: `You broke up with **${newExistingwaifu}**`
            })
            .catch((err) => {
                return
            })
        })
    
        collector.on("end", async i => {
            row.components[0].setDisabled(true)
    
            await response.edit({
                components: [row]
            })
            .catch((err) => {
                return
            })
        })
    }

    else if(!getUser){
        return await interaction.editReply({
            content: "You don't have a waifu to break up with lol"
        })
        .catch((err) => {
            return
        })
    }
}