const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("dialect-add")
.setDescription("Add a phrase to a dialect")
.addStringOption(option => option
    .setName("dialect")
    .setDescription("The dialect to add to")
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
    .setName("phrase")
    .setDescription("The word/phrase")
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
    const phrase = interaction.options.getString("phrase")

    const findPhrase = await Dialects.findOne({where: {phrase: phrase}})

    if(findPhrase){
        return await interaction.editReply({
            content: `**${phrase}** already exists in **${findPhrase.dialectname}**`
        })
        .catch((err) => {
            return
        })
    }

    const getDialect = await Dialects.findOne({where: {dialectid: dialectId}})

    let dialectName

    if(!getDialect){
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

        await Dialects.create({dialectid: dialectId, dialectname: dialectName, phrase: phrase, count: 0})

        return await interaction.editReply({
            content: `**${dialectName}** was created and **${phrase}** has been added to it`
        })
        .catch((err) => {
            return
        })
    }

    else if(getDialect){
        dialectName = getDialect.dialectname

        await Dialects.create({dialectid: dialectId, dialectname: dialectName, phrase: phrase, count: 0})

        return await interaction.editReply({
            content: `**${phrase}** has been added to **${dialectName}**`
        })
        .catch((err) => {
            return
        })
    }
}