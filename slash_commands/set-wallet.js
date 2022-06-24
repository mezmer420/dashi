const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("set-wallet")
.setDescription("Set a user's wallet balance")
.addUserOption(option => option
    .setName("user")
    .setDescription("The user to set the wallet balance of")
    .setRequired(true)
)
.addIntegerOption(option => option
    .setName("amount")
    .setDescription("The wallet balance to set")
    .setRequired(true)
)

module.exports.run = async ({client, interaction, Economy}) => {    
    const amount = interaction.options.getInteger("amount")
    const member = interaction.options.getMember("user")

    let getUser = await Economy.findOne({where: {id: member.id}})

    if(!getUser){
        getUser = await Economy.create({id: member.id, wallet: 0, bank: 0})
    }

    const newWallet = amount

    await Economy.update({wallet: newWallet}, {where: {id: member.id}})

    const embed = new MessageEmbed()
    .setTitle("💸 New Wallet Set 💸")
    .setDescription(`**${member.displayName}**'s wallet balance has been set to **${amount}** Dashcoins:tm:!`)
    .setColor("GREEN")
    .setThumbnail(member.user.avatarURL())

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}