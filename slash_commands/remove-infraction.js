const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("remove-infraction")
.setDescription("Remove a member's infraction")
.addIntegerOption(option => option
    .setName("infractionid")
    .setDescription("Infraction ID")
    .setRequired(true)
)

module.exports.run = async ({client, interaction, Infractions}) => {
    const infractionId = interaction.options.getInteger("infractionid")

    const getInfraction = await Infractions.findOne({where: {infractionid: infractionId}})

    if(!getInfraction){
        return await interaction.editReply({
            content: `Couldn't find an infraction on record with ID **${infractionId}**`
        })
        .catch((err) => {
            return
        })
    }

    await Infractions.destroy({where: {infractionid: infractionId}})

    const member = await client.users.fetch(`${getInfraction.memberid}`)

    const embed = new MessageEmbed()
    .setColor("#9BDBF5")
    .setAuthor({name: `${member.tag}'s infraction *${getInfraction.nature}* has been removed`, iconURL: `${member.displayAvatarURL()}`})
    .setDescription(`Removed By: <@${interaction.member.id}>`)
    .setTimestamp()

    await interaction.editReply({
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