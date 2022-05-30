module.exports = {
    name: "Yuri17",
    description: "Yuri 17 embed",
    execute(message, Discord){
        const yuri17Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://preview.redd.it/mc8x7j0cg2d71.jpg?auto=webp&s=4c3186b657d2b77b2be6284ebca546ede0c4295d")
        message.channel.send({embeds: [yuri17Embed]})
    }
}