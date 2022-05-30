module.exports = {
    name: "Yuri7",
    description: "Yuri 7 embed",
    execute(message, Discord){
        const yuri7Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://i.pinimg.com/originals/07/4c/73/074c73d545dc8039aa3049527f69875c.jpg")
        message.channel.send({embeds: [yuri7Embed]})
    }
}