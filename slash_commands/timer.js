const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("timer")
.setDescription("Set a timer")
.addIntegerOption(option => option
    .setName("seconds")
    .setDescription("The time in seconds")
    .setMinValue(1)
    .setRequired(true)
)
.addStringOption(option => option
    .setName("reminder")
    .setDescription("What to remind you about")
    .setRequired(true)
)

module.exports.run = async ({client, interaction}) => {
    const time = interaction.options.getInteger("seconds")
    const subject = interaction.options.getString("reminder")
    const milliseconds = time * 1000

    if(time <= 840){
        const createdEmbed = new MessageEmbed()
        .setColor("#9BDBF5")
        .setTitle("Timer Set")
        .setAuthor(`${interaction.member.user.tag}'s Timer`, interaction.member.avatarURL())
        .setDescription(`In **${time} seconds**, I will remind you about **${subject}**`)
        .setTimestamp()
    
        const doneEmbed = new MessageEmbed()
        .setColor("#9BDBF5")
        .setTitle("Timer Up!")
        .setAuthor(`${interaction.member.user.tag}'s Timer`, interaction.member.avatarURL())
        .setDescription(`**${subject}**\nTime set: **${time} seconds**`)
        .setTimestamp()
    
        await interaction.editReply({
            embeds: [createdEmbed]
        })
    
        setTimeout(async () => {
            interaction.editReply({
                embeds: [doneEmbed]
            })
            .catch((err) => {
                return
            })
            interaction.member.send(`The timer you set **${time} seconds** ago is up! Reminder: **${subject}**`)
        }, milliseconds)
    }

    else if(time > 840){
        interaction.editReply({
            content: "Invalid time; max time is 14 minutes (840 seconds)"
        })
    }
}