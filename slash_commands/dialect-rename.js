const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("dialect-rename")
.setDescription("Rename a a dialect")
.addStringOption(option => option
    .setName("dialect")
    .setDescription("The dialect to rename")
    .setRequired(true)
    .addChoices(
        {name: "vcash dialect", value: "1"},
        {name: "mezmer dialect", value: "2"},
        {name: "choc dialect", value: "3"},
        {name: "delta dialect", value: "4"},
        {name: "speedy dialect", value: "5"}
    )
)
.addStringOption(option => option
    .setName("name")
    .setDescription("The dialect's new name")
    .setRequired(true)
)

module.exports.run = async ({client, interaction, Dialects}) => {
    if(interaction.member.id !== "527285622809952256"){
        return await interaction.editReply({
            content: "Only mezmer can use this command"
        })
        .catch((err) => {
            return
        })
    }

    const dialectId = interaction.options.getString("dialect")
    const name = interaction.options.getString("name")

    const getDialect = await Dialects.findOne({where: {dialectid: dialectId}})

    if(!getDialect){
        let dialectName
        if(dialectId == "1"){
            dialectName = "vcash dialect"
        } else if(dialectId == "2"){
            dialectName = "mezmer dialect"
        } else if(dialectId == "3"){
            dialectName = "choc dialect"
        } else if(dialectId == "4"){
            dialectName = "delta airlines dialect"
        } else if(dialectId == "5"){
            dialectName = "speedy dialect uwu owu uwo ow- -w- -wu uWu"
        }

        return await interaction.editReply({
            content: `**${dialectName}** doesn't have any phrases yet`
        })
        .catch((err) => {
            return
        })
    }

    else if(getDialect){
        await Dialects.update({dialectname: name}, {where: {dialectid: dialectId}})

        return await interaction.editReply({
            content: `**${getDialect.dialectname}** has been renamed to **${name}**`
        })
        .catch((err) => {
            return
        })
    }
}