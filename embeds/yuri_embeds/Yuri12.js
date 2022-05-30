module.exports = {
    name: "Yuri12",
    description: "Yuri 12 embed",
    execute(message, Discord){
        const yuri12Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://pbs.twimg.com/media/E_b9pv4XIAYY5BG.jpg:large")
        message.channel.send({embeds: [yuri12Embed]})
    }
}