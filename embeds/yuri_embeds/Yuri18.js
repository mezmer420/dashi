module.exports = {
    name: "Yuri18",
    description: "Yuri 18 embed",
    execute(message, Discord){
        const yuri18Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://pbs.twimg.com/media/Eymj8oWXEAEn9hP?format=jpg&name=4096x4096")
        message.channel.send({embeds: [yuri18Embed]})
    }
}