const paginationEmbed = require("discordjs-button-pagination")
const {MessageButton, MessageEmbed} = require("discord.js")

module.exports = {
    name: "!dialects",
    description: "sends interactive dialect embed",
    execute(message, Discord){
        const BotInfo = new Discord.MessageEmbed()
            .setColor("#9BDBF5")
            .setTitle("Dialect Information")
            .addField("**About**", "Every Eoician has a unique dialect. <@527285622809952256> pays careful attention to what you say and regularly updates my dialect database.")
            .addField("**Pages**", "`1. Dialect Information\n\n2. vcash dialect\n\n3. mezmer dialect\n\n4. choc dialect\n\n5. speedychoc dialect\n\n6. speedy dialect uwu owu uwo ow- -w- -wu uWu\n\n7. delta airlines dialect`")

            const vcashdialect = new Discord.MessageEmbed()
            .setColor("#FFA500")
            .setTitle("vcash dialect")
            .addField("`toyota\n\ntoyot\n\npeeL\n\nballsL\n\nkL\n\nxt\n\nyyes`\n—————", "<@762133129209053244>")

            const mezmerdialect = new Discord.MessageEmbed()
            .setColor("#0096FF")
            .setTitle("mezmer dialect")
            .addField("`obsessed\n\nidecay\n\nifusaiso\n\nwowzer\n\nwowzr\n\nwowzerooni\n\nwowzeroni\n\nomegaL\n\nhmok`\n—————", "<@527285622809952256>")

            const chocdialect = new Discord.MessageEmbed()
            .setColor("#9BDBF5")
            .setTitle("choc dialect")
            .addField("`yss\n\nys\n\nifusaso\n\nperty`\n—————", "<@826841451945787412>")

            const speedychocdialect = new Discord.MessageEmbed()
            .setColor("#9BDBF5")
            .setTitle("speedychoc dialect")
            .addField("`e`\n—————", "<@691727350051635262> x <@826841451945787412> ")

            const speedydialect = new Discord.MessageEmbed()
            .setColor("PURPLE")
            .setTitle("speedy dialect uwu owu uwo ow- -w- -wu uWu")
            .addField("`ues\n\ngf\n\nemoyi`\n—————", "<@691727350051635262>")

            const deltadialect = new Discord.MessageEmbed()
            .setColor("#9BDBF5")
            .setTitle("delta airlines dialect")
            .addField("`yees\n\nyews\n\nyeees\n\nyeeees\n\nshut\n\nmegaL\n\nbigL\n\nbihL\n\nmediumL\n\ntinyL\n\ncockL\n\nr\n\nifusayso`\n—————", "<@251778379211210755>")

        const button1 = new MessageButton()
                .setCustomId("previousbtn")
                .setLabel("⏪ Previous Page")
                .setStyle("PRIMARY")

        const button2 = new MessageButton()
                .setCustomId("nextbtn")
                .setLabel("Next Page ⏩")
                .setStyle("PRIMARY")

        const pages = [BotInfo, vcashdialect, mezmerdialect, chocdialect, speedychocdialect, speedydialect, deltadialect]

        const buttonList = [button1, button2]

        const timeout = 30000

        // Call the paginationEmbed method, first three arguments are required
        // timeout is the time till the reaction collectors are active, after this you can't change pages (in ms), defaults to 120000
        paginationEmbed(message, pages, buttonList, timeout)
    }
}