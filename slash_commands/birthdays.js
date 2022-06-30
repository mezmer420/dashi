const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("birthdays")
.setDescription("Sort users by their birthdays")

module.exports.run = async ({client, interaction, Birthdays}) => {
    const data = await Birthdays.findAll({})
    
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
    .setTitle("Birthdays")
    .setColor("#9BDBF5")
    .setFooter("You haven't set your birthday\nSorted By Date")

    members = members.sort(function (b, a) {
        const currenttime = Date.now()
        return b.date - a.date
    })

    members = members.filter(function BigEnough(value) {
        return value.date > 0
    })

    let pos = 0
    
    for (let obj of members) {
        pos++

        if(obj.id == interaction.user.id){
            embed.setFooter("Sorted By Date")
        }
    }

    let desc = ""

    for (let i = 0; i < members.length; i++) {
        let user = client.users.cache.get(members[i].id)

        if(!user) return

        const datets = members[i].date

        const dateObj = new Date(datets)

        const month = dateObj.getUTCMonth() + 1
        const day = dateObj.getUTCDate()
        const year = dateObj.getUTCFullYear()

        const date = month + "/" + day + "/" + year

        desc += `<@${user.id}> — ${date}\n`
    }

    embed.setDescription(desc)

    interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })

}