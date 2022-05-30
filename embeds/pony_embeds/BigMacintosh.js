module.exports = {
    name: "BigMacintosh",
    description: "Big Macintosh embed",
    execute(message, Discord){
        const bigmacintoshEmbed = new Discord.MessageEmbed()
        .setColor("#E64A57")
        .setTitle("Big Macintosh")
        .setDescription('"yep"')
        .setImage("https://static.wikia.nocookie.net/mlpfanart/images/e/e6/Vector_Big_Macintosh_by_dey-chan.png/revision/latest?cb=20130605202825")
        message.channel.send({embeds: [bigmacintoshEmbed]})
    }
}