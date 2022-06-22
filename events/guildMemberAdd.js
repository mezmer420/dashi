const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildMemberAdd",
    async execute(client, member){
        const logs = await client.channels.cache.get("955948174894325782")

        const createdts = new Date(member.user.createdTimestamp + 5 * 3600000)
        const createdtime = createdts.toLocaleString()

        const Embed = new MessageEmbed()
        .setTitle(`🛬 Member Joined — ${member.user.tag}`)
        .setDescription(`<@${member.user.id}> joined the server`)
        .addField("Account Created at", `${createdtime}`)
        .setColor("GREEN")
        .setThumbnail(`${member.displayAvatarURL()}`)
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()

        await logs.send({
            embeds: [Embed]
        })
        .catch((err) => {
            return console.log(err)
        })

        member.send(`${member.user.username}, welcome to Eoic Gamer Server!`)
        .catch((err) => {
            return console.log(err)
        })
    }
}