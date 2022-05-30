module.exports = {
    name: "Fluttershy",
    description: "Fluttershy embed",
    execute(message, Discord){
        const fluttershyEmbed = new Discord.MessageEmbed()
        .setColor("#FAF5AB")
        .setTitle("Fluttershy")
        .setDescription("quiet pony")
        .setImage("https://static.wikia.nocookie.net/characterprofile/images/2/29/Fluttershy.png/revision/latest/scale-to-width-down/1600?cb=20200722005905")
        message.channel.send({embeds: [fluttershyEmbed]})
    }
}