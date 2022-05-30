module.exports = {
    name: "Applejack",
    description: "Applejack embed",
    execute(message, Discord){
        const applejackEmbed = new Discord.MessageEmbed()
        .setColor("#FABA62")
        .setTitle("Applejack")
        .setDescription("work horse")
        .setImage("https://static.tvtropes.org/pmwiki/pub/images/mlp_applejack.png")
        message.channel.send({embeds: [applejackEmbed]})
    }
}