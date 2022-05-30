module.exports = {
    name: "DerpyHooves",
    description: "Derpy Hooves embed",
    execute(message, Discord){
        const derpyhoovesEmbed = new Discord.MessageEmbed()
        .setColor("#C2C5D5")
        .setTitle("Derpy Hooves")
        .setDescription("the community's favorite background pony")
        .setImage("https://static.wikia.nocookie.net/smashbroslawlorigins/images/5/51/Derpy_hooves_vector_by_durpy-d4bwgwf.png/revision/latest?cb=20140519002319")
        message.channel.send({embeds: [derpyhoovesEmbed]})
    }
}