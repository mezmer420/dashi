module.exports = {
    name: "StarlightGlimmer",
    description: "Starlight Glimmer embed",
    execute(message, Discord){
        const starlightglimmerEmbed = new Discord.MessageEmbed()
        .setColor("#F2C7F8")
        .setTitle("Starlight Glimmer")
        .setDescription("reformed pony")
        .setImage("https://static.wikia.nocookie.net/sexypedia/images/1/15/Starlight.png/revision/latest?cb=20210515185452")
        message.channel.send({embeds: [starlightglimmerEmbed]})
    }
}