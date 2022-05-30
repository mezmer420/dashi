module.exports = {
    name: "PrincessLuna",
    description: "Princess Luna embed",
    execute(message, Discord){
        const princesslunaEmbed = new Discord.MessageEmbed()
        .setColor("#363E7A")
        .setTitle("Princess Luna")
        .setDescription("nightshift royal ruler")
        .setImage("https://static.wikia.nocookie.net/p__/images/1/13/Luna.png/revision/latest?cb=20161122231248&path-prefix=protagonist")
        message.channel.send({embeds: [princesslunaEmbed]})
    }
}