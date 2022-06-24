const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("help")
.setDescription("Provides first aid")

module.exports.run = async ({client, interaction}) => {
    const dashi = await client.users.fetch("956345939130482750")
    const mezmer = await client.users.fetch("527285622809952256")

    const infoEmbed = new MessageEmbed()
    .setColor("#9BDBF5")
    .setTitle("Help 🚑 ❤️‍🩹")
    // .setURL("https://github.com/mezmer420/dashi")
    .setAuthor({name: `${dashi.tag}`, iconURL: `${dashi.displayAvatarURL()}`})
    .setDescription(`**Who am I?**\n<@${mezmer.id}> originally got the idea of a creating a Discord bot to have one respond "obsessed with d" every time <@826841451945787412> expressed his obsession with d. Today, that feature is scarcely used and instead I've proceeded to result in the obsolescence of other bots here. I see that as a win.\n[GitHub](https://github.com/mezmer420/dashi)\n——————————\n**Text Commands**`)
    // .setThumbnail(`${dashi.displayAvatarURL()}`)
    .addFields(
        {name: "For Everyone", value: "`!cockroach`  `!emojify [message]`  `!good`  `hangman`"},
        {name: "For Government", value: "`!gulag`  `!newhangman [channel] [word]`"},
        {name: "For Owners", value: "`!s [message]`"},
        {name: "For mezmer", value: "(CLASSIFIED)\n——————————"},
    )
    .addField("**Slash Commands**", "I have over 40 slash commands that everyone can use + government commands. Type `/` and click me to view my slash commands available to you in your current channel. If you're an admin, mezmer has hardcoded certain commands such that only he can use them. ;)")
    .setFooter({text: `${mezmer.tag}`, iconURL: `${mezmer.displayAvatarURL()}`})
    
    await interaction.editReply({
        embeds: [infoEmbed]
    })
    .catch((err) => {
        return
    })
}