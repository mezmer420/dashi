const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const axios = require("axios")

module.exports.data = new SlashCommandBuilder()
.setName("mdn")
.setDescription("Search the official MDN documentation")
.addStringOption(option => option
    .setName("search-query")
    .setDescription("Search the official MDN documentation")
    .setRequired(true)
)

module.exports.run = async (client, interaction) => {
    const text = interaction.options.getString("search-query")
    const base = "https://developer.mozilla.org"
    const uri = `${base}/api/v1/search?q=${encodeURIComponent(
        text
    )}&locale=en-US`

    const documents = (await axios(uri)).data.documents

    if(!documents) return interaction.editReply({
        content: "Could not find that documentation"
    })
    .catch((err) => {
        return
    })

    if(documents){
        const embed = new MessageEmbed()
        .setAuthor({
            name: "MDN Documentation",
            iconURL: "https://avatars.githubusercontent.com/u/7565578?s=200&v=4"
        })
        .setColor(0x2296f3)

        let truncated = false

        if(documents.length > 3){
            documents.length = 3
            truncated = true
        }

        for (let {mdn_url, title, summary} of documents) {
            summary = summary.replace(/(\r\n|\n|\r)/gm, "")

            embed.addField(title, `${summary}\n[**Link**](${base}${mdn_url})`)
        }

        if(truncated){
            embed.addField(
                "Too many results!",
                `View more results [here](https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(
                    text
                )}).`
            )
        }

        await interaction.editReply({
            embeds: [embed]
        })
        .catch((err) => {
            return
        })
    }
}