module.exports = {
    name: "Rarity",
    description: "Rarity embed",
    execute(message, Discord){
        const rarityEmbed = new Discord.MessageEmbed()
        .setColor("#EAEEF0")
        .setTitle("Rarity")
        .setDescription("fashion expert")
        .setImage("https://static.wikia.nocookie.net/in-a-locked-room/images/a/af/Rarity.png/revision/latest?cb=20180419140244")
        message.channel.send({embeds: [rarityEmbed]})
    }
}