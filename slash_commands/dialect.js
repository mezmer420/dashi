const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("dialect")
.setDescription("View dialect info")
.addStringOption(option => option
    .setName("dialect")
    .setDescription("The dialect to view")
    .setRequired(true)
    .addChoices(
        {name: "vcash dialect", value: "1"},
        {name: "mezmer dialect", value: "2"},
        {name: "choc dialect", value: "3"},
        {name: "delta airlines dialect", value: "4"},
        {name: "speedy dialect uwu owu uwo ow- -w- -wu uWu", value: "5"}
    )
)

module.exports.run = async ({client, interaction, Dialects}) => {
    const dialectId = interaction.options.getString("dialect")

    const dialectTest = await Dialects.findOne({where: {dialectid: dialectId}})

    if(!dialectTest){
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

    const dialectData = await Dialects.findAll({where: {dialectid: dialectId}})

    let Dialect = []

    for (let obj of dialectData) {
        Dialect.push(obj)
    }

    let DialectPhrases = []

    for (let i = 0; i < Dialect.length; i++) {
        const phrase = Dialect[i].phrase

        DialectPhrases.push(phrase)
    }

    DialectPhrases = DialectPhrases.sort()

    let DialectCount = []

    for (let i = 0; i < Dialect.length; i++) {
        const count = Dialect[i].count

        DialectCount.push(count)
    }

    DialectCount = DialectCount.reduce((a, b) => a + b, 0)

    const OneDialectData = await Dialects.findOne({where: {dialectid: dialectId}})

    const Embed = new MessageEmbed()
    .setTitle(`${OneDialectData.dialectname}`)
    .setFooter(`Use Count: ${DialectCount} | Started 6/30/2022 5:25 PM EST`)

    let desc = ""

    for (let i = 0; i < DialectPhrases.length; i++) {
        const phrase = DialectPhrases[i]

        desc += "`" + `${phrase}` + "`" + " "
    }

    Embed.setDescription(desc)

    if(dialectId == "1"){
        Embed.setColor("#FFA500")
    } else if(dialectId == "2"){
        Embed.setColor("#0096FF")
    } else if(dialectId == "3"){
        Embed.setColor("RED")
    } else if(dialectId == "4"){
        Embed.setColor("PURPLE")
    } else if(dialectId == "5"){
        Embed.setColor("PURPLE")
    }

    await interaction.editReply({
        embeds: [Embed]
    })
    .catch((err) => {
        return
    })
}