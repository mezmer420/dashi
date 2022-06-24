const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("set-inventory")
.setDescription("Set a user's inventory")
.addUserOption(option => option
    .setName("user")
    .setDescription("The user to set the inventory of")
    .setRequired(true)
)
.addBooleanOption(option => option
    .setName("debitcard")
    .setDescription("debit card")
    .setRequired(true)
)
.addBooleanOption(option => option
    .setName("motorcycle")
    .setDescription("motorcycle")
    .setRequired(true)
)
.addBooleanOption(option => option
    .setName("superbike")
    .setDescription("superbike")
    .setRequired(true)
)
.addBooleanOption(option => option
    .setName("hammer")
    .setDescription("hammer")
    .setRequired(true)
)
.addBooleanOption(option => option
    .setName("sickle")
    .setDescription("sickle")
    .setRequired(true)
)
.addBooleanOption(option => option
    .setName("wife")
    .setDescription("wife")
    .setRequired(true)
)
.addBooleanOption(option => option
    .setName("bailbonds")
    .setDescription("bail bonds")
    .setRequired(true)
)

module.exports.run = async ({client, interaction, Economy, Items}) => {
    const member = interaction.options.getMember("user")

    const newdebitcard = interaction.options.getBoolean("debitcard")
    const newmotorcycle = interaction.options.getBoolean("motorcycle")
    const newsuperbike = interaction.options.getBoolean("superbike")
    const newhammer = interaction.options.getBoolean("hammer")
    const newsickle = interaction.options.getBoolean("sickle")
    const newwife = interaction.options.getBoolean("wife")
    const newbailbonds = interaction.options.getBoolean("bailbonds")

    const findDebitcard = await Items.findOne({where: {memberid: member.id, item: "1"}})
    const findMotorcycle = await Items.findOne({where: {memberid: member.id, item: "2"}})
    const findSuperbike = await Items.findOne({where: {memberid: member.id, item: "3"}})
    const findHammer = await Items.findOne({where: {memberid: member.id, item: "4"}})
    const findSickle = await Items.findOne({where: {memberid: member.id, item: "5"}})
    const findWife = await Items.findOne({where: {memberid: member.id, item: "6"}})
    const findBailbonds = await Items.findOne({where: {memberid: member.id, item: "7"}})

    if(newdebitcard == true){
        if(!findDebitcard){
            await Items.create({memberid: member.id, item: "1"})
        }
    } else if(newdebitcard == false){
        if(findDebitcard){
            await Items.destroy({where: {memberid: member.id, item: "1"}})
        }
    }

    if(newmotorcycle == true){
        if(!findMotorcycle){
            await Items.create({memberid: member.id, item: "2"})
        }
    } else if(newmotorcycle == false){
        if(findMotorcycle){
            await Items.destroy({where: {memberid: member.id, item: "2"}})
        }
    }

    if(newsuperbike == true){
        if(!findSuperbike){
            await Items.create({memberid: member.id, item: "3"})
        }
    } else if(newsuperbike == false){
        if(findSuperbike){
            await Items.destroy({where: {memberid: member.id, item: "3"}})
        }
    }

    if(newhammer == true){
        if(!findHammer){
            await Items.create({memberid: member.id, item: "4"})
        }
    } else if(newhammer == false){
        if(findHammer){
            await Items.destroy({where: {memberid: member.id, item: "4"}})
        }
    }

    if(newsickle == true){
        if(!findSickle){
            await Items.create({memberid: member.id, item: "5"})
        }
    } else if(newsickle == false){
        if(findSickle){
            await Items.destroy({where: {memberid: member.id, item: "5"}})
        }
    }

    if(newwife == true){
        if(!findWife){
            await Items.create({memberid: member.id, item: "6"})
        }
    } else if(newwife == false){
        if(findWife){
            await Items.destroy({where: {memberid: member.id, item: "6"}})
        }
    }

    if(newbailbonds == true){
        if(!findBailbonds){
            await Items.create({memberid: member.id, item: "7"})
        }
    } else if(newbailbonds == false){
        if(findBailbonds){
            await Items.destroy({where: {memberid: member.id, item: "7"}})
        }
    }

    const embed = new MessageEmbed()
    .setTitle("📦 New Inventory Set ✔️")
    .setDescription(`**${member.displayName}**'s inventory has been set`)
    .setColor("GREEN")
    .setThumbnail(member.user.avatarURL())

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}