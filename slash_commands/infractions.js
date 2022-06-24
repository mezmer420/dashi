const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("infractions")
.setDescription("View a member's infractions; leave blank to view all infractions")
.addUserOption(option => option
    .setName("member")
    .setDescription("Member to view infractions of")
    .setRequired(false)
)

module.exports.run = async ({client, interaction, Infractions}) => {
    const member = interaction.options.getMember("member")
    const user = interaction.options.getUser("member")

    if(member){
        const data = await Infractions.findAll({where: {memberid: member.id}})

        let infractions = []
    
        for (let obj of data) {
            infractions.push(obj)
        }
    
        const embed = new MessageEmbed()
        .setColor("#9BDBF5")
        .setAuthor({name: `${user.tag}'s Infractions`, iconURL: `${member.displayAvatarURL()}`})
        .setThumbnail("https://rosenblumlaw.com/wp-content/uploads/2019/08/shutterstock_1174972870-1024x683.jpg")
        .setFooter("Sorted by newest to oldest")
    
        infractions = infractions.sort(function (b, a) {
            return a.time - b.time
        })
    
        infractions = infractions.filter(function BigEnough(value) {
            return value.time > 0
        })
    
        let pos = 0

        for (let obj of infractions) {
            pos++
        }
    
        let desc = ""
    
        for (let i = 0; i < infractions.length; i++) {
            const nature = infractions[i].nature
            let time = infractions[i].time
            time = new Date(time + 3600000)
            time = time.toLocaleString()
            const infractionid = infractions[i].infractionid
    
            let rank = `${i + 1}.`
    
            desc += `${rank} **${nature}** | ${time} EST\nInfraction ID: ${infractionid}\n\n`
        }
    
        embed.setDescription(desc)
    
        if(embed.description == ""){
            return await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                    .setColor("#9BDBF5")
                    .setAuthor({name: `${user.tag} is an outstanding citizen!`, iconURL: `${member.displayAvatarURL()}`})
                    .setThumbnail("https://orangeleaders.com/wp-content/uploads/2020/04/wow-left-red1.png")
                ]
            })
            .catch((err) => {
                return
            })
        }
        
        await interaction.editReply({
            embeds: [embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(!member){
        const data = await Infractions.findAll({})

        let infractions = []
    
        for (let obj of data) {
            infractions.push(obj)
        }
    
        const embed = new MessageEmbed()
        .setColor("#9BDBF5")
        .setTitle("All Infractions")
        .setThumbnail("https://rosenblumlaw.com/wp-content/uploads/2019/08/shutterstock_1174972870-1024x683.jpg")
        .setFooter("Sorted by newest to oldest")
    
        infractions = infractions.sort(function (b, a) {
            return a.time - b.time
        })
    
        infractions = infractions.filter(function BigEnough(value) {
            return value.time > 0
        })
    
        let pos = 0
        
        for (let obj of infractions) {
            pos++
        }
    
        let desc = ""
    
        for (let i = 0; i < infractions.length; i++) {
            const memberId = infractions[i].memberid
            const nature = infractions[i].nature
            let time = infractions[i].time
            time = new Date(time + 3600000)
            time = time.toLocaleString()
            const infractionid = infractions[i].infractionid
    
            let rank = `${i + 1}.`
    
            desc += `${rank} <@${memberId}> **${nature}** | ${time} EST\nInfraction ID: ${infractionid}\n\n`
        }
    
        embed.setDescription(desc)
    
        if(embed.description == ""){
            return await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                    .setColor("#9BDBF5")
                    .setTitle("Everyone in this server is an outstanding citizen!")
                    .setThumbnail("https://orangeleaders.com/wp-content/uploads/2020/04/wow-left-red1.png")
                ]
            })
            .catch((err) => {
                return
            })
        }
    
        await interaction.editReply({
            embeds: [embed]
        })
        .catch((err) => {
            return
        })
    }
}