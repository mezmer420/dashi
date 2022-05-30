module.exports = {
    name: "Yuri3",
    description: "Yuri 3 embed",
    execute(message, Discord){
        const yuri3Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://64.media.tumblr.com/cdbdd58ab338d108a74852a5c0ad4945/2610ac1947e38872-ed/s1280x1920/1d5cec054acb8275665b7e5b7db30b806236127b.jpg")
        message.channel.send({embeds: [yuri3Embed]})
    }
}