const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("spam")
.setDescription("Spam ping a user")
.addUserOption(option => option
    .setName("user")
    .setDescription("User to spam")
    .setRequired(true)
)
.addStringOption(option => option
    .setName("message")
    .setDescription("Optional message to send")
    .setRequired(false)
)

module.exports.run = async ({client, interaction, Spams}) => {
    if(interaction.channel.id == "945527434655187006"){
        const getSpam = await Spams.findOne({where: {active: true}})

        if(getSpam){
            return await interaction.editReply({
                content: "A spam is already active!"
            })
            .catch((err) => {
                return
            })
        }

        const member = interaction.options.getMember("user")
        const messagecontent = interaction.options.getString("message") || ""

        await Spams.update({starterid: interaction.member.id, active: true}, {where: {active: false}})

        await interaction.editReply({
            content: "Spam started!"
        })
        .catch((err) => {
            return
        })

        interval = setInterval (function () {
            interaction.channel.send(`<@${member.id}> ${messagecontent}`)
        }, 2000)
    }

    else {
        return await interaction.editReply({
            content: "you can only use that command in <#945527434655187006>! (this message will autodelete)"
        })
        .catch((err) => {
            return
        })
        .then(interaction => {
			setTimeout(() => interaction.delete()
			.catch((err) => {
				return
			}), 6000)
		})
    }
}