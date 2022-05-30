module.exports = {
    name: "Trixie",
    description: "Trixie embed",
    execute(message, Discord){
        const trixieEmbed = new Discord.MessageEmbed()
        .setColor("#338FCC")
        .setTitle("Trixie")
        .setDescription("the great and powerful trixie")
        .setImage("https://static.wikia.nocookie.net/mlpfimroleplay/images/9/92/Trixie.png/revision/latest?cb=20160812001149")
        message.channel.send({embeds: [trixieEmbed]})
    }
}