module.exports = {
    name: "PrincessCadance",
    description: "Princess Cadence embed",
    execute(message, Discord){
        const princesscadanceEmbed = new Discord.MessageEmbed()
        .setColor("#FFCBE4")
        .setTitle("Princess Cadance")
        .setDescription("supporting-role royal leader")
        .setImage("https://static.wikia.nocookie.net/pure-good-wiki/images/7/74/Princess_Cadance_Vector.png/revision/latest?cb=20200709215552")
        message.channel.send({embeds: [princesscadanceEmbed]})
    }
}