const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildMemberRemove",
    async execute(client, member){
        const logs = await client.channels.cache.get("955948174894325782")

        const Embed = new MessageEmbed()
        .setTitle(`👋 Member Left — ${member.user.tag}`)
        .setDescription(`<@${member.user.id}> left or was kicked/banned from the server`)
        .setColor("RED")
        .setThumbnail(`${member.displayAvatarURL()}`)
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()

        await logs.send({
            embeds: [Embed]
        })
        .catch((err) => {
            return console.log(err)
        })
    }
}