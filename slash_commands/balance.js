const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("balance")
.setDescription("Check the balance of yourself or another user; leave blank to view your own balance")
.addUserOption(option =>
    option.setName("user")
    .setRequired(false)
    .setDescription("User to check the balance of"))

module.exports.run = async (client, interaction, options, Economy) => {
    let member = options.getMember("user") || interaction.member
    let getUser = await Economy.findOne({where: {id: member.id}})
    if(!getUser) {
        getUser = await Economy.create({id: member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    const embed = new MessageEmbed()
    .setTitle(`${member.displayName}'s Balance`)
    .setDescription(`**${getUser.wallet}** Dashcoins:tm: in wallet and **${getUser.bank}** Dashcoins:tm: in bank`)
    .setColor("#9BDBF5")
    .setThumbnail(member.user.avatarURL())

    await interaction.editReply({
        embeds: [embed]
    })
}