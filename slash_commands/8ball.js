const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

function RandArray(array){
    var rand = Math.random()*array.length | 0
    var rValue = array[rand]
    return rValue
}

module.exports.data = new SlashCommandBuilder()
.setName("8ball")
.setDescription("Ask the magic 8ball a question")
.addStringOption(option => option
    .setName("question")
    .setRequired(true)
    .setDescription("The question you want to ask the magic 8ball"))

module.exports.run = async (client, interaction, options) => {
    let inquiry = options.getString("question")

    //     .setDescription("🎱 yep!")
    //     .setDescription("🎱 i guess")
    //     .setDescription("🎱 probably not")
    //     .setDescription("🎱 YES YES YES!!!11")
    //     .setDescription("🎱 hell no")
    //     .setDescription("🎱 um.. what?")
    //     .setDescription("🎱 sorry, say again?")
    //     .setDescription("🎱 what is that")
    //     .setDescription("🎱 you know what just ask someone else")
    //     .setDescription("🎱 i mean sure, if you believe")

    const fortunes = [
        "Yes.",
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes definelty.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now...",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good...",
        "Very doubtful.",
    ]

    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)]

    const Embed = new MessageEmbed()
    .setColor("#202225")
    .setTitle(`${inquiry}`)
    .setDescription(`🎱 ${fortune}`)

    await interaction.editReply({
        embeds: [Embed]
    })
}