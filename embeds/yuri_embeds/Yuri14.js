module.exports = {
    name: "Yuri14",
    description: "Yuri 14 embed",
    execute(message, Discord){
        const yuri14Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://i.pinimg.com/originals/fb/75/cf/fb75cf65b60763c66283446c97324e8f.jpg")
        message.channel.send({embeds: [yuri14Embed]})
    }
}