module.exports = {
    name: "Yuri5",
    description: "Yuri 5 embed",
    execute(message, Discord){
        const yuri5Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("http://pm1.narvii.com/7301/859efdbf1823f2a9c8f90a7e36b2c0f482f5672fr1-500-500v2_00.jpg")
        message.channel.send({embeds: [yuri5Embed]})
    }
}