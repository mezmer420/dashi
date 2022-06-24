const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("dialect")
.setDescription("View dialect info")
.addUserOption(option => option
    .setName("user")
    .setDescription("User to view the dialect of")
    .setRequired(true)
)
.addUserOption(option => option
    .setName("user2")
    .setDescription("Choose spedy, choc, and delta (in that order) to view speedychocdelta dialect")
    .setRequired(false)
)
.addUserOption(option => option
    .setName("user3")
    .setDescription("Choose spedy, choc, and delta (in that order) to view speedychocdelta dialect")
    .setRequired(false)
)

module.exports.run = async ({client, interaction}) => {
    const member = interaction.options.getMember("user")
    const member2 = interaction.options.getMember("user2")
    const member3 = interaction.options.getMember("user3")
    
    let embed = new MessageEmbed()

    if(!member2 && !member3){
        if(member.id == "762133129209053244"){
            embed
            .setColor("#FFA500")
            .setTitle("vcash dialect")
            .addField("`ballsL\n\nel mao`   `le mao\n\ntoyot`   `toyota\n\nxt`\n—————", "<@762133129209053244>")
        }
    
        else if(member.id == "527285622809952256"){
            embed
            .setColor("#0096FF")
            .setTitle("mezmer dialect")
            .addField("`hmok\n\nidecay\n\nifusaiso\n\nle mayo\n\nobsessed\n\nolc`   `oolc\n\nomegaL\n\nwoaow\n\nwowzer`   `wowzr\n\nwowezoni`   `wowzerooni`\n—————", "<@527285622809952256>")
        }
    
        else if(member.id == "826841451945787412"){
            embed
            .setColor("RED")
            .setTitle("choc dialect")
            .addField("`..\n\nchickin`   `chickn`   `chikn`   `chkin\n\nel am a oh\n\nidit\n\nifusaso\n\nlay mow\n\nperty\n\nrawblocky\n\nwhat\n\nys`   `yss`\n—————", "<@826841451945787412>")
        }
    
        else if(member.id == "691727350051635262"){
            embed
            .setColor("PURPLE")
            .setTitle("speedy dialect uwu owu uwo ow- -w- -wu uWu")
            .addField("`^\n\nemoyi\n\ngf\n\nues`\n—————", "<@691727350051635262>")
        }
    
        else if(member.id == "251778379211210755"){
            embed
            .setColor("PURPLE")
            .setTitle("delta airlines dialect")
            .addField("`bigfunni\n\nbigL`   `bihL\n\ncockL\n\nifusayso\n\nla mao\n\nleat fingies\n\nmediumL\n\nmegaL\n\nshut\n\ntinyL\n\nye`   `yee yee`   `yee\n\nyeeees`   `yeees`   `yees`   `yeees\n\nyeews`   `yews`   `yew`\n—————", "<@251778379211210755>")
        }
    
        else if(member.id == "651251126884368384"){
            embed
            .setColor("GREEN")
            .setTitle("georgeerto dialect")
            .addField("` \n\nalright got it`\n—————", "<@651251126884368384>")
        }

        else {
            return await interaction.editReply({
                content: "The user you specified doesn't have a dialect"
            })
            .catch((err) => {
                return
            })
        }
    }

    else if(member.id == "691727350051635262" && member2.id == "826841451945787412" && member3.id == "251778379211210755"){
        embed
        .setColor("#9BDBF5")
        .setTitle("speedychocdelta dialect")
        .addField("`e`\n—————", "<@691727350051635262> x <@826841451945787412> x <@251778379211210755>")
    }

    else {
        return await interaction.editReply({
            content: "The user combination you input doesn't match any dialect"
        })
    }

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}

// else if(member.id == "691727350051635262" && member2.id == "826841451945787412" && member3.id == "251778379211210755" || member.id == "826841451945787412" && member2.id == "691727350051635262" && member3.id == "251778379211210755" || member.id == "826841451945787412" && member2.id == "691727350051635262" && member3.id == "251778379211210755" || member.id == "826841451945787412" && member2.id == "251778379211210755" && member3.id == "691727350051635262" || member.id == "")