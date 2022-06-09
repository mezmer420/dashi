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

module.exports.run = async (client, interaction) => {
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
        .setImage("https://golfblueheron.com/wp-content/uploads/2021/09/golf-balls8-1030x559.jpg")
    }

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}