const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("dialect")
.setDescription("View dialect info")
.addUserOption(option => option
    .setName("user")
    .setRequired(true)
    .setDescription("User to view the dialect of"))

module.exports.run = async (client, interaction) => {
    const member = interaction.options.getMember("user")
    
    let embed = new MessageEmbed()

    if(member.id == "762133129209053244" || member.id == "527285622809952256" || member.id == "826841451945787412" || member.id == "691727350051635262" || member.id == "251778379211210755" || member.id == "651251126884368384"){
        if(member.id == "762133129209053244"){
            embed
            .setColor("#FFA500")
            .setTitle("vcash dialect")
            .addField("`ballsL\n\nel mao\n\nle mao\n\ntoyota\n\ntoyot\n\nxt`\n—————", "<@762133129209053244>")
        }
    
        else if(member.id == "527285622809952256"){
            embed
            .setColor("#0096FF")
            .setTitle("mezmer dialect")
            .addField("`hmok\n\nidecay\n\nifusaiso\n\nle mayo\n\nobsessed\n\nolc\n\noolc\n\nomegaL\n\nwoaow\n\nwowzer\n\nwowzr\n\nwowzerooni\n\nwowzeroni`\n—————", "<@527285622809952256>")
        }
    
        else if(member.id == "826841451945787412"){
            embed
            .setColor("RED")
            .setTitle("choc dialect")
            .addField("`..\n\nidit\n\nifusaso\n\nlay-mow\n\nperty\n\nwhat\n\nys\n\nyss`\n—————", "<@826841451945787412>")
        }
    
        else if(member.id == "691727350051635262"){
            embed
            .setColor("PURPLE")
            .setTitle("speedy dialect uwu owu uwo ow- -w- -wu uWu")
            .addField("`emoyi\n\ngf\n\nues`\n—————", "<@691727350051635262>")
        }
    
        else if(member.id == "251778379211210755"){
            embed
            .setColor("PURPLE")
            .setTitle("delta airlines dialect")
            .addField("`bigfunni\n\nbigL\n\nbihL\n\ncockL\n\nifusayso\n\nla mao\n\nmediumL\n\nshut\n\ntinyL\n\nyees\n\nyeees\n\nyeeees\n\nyews\n\nyeews`\n—————", "<@251778379211210755>")
        }
    
        else if(member.id == "651251126884368384"){
            embed
            .setColor("GREEN")
            .setTitle("georgeerto dialect")
            .addField("` \n\nalright got it`\n—————", "<@651251126884368384>")
        }
    
        await interaction.editReply({
            embeds: [embed]
        })
        .catch((err) => {
            return
        })
    }

    else {
        await interaction.editReply({
            content: "The user you specified doesn't have a dialect"
        })
        .catch((err) => {
            return
        })
    }
}