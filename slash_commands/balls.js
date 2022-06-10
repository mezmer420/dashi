const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

function RandArray(array){
    var rand = Math.random()*array.length | 0
    var rValue = array[rand]
    return rValue
}

module.exports.data = new SlashCommandBuilder()
.setName("balls")
.setDescription("Gives a random ball")

module.exports.run = async ({client, interaction, Waifus}) => {
    const balls = ["Basketball", "Football", "Baseball", "Golf Ball"]
    const randomball = RandArray(balls)

    let embed = new MessageEmbed()

    if(randomball == "Basketball"){
        embed
        .setColor("RANDOM")
        .setTitle("Basketball")
        .setDescription("shoot hoops")
        .setImage("https://artwork.espncdn.com/categories/cd70a58e-a830-330c-93ed-52360b51b632/1x1Feature/1440_201903062023.jpg")
    }

    else if(randomball == "Football"){
        embed
        .setColor("RANDOM")
        .setTitle("Football")
        .setDescription("throw it even though called football")
        .setImage("https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/utepathletics.com/images/2021/6/24/DSC04844.jpg")
    }

    else if(randomball == "Baseball"){
        embed
        .setColor("RANDOM")
        .setTitle("Baseball")
        .setDescription("hit with stick or something")
        .setImage("https://i.kym-cdn.com/entries/icons/original/000/018/603/Baseball_(crop).jpg")
    }

    else if(randomball == "Golf Ball"){
        embed
        .setColor("RANDOM")
        .setTitle("Golf Ball")
        .setDescription("swing at it to try to get in hole")
        .setImage("https://ncg-live-assets.ams3.cdn.digitaloceanspaces.com/uploads/2021/02/1-Ball-in-Golf-1.jpg")
    }

    const sentInteraction =
    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })

    sentInteraction.react("❤️")
    .catch((err) => {
        return
    })

    const filter = (reaction, user) => {
        return reaction.emoji.name == "❤️" && user.id == interaction.member.id
    }

    const collector = sentInteraction.createReactionCollector({
        filter,
        max: 1,
        time: 20000
    })

    collector.on("collect", async (reaction) => {
        let getUser = await Waifus.findOne({where: {id: interaction.member.id}})
        if(!getUser){
            getUser = await Waifus.create({id: interaction.member.id, haswaifu: false})
        }

        if(getUser.haswaifu == false){
            await Waifus.update({waifu: randomball, haswaifu: true}, {where: {id: interaction.member.id}})

            interaction.editReply({ 
                content: `Aww, your new waifu is **${randomball}**!`
            })
            .catch((err) => {
                return
            })
        }

        else if(getUser.haswaifu == true){
            // const existingwaifu = await Waifus.findOne({where: {id: interaction.member.id}})

            interaction.editReply({ 
                content: `You already have a waifu! Use `+"`/breakup`"+" to break up with your current waifu"
            })
            .catch((err) => {
                return
            })
        }
        // console.log(`${interaction.member.username} collected a new ${reaction.emoji.name} reaction`)
    })

    collector.on("end", (collected, reason) => {
        return
        // if(reason == "limit") return console.log("limit reached")
        // else {
        //     console.log("time expired")
        // }
    })
}