module.exports = {
    name: "Yuri11",
    description: "Yuri 11 embed",
    execute(message, Discord){
        const yuri11Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://pbs.twimg.com/media/EzKz2a3VgAox0_j?format=jpg&name=4096x4096")
        message.channel.send({embeds: [yuri11Embed]})
    }
}