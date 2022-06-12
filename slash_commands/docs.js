const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Docs = require("discord.js-docs")

module.exports.data = new SlashCommandBuilder()
.setName("docs")
.setDescription("Search the official Discord.JS documentation")
.addStringOption(option => option
    .setName("search-query")
    .setDescription("Search the official Discord.JS documentation")
    .setRequired(true)
)

module.exports.run = async ({client, interaction}) => {
    const text = interaction.options.getString("search-query")
    const branch = "stable"

    const max = 1024

    const replaceDisco = (str) => 
        str
        .replace(/docs\/docs\/disco/g, `docs/discord.js/${branch}`)
        .replace(/ \(disco\)/g, "")

    const doc = await Docs.fetch(branch)
    const results = await doc.resolveEmbed(text)

    if(!results) return await interaction.editReply({
        content: "Could not find that documentation"
    })
    .catch((err) => {
        return
    })

    const string = replaceDisco(JSON.stringify(results))

    const embed = JSON.parse(string)

    embed.author.url = `https://discord.js/#/docs/discord.js/${branch}/general/welcome`

    const extra =
  "\n\nView more here: " +
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    .exec(embed.description)[0]
    .split(")")[0]

    for (const field of embed.fields || []) {
        if(field.value.length >= max){
            field.value = field.value.slice(0, max)
            const split = field.value.split(" ")
            let joined = split.join(" ")

            while (joined.length >= max - extra.length){
                split.pop()
                joined = split.join(" ")
            }

            field.value = joined + extra
        }
    }

    if(
        embed.fields &&
        embed.fields[embed.fields.length - 1].value.startsWith("[View source")
    ){
        embed.fields.pop()
    }

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}