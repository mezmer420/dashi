module.exports = {
    name: "PinkiePie",
    description: "Pinkie Pie embed",
    execute(message, Discord){
        const pinkiepieEmbed = new Discord.MessageEmbed()
        .setColor("#F5B7D0")
        .setTitle("Pinkie Pie")
        .setDescription("always high on sugar")
        .setImage("https://static.wikia.nocookie.net/heroes-and-villain/images/8/8c/Pinke_Pie.png/revision/latest?cb=20190127191309")
        message.channel.send({embeds: [pinkiepieEmbed]})
    }
}