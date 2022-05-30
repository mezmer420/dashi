module.exports = {
    name: "Yuri19",
    description: "Yuri 19 embed",
    execute(message, Discord){
        const yuri19Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://cdn140.picsart.com/271169818025211.png")
        message.channel.send({embeds: [yuri19Embed]})
    }
}