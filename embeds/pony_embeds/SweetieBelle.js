module.exports = {
    name: "SweetieBelle",
    description: "Sweetie Belle embed",
    execute(message, Discord){
        const sweetiebelleEmbed = new Discord.MessageEmbed()
        .setColor("#EFEDED")
        .setTitle("Sweetie Belle")
        .setDescription("cute cutie mark crusader")
        .setImage("https://static.wikia.nocookie.net/mlpfanart/images/e/e6/Sweetie_belle_vector_by_tigersoul96.png/revision/latest?cb=20120516042820")
        message.channel.send({embeds: [sweetiebelleEmbed]})
    }
}