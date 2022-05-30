module.exports = {
    name: "Yuri15",
    description: "Yuri 15 embed",
    execute(message, Discord){
        const yuri15Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://static.zerochan.net/Yuri.%28Doki.Doki.Literature.Club%21%29.full.3384849.png")
        message.channel.send({embeds: [yuri15Embed]})
    }
}