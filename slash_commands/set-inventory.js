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
    .setName("wife")
    .setDescription("wife")
    .setRequired(true)
)
.addBooleanOption(option => option
    .setName("bailbonds")
    .setDescription("bail bonds")
    .setRequired(true)
)

module.exports.run = async ({client, interaction, Economy}) => {
    if(interaction.member.id == "527285622809952256" || interaction.member.id == "842775855632744478"){
        const member = interaction.options.getMember("user")
        const newdebitcard = interaction.options.getBoolean("debitcard")
        const newmotorcycle = interaction.options.getBoolean("motorcycle")
        const newsuperbike = interaction.options.getBoolean("superbike")
        const newwife = interaction.options.getBoolean("wife")
        const newbailbonds = interaction.options.getBoolean("bailbonds")
    
        let getUser = await Economy.findOne({where: {id: member.id}})
    
        if(!getUser){
            getUser = await Economy.create({id: member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
        }
    
        await Economy.update({debitcard: newdebitcard, motorcycle: newmotorcycle, superbike: newsuperbike, wife: newwife, bailbonds: newbailbonds}, {where: {id: member.id}})
    
        let inv

        if(newdebitcard == false && newmotorcycle == false && newsuperbike == false && newwife == false && newbailbonds == false){
            inv = `Nothing but empty in here`
        }
    
        else if(newdebitcard == true && newmotorcycle == true && newsuperbike == true && newwife == true && newbailbonds == true){
            inv = `**debit card**, **motorcycle**, **superbike**, **wife**, **bail bonds**`
        }
    
        else if(newdebitcard == true && newmotorcycle == false && newsuperbike == false && newwife == false && newbailbonds == false){
            inv = `**debit card**`
        }
    
        else if(newdebitcard == false && newmotorcycle == true && newsuperbike == false && newwife == false && newbailbonds == false){
            inv = `**motorcycle**`
        }
    
        else if(newdebitcard == false && newmotorcycle == false && newsuperbike == true && newwife == false && newbailbonds == false){
            inv = `**superbike**`
        }
    
        else if(newdebitcard == false && newmotorcycle == false && newsuperbike == false && newwife == true && newbailbonds == false){
            inv = `**wife**`
        }
    
        else if(newdebitcard == false && newmotorcycle == false && newsuperbike == false && newwife == false && newbailbonds == true){
            inv = `**bail bonds**`
        }
    
        else if(newdebitcard == true && newmotorcycle == true && newsuperbike == false && newwife == false && newbailbonds == false){
            inv = `**debit card**, **motorcycle**`
        }
    
        else if(newdebitcard == true && newmotorcycle == false && newsuperbike == true && newwife == false && newbailbonds == false){
            inv = `**debit card**, **superbike**`
        }
    
        else if(newdebitcard == true && newmotorcycle == false && newsuperbike == false && newwife == true && newbailbonds == false){
            inv = `**debit card**, **wife**`
        }
    
        else if(newdebitcard == true && newmotorcycle == false && newsuperbike == false && newwife == false && newbailbonds == true){
            inv = `**debit card**, **bail bonds**`
        }
    
        else if(newdebitcard == false && newmotorcycle == true && newsuperbike == true && newwife == false && newbailbonds == false){
            inv = `**motorcycle**, **superbike**`
        }
    
        else if(newdebitcard == false && newmotorcycle == true && newsuperbike == false && newwife == true && newbailbonds == false){
            inv = `**motorcycle**, **wife**`
        }
    
        else if(newdebitcard == false && newmotorcycle == true && newsuperbike == false && newwife == false && newbailbonds == true){
            inv = `**motorcycle**, **bail bonds**`
        }
    
        else if(newdebitcard == false && newmotorcycle == false && newsuperbike == true && newwife == true && newbailbonds == false){
            inv = `**superbike**, **wife**`
        }
    
        else if(newdebitcard == false && newmotorcycle == false && newsuperbike == true && newwife == false && newbailbonds == true){
            inv = `**superbike**, **bail bonds**`
        }
    
        else if(newdebitcard == false && newmotorcycle == false && newsuperbike == false && newwife == true && newbailbonds == true){
            inv = `**wife**, **bail bonds**`
        }
    
        else if(newdebitcard == false && newmotorcycle == false && newsuperbike == true && newwife == true && newbailbonds == true){
            inv = `**superbike**, **wife**, **bail bonds**`
        }
    
        else if(newdebitcard == false && newmotorcycle == true && newsuperbike == false && newwife == true && newbailbonds == true){
            inv = `**motorcycle**, **wife**, **bail bonds**`
        }
    
        else if(newdebitcard == false && newmotorcycle == true && newsuperbike == true && newwife == false && newbailbonds == true){
            inv = `**motorcycle**, **superbike**, **bail bonds**`
        }
    
        else if(newdebitcard == false && newmotorcycle == true && newsuperbike == true && newwife == true && newbailbonds == false){
            inv = `**motorcycle**, **superbike**, **wife**`
        }
    
        else if(newdebitcard == true && newmotorcycle == false && newsuperbike == false && newwife == true && newbailbonds == true){
            inv = `**debit card**, **wife**, **bail bonds**`
        }
    
        else if(newdebitcard == true && newmotorcycle == false && newsuperbike == true && newwife == false && newbailbonds == true){
            inv = `**debit card**, **superbike**, **bail bonds**`
        }
    
        else if(newdebitcard == true && newmotorcycle == false && newsuperbike == true && newwife == true && newbailbonds == false){
            inv = `**debit card**, **superbike**, **wife**`
        }
    
        else if(newdebitcard == true && newmotorcycle == true && newsuperbike == false && newwife == false && newbailbonds == true){
            inv = `**debit card**, **motorcycle**, **bail bonds**`
        }
    
        else if(newdebitcard == true && newmotorcycle == true && newsuperbike == false && newwife == true && newbailbonds == false){
            inv = `**debit card**, **motorcycle**, **wife**`
        }
    
        else if(newdebitcard == true && newmotorcycle == true && newsuperbike == true && newwife == false && newbailbonds == false){
            inv = `**debit card**, **motorcycle**, **superbike**`
        }
    
        else if(newdebitcard == true && newmotorcycle == true && newsuperbike == true && newwife == true && newbailbonds == false){
            inv = `**debit card**, **motorcycle**, **superbike**, **wife**`
        }
    
        else if(newdebitcard == true && newmotorcycle == true && newsuperbike == true && newwife == false && newbailbonds == true){
            inv = `**debit card**, **motorcycle**, **superbike**, **bail bonds**`
        }
    
        else if(newdebitcard == true && newmotorcycle == true && newsuperbike == false && newwife == true && newbailbonds == true){
            inv = `**debit card**, **motorcycle**, **wife**, **bail bonds**`
        }
    
        else if(newdebitcard == true && newmotorcycle == false && newsuperbike == true && newwife == true && newbailbonds == true){
            inv = `**debit card**, **superbike**, **wife**, **bail bonds**`
        }
    
        else if(newdebitcard == false && newmotorcycle == true && newsuperbike == true && newwife == true && newbailbonds == true){
            inv = `**motorcycle**, **superbike**, **wife**, **bail bonds**`
        }

        const embed = new MessageEmbed()
        .setTitle("📦 New Inventory Set ✔️")
        .setDescription(`**${member.displayName}**'s inventory has been set to:\n${inv}`)
        .setColor("GREEN")
        .setThumbnail(member.user.avatarURL())
    
        await interaction.editReply({
            embeds: [embed]
        })
        .catch((err) => {
            return
        })
    }
    else {
        await interaction.editReply({
            content: "only mezmer420 and vcashy can use that command!"
        })
        .catch((err) => {
            return
        })
    }
}