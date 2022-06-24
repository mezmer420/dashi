const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("stop-spam")
.setDescription("Stop the existing spam")

module.exports.run = async ({client, interaction, Spams}) => {
    if(interaction.channel.id == "945527434655187006"){
        const getSpam = await Spams.findOne({where: {active: true}})

        if(!getSpam){
            return await interaction.editReply({
                content: "There's no existing spam"
            })
            .catch((err) => {
                return
            })
        }

        const starter = await getSpam.starterid

        if(interaction.member.id !== starter && interaction.member.id !== "527285622809952256"){
            return await interaction.editReply({
                content: "You are not permitted to stop the current spam."
            })
            .catch((err) => {
                return
            })
        }

        await Spams.update({active: false}, {where: {active: true}})

        clearInterval(interval)

        await interaction.editReply({
            content: "Spam stopped"
        })
        .catch((err) => {
            return
        })
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