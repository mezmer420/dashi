const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("set-bank")
.setDescription("Set a user's bank balance")
.addUserOption(option => option
    .setName("user")
    .setDescription("The user to set the bank balance of")
    .setRequired(true)
)
.addIntegerOption(option => option
    .setName("amount")
    .setDescription("The bank balance to set")
    .setRequired(true)
)

module.exports.run = async ({client, interaction, Economy}) => {
    const amount = interaction.options.getInteger("amount")
    const member = interaction.options.getMember("user")

    let getUser = await Economy.findOne({where: {id: member.id}})

    if(!getUser){
        getUser = await Economy.create({id: member.id, wallet: 0, bank: 0})
    }

    const newBank = amount

    await Economy.update({bank: newBank}, {where: {id: member.id}})

    const embed = new MessageEmbed()
    .setTitle("💸 New Bank Set 💸")
    .setDescription(`**${member.displayName}**'s bank balance has been set to **${amount}** Dashcoins:tm:!`)
    .setColor("GREEN")
    .setThumbnail(member.user.avatarURL())

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}