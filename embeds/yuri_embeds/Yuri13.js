module.exports = {
    name: "Yuri13",
    description: "Yuri 13 embed",
    execute(message, Discord){
        const yuri13Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://sun9-3.userapi.com/s/v1/ig1/ya2hlCsURQmmpUy4R8o_Q3gA2Uou_tAlCsAYC7NOHueTZcmzm0ytL9I2It_fMEp5jjFiUf4o.jpg?size=430x604&quality=96&type=album")
        message.channel.send({embeds: [yuri13Embed]})
    }
}