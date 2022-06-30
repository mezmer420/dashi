const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageActionRow, MessageButton } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("test2")
.setDescription("click count test")

module.exports.run = async ({client, interaction}) => {
    let timesclicked = 0

    const row = new MessageActionRow()
    .addComponents(
        but = new MessageButton()
        .setCustomId(`but-${interaction.member.id}`)
        .setLabel("choc unpure")
        .setStyle("PRIMARY")
    )
    
    const sentMessage = await interaction.editReply({
        content: `Click the button (times clicked: ${timesclicked})`,
        components: [row]
    })

    const filter = i => {
        return
        return i.user.id == interaction.user.id
    }

    const collector = sentMessage.createMessageComponentCollector({
        filter,
        time: 30000
    })

    collector.on("collect", async i => {
        const buttonId = i.customId
        const [command, memberId] = buttonId.split("-")

        // if(command == "but"){
            // console.log(`/test2: ${memberId}`)           this works
            timesclicked = timesclicked + 1

            // console.log(timesclicked)

            // i.reply("Click detected")

            await sentMessage.edit({
                content: `Click the button (times clicked: ${timesclicked})`,
                components: [row]
            })

            // await sentMessage.reply({
            //     content: "e"
            // })
            // .then(reply => {
            //     reply.delete()
            // })
        // }
    })

    collector.on("end", async i => {
        row.components[0].setDisabled(true)

        await sentMessage.edit({
            content: `You clicked the button: ${timesclicked} times`,
            components: [row]
        })
    })
}