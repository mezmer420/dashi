const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("embed")
.setDescription("Create and have me send an embed (recommended to copy entire thing before sending)")
.addChannelOption(option => option
    .setName("channel")
    .setDescription("Channel to send the embed to")
    .setRequired(true)
)
.addStringOption(option => option
    .setName("description")
    .setDescription("Description, char lim: 4096; required")
    .setRequired(true)
)
.addStringOption(option => option
    .setName("color")
    .setDescription(`Strip color—hex code (including the #), a predefined color, "default" for dashi's cyan, or "random"`)
    .setRequired(false)
)
.addStringOption(option => option
    .setName("title")
    .setDescription("Title, char lim: 256")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("authorname")
    .setDescription("Name of author, char lim: 256")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("authoriconurl")
    .setDescription('URL for author icon, can be "dashi"; authorname MUST be included')
    .setRequired(false)
)
.addStringOption(option => option
    .setName("authorurl")
    .setDescription("Redirect URL for author; authorname MUST be included")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("thumbnailurl")
    .setDescription("URL for thumbnail")
    .setRequired(false)
)

.addStringOption(option => option
    .setName("field1name-split-field1value")
    .setDescription('Name, value of field 1, char lims: 256, 1024; split with "-split-"')
    .setRequired(false)
)
.addStringOption(option => option
    .setName("field1inline")
    .setDescription("Skip to set inline false; field1name-split-field1value MUST be included")
    .addChoices(
        {name: "Yes", value: "Yes"}
    )
)
.addStringOption(option => option
    .setName("field2name-split-field2value")
    .setDescription('Name, value of field 2, char lims: 256, 1024; split with "-split-"')
    .setRequired(false)
)
.addStringOption(option => option
    .setName("field2inline")
    .setDescription("Skip to set inline false; field2name-split-field2value MUST be included")
    .addChoices(
        {name: "Yes", value: "Yes"}
    )
)
.addStringOption(option => option
    .setName("field3name-split-field3value")
    .setDescription('Name, value of field 3, char lims: 256, 1024; split with "-split-"')
    .setRequired(false)
)
.addStringOption(option => option
    .setName("field3inline")
    .setDescription("Skip to set inline false; field3name-split-field3value MUST be included")
    .addChoices(
        {name: "Yes", value: "Yes"}
    )
)
.addStringOption(option => option
    .setName("field4name-split-field4value")
    .setDescription('Name, value of field 4, char lims: 256, 1024; split with "-split-"')
    .setRequired(false)
)
.addStringOption(option => option
    .setName("field4inline")
    .setDescription("Skip to set inline false; field4name-split-field4value MUST be included")
    .addChoices(
        {name: "Yes", value: "Yes"}
    )
)
.addStringOption(option => option
    .setName("field5name-split-field5value")
    .setDescription('Name, value of field 5, char lims: 256, 1024; split with "-split-"')
    .setRequired(false)
)
.addStringOption(option => option
    .setName("field5inline")
    .setDescription("Skip to set inline false; field5name-split-field5value MUST be included")
    .addChoices(
        {name: "Yes", value: "Yes"}
    )
)
.addStringOption(option => option
    .setName("field6name-split-field6value")
    .setDescription('Name, value of field 6, char lims: 256, 1024; split with "-split-"')
    .setRequired(false)
)
.addStringOption(option => option
    .setName("field6inline")
    .setDescription("Skip to set inline false; field6name-split-field6value MUST be included")
    .addChoices(
        {name: "Yes", value: "Yes"}
    )
)

.addStringOption(option => option
    .setName("imageurl")
    .setDescription("URL for image")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("timestamp")
    .setDescription("Skip to not include")
    .addChoices(
        {name: "Yes", value: "Yes"}
    )
)
.addStringOption(option => option
    .setName("footertext")
    .setDescription("Footer text, char lim: 2048; required to use footericonurl")
    .setRequired(false)
)
.addStringOption(option => option
    .setName("footericonurl")
    .setDescription("URL for footer icon; footertext MUST be included")
    .setRequired(false)
)
    

module.exports.run = async ({client, interaction}) => {
    const targetchannel = interaction.options.getChannel("channel")
    const colorinput = interaction.options.getString("color")
    const title = interaction.options.getString("title")
    const description = interaction.options.getString("description")
    const authorname = interaction.options.getString("authorname")
    const authoriconurl = interaction.options.getString("authoriconurl")
    const authorurl = interaction.options.getString("authorurl")
    const thumbnailurl = interaction.options.getString("thumbnailurl")

    const field1namefield1value = interaction.options.getString("field1name-split-field1value")
    const field1inline = interaction.options.getString("field1inline")
    const field2namefield2value = interaction.options.getString("field2name-split-field2value")
    const field2inline = interaction.options.getString("field2inline")
    const field3namefield3value = interaction.options.getString("field3name-split-field3value")
    const field3inline = interaction.options.getString("field3inline")
    const field4namefield4value = interaction.options.getString("field4name-split-field4value")
    const field4inline = interaction.options.getString("field4inline")
    const field5namefield5value = interaction.options.getString("field5name-split-field5value")
    const field5inline = interaction.options.getString("field5inline")
    const field6namefield6value = interaction.options.getString("field6name-split-field6value")
    const field6inline = interaction.options.getString("field6inline")
    // const field7namefield7value = interaction.options.getString("field7name-split-field7value")
    // const field7inline = interaction.options.getString("field7inline")

    const imageurl = interaction.options.getString("imageurl")
    const timestamp = interaction.options.getString("timestamp")
    const footertext = interaction.options.getString("footertext")
    const footericonurl = interaction.options.getString("footericonurl")

    let Embed = new MessageEmbed()

    try {
        Embed.setDescription(description)
    } catch (err) {
        return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
    }

    if(colorinput){
        const color = colorinput.toUpperCase()
        if(color == "DEFAULT"){
            try {
                Embed.setColor("#9BDBF5")
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }

        else if(color !== "DEFAULT"){
            try {
                Embed.setColor(color)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }
    }

    if(title){
        try {
            Embed.setTitle(title)
        } catch (err) {
            return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
        }
    }

    if(authorname){
        if(!authoriconurl && !authorurl){
            try {
                Embed.setAuthor({name: authorname})
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }

        else if(authoriconurl && authorurl){
            if(authoriconurl.toLowerCase() == "dashi"){
                const dashi = await client.users.fetch("956345939130482750")
                try {
                    Embed.setAuthor({name: authorname, iconURL: dashi.displayAvatarURL(), url: authorurl})
                } catch (err) {
                    return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
                }
            }

            else if(authoriconurl.toLowerCase() !== "dashi"){
                try {
                    Embed.setAuthor({name: authorname, iconURL: authoriconurl, url: authorurl})
                } catch (err) {
                    return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
                }
            }
        }
    
        else if(authoriconurl && !authorurl){
            if(authoriconurl.toLowerCase() == "dashi"){
                const dashi = await client.users.fetch("956345939130482750")
                try {
                    Embed.setAuthor({name: authorname, iconURL: dashi.displayAvatarURL()})
                } catch (err) {
                    return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
                }
            }

            else if(authoriconurl.toLowerCase() !== "dashi"){
                try {
                    Embed.setAuthor({name: authorname, iconURL: authoriconurl})
                } catch (err) {
                    return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
                }
            }
        }

        else if(!authoriconurl && authorurl){
            try {
                Embed.setAuthor({name: authorname, url: authorurl})
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }
    }

    if(thumbnailurl){
        try {
            Embed.setThumbnail(thumbnailurl)
        } catch (err) {
            return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
        }
    }

    if(field1namefield1value){
        const [field1name, field1value] = field1namefield1value.split("-split-")
        if(field1inline){
            try {
                Embed.addField(field1name, field1value, true)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        } else if(!field1inline){
            try {
                Embed.addField(field1name, field1value, false)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }
    }
    if(field2namefield2value){
        const [field2name, field2value] = field2namefield2value.split("-split-")
        if(field2inline){
            try {
                Embed.addField(field2name, field2value, true)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        } else if(!field2inline){
            try {
                Embed.addField(field2name, field2value, false)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }
    }
    if(field3namefield3value){
        const [field3name, field3value] = field3namefield3value.split("-split-")
        if(field3inline){
            try {
                Embed.addField(field3name, field3value, true)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        } else if(!field3inline){
            try {
                Embed.addField(field3name, field3value, false)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }
    }
    if(field4namefield4value){
        const [field4name, field4value] = field4namefield4value.split("-split-")
        if(field4inline){
            try {
                Embed.addField(field4name, field4value, true)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        } else if(!field4inline){
            try {
                Embed.addField(field4name, field4value, false)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }
    }
    if(field5namefield5value){
        const [field5name, field5value] = field5namefield5value.split("-split-")
        if(field5inline){
            try {
                Embed.addField(field5name, field5value, true)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        } else if(!field5inline){
            try {
                Embed.addField(field5name, field5value, false)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }
    }
    if(field6namefield6value){
        const [field6name, field6value] = field6namefield6value.split("-split-")
        if(field6inline){
            try {
                Embed.addField(field6name, field6value, true)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        } else if(!field6inline){
            try {
                Embed.addField(field6name, field6value, false)
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }
    }

    if(imageurl){
        try {
            Embed.setImage(imageurl)
        } catch (err) {
            return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
        }
    }

    if(timestamp){
        Embed.setTimestamp()
    }

    if(footertext){
        if(!footericonurl){
            try {
                Embed.setFooter({
                    text: footertext
                })
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }

        else if(footericonurl){
            try {
                Embed.setFooter({
                    text: footertext,
                    iconURL: footericonurl
                })
            } catch (err) {
                return console.log(`${interaction.member.user.username}'s embed failed: ${err}`)
            }
        }
    }

    if(targetchannel !== interaction.channel){
        await interaction.editReply({
            content: `Sent the embed to <#${targetchannel.id}>`
        })
        .catch((err) => {
            return
        })

        return await targetchannel.send({
            embeds: [Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(targetchannel == interaction.channel){
        await interaction.deleteReply()
        .catch((err) => {
            return
        })

        return await targetchannel.send({
            embeds: [Embed]
        })
        .catch((err) => {
            return
        })
    }
}