module.exports = {
    name: "AppleBloom",
    description: "Apple Bloom embed",
    execute(message, Discord){
        const applebloomEmbed = new Discord.MessageEmbed()
        .setColor("#F3F49B")
        .setTitle("Apple Bloom")
        .setDescription("farmer cutie mark crusader")
        .setImage("https://static.wikia.nocookie.net/my-little-universe/images/2/24/Applebloom.png/revision/latest?cb=20200615103110")
        message.channel.send({embeds: [applebloomEmbed]})
    }
}