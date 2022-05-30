module.exports = {
    name: "Scootaloo",
    description: "Scootaloo embed",
    execute(message, Discord){
        const scootalooEmbed = new Discord.MessageEmbed()
        .setColor("#F9B764")
        .setTitle("Scootaloo")
        .setDescription("chicken cutie mark crusader")
        .setImage("https://static.wikia.nocookie.net/my-little-pony-in-madagascar/images/b/b5/Determined_Scootaloo.png/revision/latest?cb=20180329153302")
        message.channel.send({embeds: [scootalooEmbed]})
    }
}