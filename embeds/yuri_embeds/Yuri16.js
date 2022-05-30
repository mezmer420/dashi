module.exports = {
    name: "Yuri16",
    description: "Yuri 16 embed",
    execute(message, Discord){
        const yuri16Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://www.seekpng.com/png/small/134-1347813_doki-doki-literature-club-yuri-ddlc-yuri.png")
        message.channel.send({embeds: [yuri16Embed]})
    }
}