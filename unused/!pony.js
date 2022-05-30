module.exports = {
    name: "!pony",
    description: "random pony picker",
    execute(message, RandArray){
        if(message.author.bot) return
        if(message.channel.id == "939674946953682976" || message.channel.id == "939686071241949205" || message.channel.id == "945527434655187006"){

                             // [Twilight Spa, Rainbow Dash, Applejack,    Fluttershy,   Rarity,       Pinkie Pie,   Pri Celestia, Princes Luna, Prin Cadance, Starli Glimm, Sweetie Bell, Scootaloo,    Apple Bloom,  Shinin Armor, Derpy Hooves, Big Macintos, Trixie]

            const ponynumbers = ["36npkmoyrc", "msdtvqui89", "is27nqkyg2", "8dfu6y81mv", "fy26jqtgzj", "tqmxzxrago", "c2ollwexuv", "7f7sgq1mns", "6dzzpwna1y", "wny46ophv1", "ffidne31o1", "386posrjln", "kj7b6fh5ys", "6scg2paick", "7oyqm7mry0", "3tgdyy4wgm", "mxts4ps87c"]
            const randompony = RandArray(ponynumbers)

            message.channel.send(randompony)
        }
        else {
            message.reply(`you can only use that command in ${message.guild.channels.cache.get("939674946953682976").toString()} (restricted use) and ${message.guild.channels.cache.get("939686071241949205").toString()} and ${message.guild.channels.cache.get("945527434655187006").toString()}! (these messages will autodelete)`)
            .then(msg => {
                setTimeout(() => message.delete(), 6000)
                setTimeout(() => msg.delete(), 6000)
              })
              .catch()
        }
    }
}