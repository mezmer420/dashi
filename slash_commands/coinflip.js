const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("coinflip")
.setDescription("Flip a coin")


module.exports.run = (client, interaction) => {
    const outcomes = ["heads", "tails"]
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)]

    interaction.editReply({
        content: `Ok, flipped it. It's... **${outcome}**`
    })
    .catch((err) => {
        return
    })
}