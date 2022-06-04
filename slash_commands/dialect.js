const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("dialect")
.setDescription("View dialect info (use the dedicated /dialectspeedychoc command)")
.addUserOption(option => option
    .setName("user")
    .setRequired(true)
    .setDescription("User to view the dialect of"))

module.exports.run = async (client, interaction, options) => {
    let member = options.getMember("user")

    if(member.id == "762133129209053244"){
        const vcashEmbed = new MessageEmbed()
        .setColor("#FFA500")
        .setTitle("vcash dialect")
        .addField("`ballsL\n\nel mao\n\nle mao\n\ntoyota\n\ntoyot\n\nxt`\n—————", "<@762133129209053244>")
        await interaction.editReply({
            embeds: [vcashEmbed]
        })
    }

    else if(member.id == "527285622809952256"){
        const mezmerEmbed = new MessageEmbed()
        .setColor("#0096FF")
        .setTitle("mezmer dialect")
        .addField("`hmok\n\nidecay\n\nifusaiso\n\nle mayo\n\nobsessed\n\nolc\n\noolc\n\nomegaL\n\nwowzer\n\nwowzr\n\nwowzerooni\n\nwowzeroni`\n—————", "<@527285622809952256>")
        await interaction.editReply({
            embeds: [mezmerEmbed]
        })
    }

    else if(member.id == "826841451945787412"){
        const chocEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle("choc dialect")
        .addField("`idit\n\nifusaso\n\nlay-mow\n\nperty\n\nwhat\n\nys\n\nyss`\n—————", "<@826841451945787412>")
        await interaction.editReply({
            embeds: [chocEmbed]
        })
    }

    else if(member.id == "691727350051635262"){
        const speedyEmbed = new MessageEmbed()
        .setColor("PURPLE")
        .setTitle("speedy dialect uwu owu uwo ow- -w- -wu uWu")
        .addField("`emoyi\n\ngf\n\nues`\n—————", "<@691727350051635262>")
        await interaction.editReply({
            embeds: [speedyEmbed]
        })
    }

    else if(member.id == "251778379211210755"){
        const deltaEmbed = new MessageEmbed()
        .setColor("PURPLE")
        .setTitle("delta airlines dialect")
        .addField("`bigfunni\n\nbigL\n\nbihL\n\ncockL\n\nifusayso\n\nla mao\n\nmediumL\n\nshut\n\ntinyL\n\nyees\n\nyeees\n\nyeeees\n\nyews\n\nyeews`\n—————", "<@251778379211210755>")
        await interaction.editReply({
            embeds: [deltaEmbed]
        })
    }

    else {
        await interaction.editReply({
            content: "The user you specified doesn't have a dialect"
        })
    }
}