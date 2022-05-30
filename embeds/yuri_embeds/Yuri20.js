module.exports = {
    name: "Yuri20",
    description: "Yuri 20 embed",
    execute(message, Discord){
        const yuri20Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://pbs.twimg.com/media/E8u5LohVkAEgyuz?format=jpg&name=4096x4096")
        message.channel.send({embeds: [yuri20Embed]})
    }
}