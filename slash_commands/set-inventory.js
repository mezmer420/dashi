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

    const findDebitcard = await Items.findOne({where: {memberid: member.id, item: "Debit Card"}})
    const findMotorcycle = await Items.findOne({where: {memberid: member.id, item: "Motorcycle"}})
    const findSuperbike = await Items.findOne({where: {memberid: member.id, item: "Superbike"}})
    const findHammer = await Items.findOne({where: {memberid: member.id, item: "Hammer"}})
    const findSickle = await Items.findOne({where: {memberid: member.id, item: "Sickle"}})
    const findWife = await Items.findOne({where: {memberid: member.id, item: "Wife"}})
    const findBailbonds = await Items.findOne({where: {memberid: member.id, item: "Bail Bonds"}})

    if(newdebitcard == true){
        if(!findDebitcard){
            await Items.create({memberid: member.id, itemid: "1", item: "Debit Card"})
        }
    } else if(newdebitcard == false){
        if(findDebitcard){
            await Items.destroy({where: {memberid: member.id, item: "Debit Card"}})
        }
    }

    if(newmotorcycle == true){
        if(!findMotorcycle){
            await Items.create({memberid: member.id, itemid: "2", item: "Motorcycle"})
        }
    } else if(newmotorcycle == false){
        if(findMotorcycle){
            await Items.destroy({where: {memberid: member.id, item: "Motorcycle"}})
        }
    }

    if(newsuperbike == true){
        if(!findSuperbike){
            await Items.create({memberid: member.id, itemid: "3", item: "Superbike"})
        }
    } else if(newsuperbike == false){
        if(findSuperbike){
            await Items.destroy({where: {memberid: member.id, item: "Superbike"}})
        }
    }

    if(newhammer == true){
        if(!findHammer){
            await Items.create({memberid: member.id, itemid: "4", item: "Hammer"})
        }
    } else if(newhammer == false){
        if(findHammer){
            await Items.destroy({where: {memberid: member.id, item: "Hammer"}})
        }
    }

    if(newsickle == true){
        if(!findSickle){
            await Items.create({memberid: member.id, itemid: "5", item: "Sickle"})
        }
    } else if(newsickle == false){
        if(findSickle){
            await Items.destroy({where: {memberid: member.id, item: "Sickle"}})
        }
    }

    if(newwife == true){
        if(!findWife){
            await Items.create({memberid: member.id, itemid: "6", item: "Wife"})
        }
    } else if(newwife == false){
        if(findWife){
            await Items.destroy({where: {memberid: member.id, item: "Wife"}})
        }
    }

    if(newbailbonds == true){
        if(!findBailbonds){
            await Items.create({memberid: member.id, itemid: "7", item: "Bail Bonds"})
        }
    } else if(newbailbonds == false){
        if(findBailbonds){
            await Items.destroy({where: {memberid: member.id, item: "Bail Bonds"}})
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