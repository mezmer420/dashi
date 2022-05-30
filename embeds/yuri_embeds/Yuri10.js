module.exports = {
    name: "Yuri10",
    description: "Yuri 10 embed",
    execute(message, Discord){
        const yuri10Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://i.pinimg.com/736x/1b/cd/6f/1bcd6f453c9a56150ec843b8032bc094.jpg")
        message.channel.send({embeds: [yuri10Embed]})
    }
}