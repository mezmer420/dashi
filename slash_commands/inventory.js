const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("inventory")
.setDescription("View the inventory of yourself or another user; leave blank to view your own inventory")
.addUserOption(option =>
    option.setName("user")
    .setRequired(false)
    .setDescription("User to check the balance of"))

module.exports.run = async (client, interaction, options, Economy) => {
    let member = options.getMember("user") || interaction.member
    let getUser = await Economy.findOne({where: {id: member.id}})
    if(!getUser) {
        getUser = await Economy.create({id: member.id, wallet: 0, bank: 0, debitcard: false, motorcycle: false, superbike: false, wife: false, bailbonds: false})
    }

    if(getUser.debitcard == false && getUser.motorcycle == false && getUser.superbike == false && getUser.wife == false && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`Nothing but empty in here`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == true && getUser.superbike == true && getUser.wife == true && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **motorcycle**, **superbike**, **wife**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == false && getUser.superbike == false && getUser.wife == false && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == true && getUser.superbike == false && getUser.wife == false && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**motorcycle**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == false && getUser.superbike == true && getUser.wife == false && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**superbike**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == false && getUser.superbike == false && getUser.wife == true && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**wife**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == false && getUser.superbike == false && getUser.wife == false && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**bail boonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == true && getUser.superbike == false && getUser.wife == false && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **motorcycle**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == false && getUser.superbike == true && getUser.wife == false && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **superbike**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == false && getUser.superbike == false && getUser.wife == true && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **wife**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == false && getUser.superbike == false && getUser.wife == false && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == true && getUser.superbike == true && getUser.wife == false && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**motorcycle**, **superbike**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == true && getUser.superbike == false && getUser.wife == true && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**motorcycle**, **wife**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == true && getUser.superbike == false && getUser.wife == false && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**motorcycle**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == false && getUser.superbike == true && getUser.wife == true && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**superbike**, **wife**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == false && getUser.superbike == true && getUser.wife == false && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**superbike**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == false && getUser.superbike == false && getUser.wife == true && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**wife**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == false && getUser.superbike == true && getUser.wife == true && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**superbike**, **wife**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == true && getUser.superbike == false && getUser.wife == true && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**motorcycle**, **wife**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == true && getUser.superbike == true && getUser.wife == false && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**motorcycle**, **superbike**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == true && getUser.superbike == true && getUser.wife == true && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**motorcycle**, **superbike**, **wife**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == false && getUser.superbike == false && getUser.wife == true && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **wife**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == false && getUser.superbike == true && getUser.wife == false && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **superbike**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == false && getUser.superbike == true && getUser.wife == true && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **superbike**, **wife**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == true && getUser.superbike == false && getUser.wife == false && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **motorcycle**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == true && getUser.superbike == false && getUser.wife == true && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **motorcycle**, **wife**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == true && getUser.superbike == true && getUser.wife == false && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **motorcycle**, **superbike**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == true && getUser.superbike == true && getUser.wife == true && getUser.bailbonds == false){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **motorcycle**, **superbike**, **wife**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == true && getUser.superbike == true && getUser.wife == false && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **motorcycle**, **superbike**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == true && getUser.superbike == false && getUser.wife == true && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **motorcycle**, **wife**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == true && getUser.motorcycle == false && getUser.superbike == true && getUser.wife == true && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**debit card**, **superbike**, **wife**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }

    else if(getUser.debitcard == false && getUser.motorcycle == true && getUser.superbike == true && getUser.wife == true && getUser.bailbonds == true){
        const embed = new MessageEmbed()
        .setTitle(`${member.displayName}'s Inventory`)
        .setDescription(`**motorcycle**, **superbike**, **wife**, **bail bonds**`)
        .setColor("#9BDBF5")
        .setThumbnail(member.user.avatarURL())
    
        return interaction.editReply({
            embeds: [embed]
        })
    }
}