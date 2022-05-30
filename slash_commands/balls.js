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
    let balls = ["Basketball", "Football", "Baseball", "Golf Ball", "Osteoporosis", "Cattywampus", "Laboratory"]
    let randomball = RandArray(balls)

    if(randomball == "Basketball"){
        const Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Basketball")
        .setDescription("shoot hoops")
        .setImage("https://artwork.espncdn.com/categories/cd70a58e-a830-330c-93ed-52360b51b632/1x1Feature/1440_201903062023.jpg")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(randomball == "Football"){
        const Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Football")
        .setDescription("throw it even though called football")
        .setImage("https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/utepathletics.com/images/2021/6/24/DSC04844.jpg")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(randomball == "Baseball"){
        const Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Baseball")
        .setDescription("hit with stick or something")
        .setImage("https://i.kym-cdn.com/entries/icons/original/000/018/603/Baseball_(crop).jpg")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(randomball == "Golf Ball"){
        const Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Golf Ball")
        .setDescription("swing at it to try to get in hole")
        .setImage("https://golf.com/wp-content/uploads/2021/01/CallawayChromeSoftX20JonRahm.jpg")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(randomball == "Osteoporosis"){
        const Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Osteoporosis")
        .setDescription("causes bones to become weak and brittle")
        .setImage("https://images.ctfassets.net/oc83wx5cwffk/spu_wysiwyg_fid30500_asset/fc9271c49c72f449d3e83ed921212473/osteoporosis13819011_M.jpg")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(randomball == "Cattywampus"){
        const Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Cattywampus")
        .setDescription("a variant of catawampus, another example of grand 19th century American slang")
        .setImage("https://uselessetymology.files.wordpress.com/2017/12/cattywampus.png")
        return interaction.editReply({
            embeds: [Embed]
        })
    }

    else if(randomball == "Laboratory"){
        const Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Laboratory")
        .setDescription("a room or building equipped for scientific experiments, research, or teaching, or for the manufacture of drugs or chemicals")
        .setImage("https://www.news-medical.net/images/Article_Images/ImageForArticle_22064_16436342404173431.jpg")
        return interaction.editReply({
            embeds: [Embed]
        })
    }
}