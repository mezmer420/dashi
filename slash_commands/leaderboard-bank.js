const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("leaderboard-bank")
.setDescription("Sort users by their Dashcoins in bank")

module.exports.run = async ({client, interaction, Economy}) => {
    // const guild = client.guilds.resolve("939674946379083847")
    // guild.members.fetch({force: true})
    // .then(console.log)

    let data = await Economy.findAll({})
    let members = []

    for (let obj of data) {
        if(interaction.guild.members.cache
            .map((member) => member.id)
            .includes(obj.id)
            ){
                members.push(obj)
            }
    }

    const embed = new MessageEmbed()
    .setTitle("Bank Leaderboard")
    .setColor("#9BDBF5")
    .setFooter("You're not on the leaderboard")

    members = members.sort(function (b, a) {
        return a.bank - b.bank
    })

    members = members.filter(function BigEnough(value) {
        return value.bank > 0
    })

    let pos = 0
    for (let obj of members) {
        pos++
        if(obj.id == interaction.user.id){
            embed.setFooter(`Your position is #${pos}`)
        }
    }

    members = members.slice(0, 10)
    let desc = ""

    for (let i = 0; i < members.length; i++) {
        let user = client.users.cache.get(members[i].id)
        if(!user) return
        let bal = members[i].bank
        desc += `${i + 1}. ${user.tag} - ${bal} Dashcoins:tm:\n`
    }

    embed.setDescription(desc)
    // console.log(members)

    interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })

}