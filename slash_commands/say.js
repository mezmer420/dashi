const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("say")
.setDescription("Make me say whatever you want anywhere >;)")
.addStringOption(option => option
    .setName("message")
    .setDescription("The message I say")
    .setRequired(true)
)
.addChannelOption(option => option
    .setName("channel")
    .setDescription("The channel to send in")
    .setRequired(false)
)

module.exports.run = async ({client, interaction}) => {
    if(interaction.member.id == "527285622809952256" || message.author.id == "762133129209053244"){
        const whatever = interaction.options.getString("message")
        const destination = interaction.options.getChannel("channel") || interaction.channel

        await interaction.deleteReply()
        .catch((err) => {
            return
        })

        await destination.send(whatever)
    }
    else {
        return interaction.editReply({
            content: "only mezmer420 and vcashy can use that command! (this message will autodelete)"
        })
        .then(interaction => {
            setTimeout(() => interaction.delete()
            .catch((err) => {
                return
            }), 6000)
        })
    }
}