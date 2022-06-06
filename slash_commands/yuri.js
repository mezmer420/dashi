const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

function RandArray(array){
    var rand = Math.random()*array.length | 0
    var rValue = array[rand]
    return rValue
}

module.exports.data = new SlashCommandBuilder()
.setName("yuri")
.setDescription("Gives a random Yuri!")

module.exports.run = async (client, interaction) => {
    const yuris = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
    const randomyuri = RandArray(yuris)

    if(randomyuri == "1"){
        const yuri1Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://i.pinimg.com/originals/f1/57/56/f157565faa42f556df9baa2b1063bde9.jpg")
        await interaction.editReply({
            embeds: [yuri1Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "2"){
        const yuri2Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9f1a633b-231d-4b77-9c14-5ce67d4f0917/dby7b7r-32eeabbd-0bb3-4c82-8790-89258f5e31f6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlmMWE2MzNiLTIzMWQtNGI3Ny05YzE0LTVjZTY3ZDRmMDkxN1wvZGJ5N2I3ci0zMmVlYWJiZC0wYmIzLTRjODItODc5MC04OTI1OGY1ZTMxZjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2EwAYyQ9l_06CzOTGD3EVlxok7AKpW9NLroKsPo_z_I")
        await interaction.editReply({
            embeds: [yuri2Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "3"){
        const yuri3Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://64.media.tumblr.com/cdbdd58ab338d108a74852a5c0ad4945/2610ac1947e38872-ed/s1280x1920/1d5cec054acb8275665b7e5b7db30b806236127b.jpg")
        await interaction.editReply({
            embeds: [yuri3Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "4"){
        const yuri4Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://www.kindpng.com/picc/m/325-3250080_yuri-cute-yuri-doki-doki-hd-png-download.png")
        await interaction.editReply({
            embeds: [yuri4Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "5"){
        const yuri5Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("http://pm1.narvii.com/7301/859efdbf1823f2a9c8f90a7e36b2c0f482f5672fr1-500-500v2_00.jpg")
        await interaction.editReply({
            embeds: [yuri5Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "6"){
        const yuri6Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://pbs.twimg.com/media/EQGnPoSWAAEnf2E.jpg:large")
        await interaction.editReply({
            embeds: [yuri6Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "7"){
        const yuri7Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://i.pinimg.com/originals/07/4c/73/074c73d545dc8039aa3049527f69875c.jpg")
        await interaction.editReply({
            embeds: [yuri7Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "8"){
        const yuri8Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://i.pinimg.com/originals/ca/dc/92/cadc92995ad6fa4592d72036518ca3d7.png")
        await interaction.editReply({
            embeds: [yuri8Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "9"){
        const yuri9Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://w0.peakpx.com/wallpaper/250/486/HD-wallpaper-video-game-doki-doki-literature-club-girl-purple-eyes-yuri-doki-doki-literature-club.jpg")
        await interaction.editReply({
            embeds: [yuri9Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "10"){
        const yuri10Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://i.pinimg.com/736x/1b/cd/6f/1bcd6f453c9a56150ec843b8032bc094.jpg")
        await interaction.editReply({
            embeds: [yuri10Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "11"){
        const yuri11Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://pbs.twimg.com/media/EzKz2a3VgAox0_j?format=jpg&name=4096x4096")
        await interaction.editReply({
            embeds: [yuri11Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "12"){
        const yuri12Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://pbs.twimg.com/media/E_b9pv4XIAYY5BG.jpg:large")
        await interaction.editReply({
            embeds: [yuri12Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "13"){
        const yuri13Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://sun9-3.userapi.com/s/v1/ig1/ya2hlCsURQmmpUy4R8o_Q3gA2Uou_tAlCsAYC7NOHueTZcmzm0ytL9I2It_fMEp5jjFiUf4o.jpg?size=430x604&quality=96&type=album")
        await interaction.editReply({
            embeds: [yuri13Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "14"){
        const yuri14Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://i.pinimg.com/originals/fb/75/cf/fb75cf65b60763c66283446c97324e8f.jpg")
        await interaction.editReply({
            embeds: [yuri14Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "15"){
        const yuri15Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://static.zerochan.net/Yuri.%28Doki.Doki.Literature.Club%21%29.full.3384849.png")
        await interaction.editReply({
            embeds: [yuri15Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "16"){
        const yuri16Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://www.seekpng.com/png/small/134-1347813_doki-doki-literature-club-yuri-ddlc-yuri.png")
        await interaction.editReply({
            embeds: [yuri16Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "17"){
        const yuri17Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://preview.redd.it/mc8x7j0cg2d71.jpg?auto=webp&s=4c3186b657d2b77b2be6284ebca546ede0c4295d")
        await interaction.editReply({
            embeds: [yuri17Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "18"){
        const yuri18Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://pbs.twimg.com/media/Eymj8oWXEAEn9hP?format=jpg&name=4096x4096")
        await interaction.editReply({
            embeds: [yuri18Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "19"){
        const yuri19Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://cdn140.picsart.com/271169818025211.png")
        await interaction.editReply({
            embeds: [yuri19Embed]
        })
        .catch((err) => {
            return
        })
    }

    else if(randomyuri == "20"){
        const yuri20Embed = new MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://pbs.twimg.com/media/E8u5LohVkAEgyuz?format=jpg&name=4096x4096")
        await interaction.editReply({
            embeds: [yuri20Embed]
        })
        .catch((err) => {
            return
        })
    }
}