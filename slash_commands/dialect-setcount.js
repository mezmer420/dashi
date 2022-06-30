const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("dialect-setcount")
.setDescription("Set the count of a dialect phrase")
.addStringOption(option => option
    .setName("dialect")
    .setDescription("The dialect of the phrase")
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
.addIntegerOption(option => option
    .setName("count")
    .setDescription("New count of the word/phrase")
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
    const count = interaction.options.getInteger("count")

    const getDialect = await Dialects.findOne({where: {dialectid: dialectId, phrase: phrase}})

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
            content: `Couldn't find phrase **${phrase}** from **${dialectName}**`
        })
        .catch((err) => {
            return
        })
    }

    else if(getDialect){
        await Dialects.update({count: count}, {where: {dialectid: dialectId, phrase: phrase}})

        return await interaction.editReply({
            content: `**${getDialect.dialectname}**'s count has been updated from **${getDialect.count}** to **${count}**`
        })
        .catch((err) => {
            return
        })
    }
}