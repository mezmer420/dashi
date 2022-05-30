module.exports = {
    name: "ShiningArmor",
    description: "Shining Armor embed",
    execute(message, Discord){
        const shiningarmorEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setTitle("Shining Armor")
        .setDescription("cadence's husbando")
        .setImage("https://static.wikia.nocookie.net/heroes-and-villain/images/f/f6/Shining_Armor.png/revision/latest?cb=20190131181012")
        message.channel.send({embeds: [shiningarmorEmbed]})
    }
}