module.exports = {
    name: "Yuri9",
    description: "Yuri 9 embed",
    execute(message, Discord){
        const yuri9Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://w0.peakpx.com/wallpaper/250/486/HD-wallpaper-video-game-doki-doki-literature-club-girl-purple-eyes-yuri-doki-doki-literature-club.jpg")
        message.channel.send({embeds: [yuri9Embed]})
    }
}