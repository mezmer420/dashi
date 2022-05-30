module.exports = {
    name: "Yuri4",
    description: "Yuri 4 embed",
    execute(message, Discord){
        const yuri4Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://www.kindpng.com/picc/m/325-3250080_yuri-cute-yuri-doki-doki-hd-png-download.png")
        message.channel.send({embeds: [yuri4Embed]})
    }
}