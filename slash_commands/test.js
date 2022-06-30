const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageActionRow, MessageButton } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("test")
.setDescription("button test")

module.exports.run = async ({client, interaction}) => {
    const row = new MessageActionRow()
    .addComponents(
        but = new MessageButton()
        .setCustomId(`but-${interaction.member.id}`)
        .setLabel("Button")
        .setStyle("PRIMARY")
    )
    
    const sentMessage = await interaction.editReply({
        content: "Click the button",
        components: [row]
    })

    const filter = i => {
        return i.user.id == interaction.user.id
    }

    const collector = sentMessage.createMessageComponentCollector({
        filter,
        max: 1,
        time: 10000
    })

    collector.on("collect", async i => {
        const buttonId = i.customId
        const [command, memberId] = buttonId.split("-")

        // if(command == "but"){
            // console.log(`/test: ${memberId}`)        this works
            i.reply("Click detected")
        // }
    })

    collector.on("end", async i => {
        row.components[0].setDisabled(true)

        await sentMessage.edit({
            content: "Click the button",
            components: [row]
        })
    })
}