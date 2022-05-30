module.exports = {
    name: "Yuri1",
    description: "Yuri 1 embed",
    execute(message, Discord){
        const yuri1Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://i.pinimg.com/originals/f1/57/56/f157565faa42f556df9baa2b1063bde9.jpg")
        message.channel.send({embeds: [yuri1Embed]})
    }
}