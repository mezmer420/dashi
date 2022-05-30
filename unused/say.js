const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("say")
.setDescription("Make me say whatever you want >;)")
.addStringOption(option => option.setName("message").setRequired(true).setDescription("The message I say"))

module.exports.run = async (client, interaction, message, options) => {
    if(interaction.member.id == "527285622809952256"){
        let whatever = options.getString("message")

        message.channel.send(whatever)

        interaction.deleteReply()
        .catch()
    }
    else {
        return interaction.editReply({
            content: "only mezmer420 can use that command! (this message will autodelete)"
        })
        .then(interaction => {
            setTimeout(() => interaction.delete(), 6000)
        })
        .catch()
    }
}