module.exports = {
    name: "RainbowDash",
    description: "Rainbow Dash embed",
    execute(message, Discord){
        const rainbowdashEmbed = new Discord.MessageEmbed()
        .setColor("#9BDBF5")
        .setTitle("Rainbow Dash")
        .setDescription("fast pone")
        .setImage("https://i.pinimg.com/originals/06/05/2b/06052b46e6d6395abd5630764a644b7b.png")
        message.channel.send({embeds: [rainbowdashEmbed]})
    }
}