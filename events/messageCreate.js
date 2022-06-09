// welc, cons, anno, vot, self, cour, semi, gove, logs, spec, imag, vide, argu, game, poli, role, funq, lear, fran, bots, hydr, vtts, mtts, ctts
// const blacklistedchannel = [
//     "964361642668343376",
//     "939675214600605757",
//     "946442711936938034",
//     "939904807605514260",
//     "963930001303015495",
//     "939675256765939863",
//     "965054741480636496",
//     "950196454880866314",
//     "955948174894325782",
//     "980961535826473033",

//     "948675276466958336",
//     "950419717779238993",
//     "951655268884820068",
//     "940786577808969738",
//     "981347603167981609",
//     "949118223805210674",
//     "964714582402826280",
//     "981647726129319976",
//     "973334244178919504",
//     "983507823965114378",
//     "955689401688682526",

//     "947301903186944020",
//     "951345913627021354",
//     "955599561869639710"
// ]

const welc = "964361642668343376"
const cons = "939675214600605757"
const anno = "946442711936938034"
const voti = "939904807605514260"
const self = "963930001303015495"
const cour = "939675256765939863"
const semi = "965054741480636496"
const gove = "950196454880866314"
const logs = "955948174894325782"
const spec = "980961535826473033"

const imag = "948675276466958336"
const vide = "950419717779238993"
const argu = "951655268884820068"
const game = "940786577808969738"
const poli = "981347603167981609"
const role = "949118223805210674"
const funq = "964714582402826280"
const lear = "981647726129319976"
const fran = "973334244178919504"
const bots = "983507823965114378"
const hydr = "955689401688682526"

const vtts = "947301903186944020"
const mtts = "951345913627021354"
const ctts = "955599561869639710"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
    name: "messageCreate",
    async execute(message){
        const args = message.content.split(/ +/)
        const command = args.shift().toLowerCase()

        if(message.channel.type == "DM"){
            if(message.author.id == "956345939130482750") return
            const me = await message.client.users.fetch("527285622809952256").catch(console.error)
            me.send(`**${message.author.username}** DM'd me **${message.content}**`)
            .catch((err) => {
                console.log(err)
                return
            })
        }

        // if non-government tries to use @everyone or @here
        if(message.channel.type !== "DM"){   // vcash, mezmer, choc, dashi, vcashcarbot, boomer 
            if(message.author.id !== "762133129209053244" && message.author.id !== "527285622809952256" && message.author.id !== "826841451945787412" && message.author.id !== "956345939130482750" && message.author.id !== "975952163090071553" && message.author.id !== "969084144141344788"){
                if(message.channel.id == self || message.channel.id == cour || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == funq || message.channel.id == hydr) return
                const ping = ["@everyone", "@here"]
                for (var i = 0; i < ping.length; i++) {
                    const index = message.content.toLowerCase().indexOf(ping[i])
                    if (index !== -1) {
                        message.reply("only governmental officials can use that ping idot!")
                        .catch((err) => {
                            return
                        })
                        break
                    }
                }
            }
        }

        if(message.channel.type !== "DM"){
            // respond to people with @france role
            // if(message.author.id == "251778379211210755"){
            // message.channel.send("https://c.tenor.com/eUGNMYebEwoAAAAC/bleu-blanc-rouge-france.gif")
            // }

            // general responses for everyone (non-bot)
            if(!message.author.bot){
                if(message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == logs || message.channel.id == spec || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == poli || message.channel.id == role || message.channel.id == funq || message.channel.id == lear || message.channel.id == fran || message.channel.id == bots || message.channel.id == hydr) return

                if(command == "rainbow dash"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("best pony")
                }
            
                else if(command == "ding"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("dong")
                }
                    
                else if(message.content.toLowerCase() == "dad"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("is gone")
                }
            
                else if(message.content.toLowerCase() == "mom"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("?? what's that")
                }
                    
                else if(command == "why"){
                    if(message.author.id == "527285622809952256") return
                    if(!message.content.startsWith("why not")){
                        message.channel.sendTyping()
                        await sleep(Math.floor(Math.random() * 0) + 1001)
                        message.channel.send("why not")
                    }
                    else {
                        message.channel.sendTyping()
                        await sleep(Math.floor(Math.random() * 0) + 1001)
                        message.channel.send("because why")
                    }
                }
            
                else if(command == "igues" || command == "iges" || command == "igs"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("uncertainty detected")
                }
            
                else if(command == "rick"){
                    message.channel.send("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                }
                
                else if(message.content.toLowerCase() == "bruh" || message.content.toLowerCase() == "mug"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("moment")
                }
            
                else if(command == "bruh"){
                    if(message.content.toLowerCase() == "bruh") return
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("bruh moment")
                }
            
                else if(command == "mug"){
                    if(message.content.toLowerCase() == "mug") return
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("mug moment")
                }
                
                else if(command == "k"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("lack care")
                }
            
                else if(command == "kk"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("lack care (x2)")
                }
                
                else if(command == "deez"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("nutz")
                }
            
                else if(command == "caught"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send('Caught in 8K UHD surround sound 16 Gigs ram, HDR GEFORCE RTX, TI-80 texas insturments, Triple A duracell battery ultrapower100 Cargador Compatible iPhone 1A 5 W 1400 + Cable 100% 1 Metro Blanco Compatible iPhone 5 5 C 5S 6 SE 6S 7 8 X XR XS XS MAX GoPro hero 1 2 terrabyte xbox series x Dell UltraSharp 49 Curved Monitor - U4919DW Sony HDC-3300R 2/3" CCD HD Super Motion Color Camera, 1080p Resolution Toshiba EM131A5C-SS Microwave Oven with Smart Sensor, Easy Clean Interior, ECO Mode and Sound On/Off, 1.2 Cu. ft, Stainless Steel HP LaserJet Pro M404n Monochrome Laser Printer with Built-in Ethernet (W1A52A) GE Voluson E10 Ultrasound Machine LG 23 Cu. Ft. Smart Wi-Fi Enabled InstaView Door-in-Door Counter-Depth Refrigerator with Craft Ice Maker GFW850SPNRS GE 28" Air, Moto G4 SAMSUNG 85-inch Class Crystal UHD TU-8000 Series - 4K UHD HDR Smart TV with Alexa Built-in (UN85TU8000FXZA, 2020 Model) GE 38846 Premium Slim LED Light Bar, 18 Inch Under Cabinet Fixture, Plug-In, Convertible to Direct Wire, Linkable 628 Lumens, 3000K Soft Warm White, High/Off/Low, Easy to Install, 18 Ft Bissell Cleanview Swivel Pet Upright Bagless Vacuum Cleaner Trane20,000-Watt 1-Phase LPG/NG Liquid Cooled Whole House Standby Generator')
                }
            
                else if(command == "goodnight"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("goodnight 😴 🛌 💤 🌛 don't let the bed bugs bite")
                }
                
                else if(command == "silly"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("silly qilly willy rilly tilly yilly pilly dilly filly gilly hilly jilly killy lilly zilly xilly cilly villy billy nilly milly")
                }
            
                else if(command == "😮"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("why 😮")
                }
            
                else if(command == "boner"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("what you get from going to your favorite site")
                }
            
                else if(message.content.toLowerCase() == "i like turtles"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("i like trains")
                }
            
                else if(message.content.toLowerCase() == "i like trains"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("i like turtles")
                }

                else if(message.content.toLowerCase() == "hold up" || message.content.toLowerCase() == "hol up" || message.content.toLowerCase() == "holdup" || message.content.toLowerCase() == "holup"){
                    message.channel.send("https://www.reddit.com/r/HolUp/")
                }

                else if(command == "yuri"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("vcashy waifu")
                }

                else if(message.content == "‎"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("georgeerto dialect")
                }

                else if(message.content == "‎"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("georgeerto dialect")
                }

                else if(message.content == "alright got it"){
                    message.channel.sendTyping()
                    await sleep(Math.floor(Math.random() * 0) + 1001)
                    message.channel.send("georgeerto dialect")
                }
                
                else if(message.content.startsWith("r/")){
                    const reddit = "r/"
                    for (var i = 0; i < reddit.length; i++) {
                        const index = message.content.toLowerCase().indexOf(reddit[i])
                        if (index !== -1) {
                            // add one to include the space
                            const subreddit = message.content.slice(index + reddit[i].length + 1)
                            const empty = ""
                            if(subreddit == empty){
                                message.reply('specify what the subreddit is! format is "r/[subreddit]"')
                                .catch((err) => {
                                    return
                                })
                            }
                            else {
                                message.channel.send(`https://www.reddit.com/r/${subreddit}/`)
                            }
                            break
                        }
                    }
                }

                else if(message.content.startsWith("R/")){
                    message.channel.send(`https://www.reddit.com/r/foundthemobileuser/`)
                }

                // obsessed with d
                const ddd = ["ddd"]
                for (var i = 0; i < ddd.length; i++) {
                    const index = message.content.toLowerCase().indexOf(ddd[i])
                    if (index !== -1) {
                        // add one to include the space
                        message.channel.sendTyping()
                        await sleep(Math.floor(Math.random() * 0) + 1001)
                        message.channel.send("obsessed with d")
                        break
                    }
                }
            
                // egghead dashi
                const alot = ["alot"]
                for (var i = 0; i < alot.length; i++) {
                    const index = message.content.toLowerCase().indexOf(alot[i])
                    if (index !== -1) {
                        message.channel.sendTyping()
                        await sleep(Math.floor(Math.random() * 0) + 1001)
                        message.reply("a lot*")
                        .catch((err) => {
                            return
                        })
                        break
                    }
                }
            }

            else if(message.author.bot){
                if(message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == logs || message.channel.id == spec || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == poli || message.channel.id == role || message.channel.id == funq || message.channel.id == lear || message.channel.id == fran || message.channel.id == bots || message.channel.id == hydr) return
                if(message.author.id == "975952163090071553"){        // vcashcarbot
                    return
                }

                else if(message.author.id == "956345939130482750"){   // dashi (self reply xd)
                    return
                }

                else if(message.author.id == "969084144141344788"){   // boomer
                    // if(command == "how"){
                    //     message.channel.send("<@&969084144141344788> ??? choc himself said it's ok for us to call him \"cock\"")
                    // }
                
                    // else if(command == "cookies"){
                    //     message.channel.send("boomer detected")
                    // }
                
                    // else if(command == "i"){
                    //     message.channel.send("bomer hi")
                    // }
                    
                    // else if(command == "why"){
                    //     message.channel.send("damn do we not have a right to misspell your name")
                    // }
                
                    // else if(command == "stop"){
                    //     message.channel.send("sinner")
                    // }
                
                    // else if(command == "yes"){
                    //     message.channel.send("https://www.unorules.org/wp-content/uploads/2021/09/Uno-Reverse-Card-Green-Classic-Uno-Unorules.org_.png.png")
                    // }
                }

                else if(message.author.id == "973731082136592454"){   // idiotbot
                    // if(command == "shut"){
                    //     message.reply("language")
                    // }
                
                    // else if(command == "oki"){
                    //     message.reply("uwu owo")
                    // }
                
                    const badWord = ["fuck", "bitch", "damn", "shit"]
                    for (var i = 0; i < badWord.length; i++) {
                        const index = message.content.toLowerCase().indexOf(badWord[i])
                        if (index !== -1) {
                            message.reply("language!")
                            .catch((err) => {
                                return
                            })
                            break
                        }
                    }
                }
            }
        }
    }
}