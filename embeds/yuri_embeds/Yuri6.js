module.exports = {
    name: "Yuri6",
    description: "Yuri 6 embed",
    execute(message, Discord){
        const yuri6Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://pbs.twimg.com/media/EQGnPoSWAAEnf2E.jpg:large")
        message.channel.send({embeds: [yuri6Embed]})
    }
}