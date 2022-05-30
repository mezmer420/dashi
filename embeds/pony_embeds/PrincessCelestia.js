module.exports = {
    name: "PrincessCelestia",
    description: "Princess Celestia embed",
    execute(message, Discord){
        const princesscelestiaEmbed = new Discord.MessageEmbed()
        .setColor("#FEF7FB")
        .setTitle("Princess Celestia")
        .setDescription("dayshift royal ruler")
        .setImage("https://static.wikia.nocookie.net/heroes-and-villain/images/c/cc/Princess_celestia.png/revision/latest?cb=20190127203437")
        message.channel.send({embeds: [princesscelestiaEmbed]})
    }
}