module.exports = {
    name: "Yuri8",
    description: "Yuri 8 embed",
    execute(message, Discord){
        const yuri8Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://i.pinimg.com/originals/ca/dc/92/cadc92995ad6fa4592d72036518ca3d7.png")
        message.channel.send({embeds: [yuri8Embed]})
    }
}