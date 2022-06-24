const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("warn")
.setDescription("Warn a member")
.addUserOption(option => option
    .setName("member")
    .setDescription("Member to warn")
    .setRequired(true)
)
.addStringOption(option => option
    .setName("reason")
    .setDescription("Reason of the warn")
    .setRequired(true)
)

module.exports.run = async ({client, interaction, Infractions}) => {
    const member = interaction.options.getMember("member")
    const user = interaction.options.getUser("member")
    const reason = interaction.options.getString("reason")

    if(member.id !== "762133129209053244" && member.id !== "527285622809952256" && member.id !== "956345939130482750" && member.id !== "159985870458322944"){
        const currenttime = Date.now()

        const randomid = Math.floor(Math.random() * 8989000) + 1010000
    
        await Infractions.create({memberid: member.id, infractionid: randomid, time: currenttime, nature: reason})

        const tag = await interaction.user.tag
    
        await member.send(`<@${member.id}> You have been warned by **${tag}** for:\n**${reason}**`)
        .catch((err) => {
            return console.log(err)
        })

        const embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor({name: `${user.tag} has been warned`, iconURL: `${member.displayAvatarURL()}`})
        .setDescription(`Reason: **${reason}**\nIssued By: <@${interaction.member.id}>`)
        .setThumbnail("https://images.emojiterra.com/twitter/v14.0/512px/26a0.png")
        .setFooter(`Infraction ID: ${randomid}`)
        .setTimestamp()
    
        return await interaction.editReply({
            embeds: [embed]
        })
        .catch((err) => {
            return
        })

        const logs = await client.channels.cache.get("955948174894325782")

        await logs.send({
            embeds: [embed]
        })
        .catch((err) => {
            return console.log(err)
        })
    }

    else {
        const responses = [
            '"Bruh moment"',
            '"Uno bruh momento"',
            '"LMAO"',
            '"Coup d' + "'" + 'état"',
            '"How dare you"',
            '"lol"',
            '"Nice try nimrod"',
            '"Your execution is scheduled for tomorrow morning"',
            '"Seriously?"',
            '"Bruh"',
            '"hmm yes"'
        ]
        const response = responses[Math.floor(Math.random() * responses.length)]

        let embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(response)
        .setTimestamp()

        if(member.id == "762133129209053244"){
            embed
            .setAuthor({name: "vcash", iconURL: `${member.displayAvatarURL()}`})
            // .setTitle("vcash")
            .setFooter("You just tried to warn the President 🤦‍♂️")
        }

        else if(member.id == "527285622809952256"){
            embed
            .setAuthor({name: "mezmer420", iconURL: `${member.displayAvatarURL()}`})
            // .setTitle("mezmer420")
            .setFooter("You just tried to warn the Vice President 🤦‍♂️")
        }

        else if(member.id == "956345939130482750"){
            embed
            .setAuthor({name: "dashi", iconURL: `${member.displayAvatarURL()}`})
            // .setTitle("dashi")
            .setFooter("You just tried to warn me 🤦‍♂️")
        }

        else if(member.id == "159985870458322944"){
            embed
            .setAuthor({name: "mee6", iconURL: `${member.displayAvatarURL()}`})
            // .setTitle("mee6")
            .setFooter("You just tried to warn an Admin 🤦‍♂️")
        }

        return await interaction.editReply({
            embeds: [embed]
        })
        .catch((err) => {
            return
        })
    }
}