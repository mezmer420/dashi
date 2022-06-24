const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("balance")
.setDescription("Check the balance of yourself or another ")
.addUserOption(option => option
    .setName("user")
    .setDescription("User to check the balance of; skip to view your own balance")
    .setRequired(false)
)

module.exports.run = async ({client, interaction, Economy}) => {
    const member = interaction.options.getMember("user") || interaction.member
    let getUser = await Economy.findOne({where: {id: member.id}})

    if(!getUser){
        getUser = await Economy.create({id: member.id, wallet: 0, bank: 0})
    }

    const embed = new MessageEmbed()
    .setTitle(`${member.displayName}'s Balance`)
    .setDescription(`**${getUser.wallet}** Dashcoins:tm: in wallet and **${getUser.bank}** Dashcoins:tm: in bank`)
    .setColor("#9BDBF5")
    .setThumbnail(member.user.avatarURL())

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}