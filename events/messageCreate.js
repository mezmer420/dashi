const { blacklistedchannels, blacklistedcategories } = require("../blacklisted-channels-and-categories")

const wait = require("node:timers/promises").setTimeout

module.exports = {
    name: "messageCreate",
    async execute(client, message){
        const args = message.content.split(/ +/)
        const command = args.shift().toLowerCase()
        const lowercase = message.content.toLowerCase()

        if(message.channel.type == "DM"){
            if(message.author.id == "956345939130482750") return

            const me = await client.users.fetch("527285622809952256").catch(console.error)

            me.send(`**${message.author.username}** DM'd me **${message.content}**`)
            .catch((err) => {
                console.log(err)
                return
            })
        }

        // if non-government tries to use @everyone or @here
        if(message.channel.type !== "DM"){   // vcash, mezmer, choc, dashi, vcashcarbot, boomer 
            if(message.author.id !== "762133129209053244" && message.author.id !== "527285622809952256" && message.author.id !== "826841451945787412" && message.author.id !== "956345939130482750" && message.author.id !== "975952163090071553" && message.author.id !== "969084144141344788"){

                const self = "963930001303015495"
                const cour = "939675256765939863"
                const funq = "964714582402826280"
                const hydr = "955689401688682526"
                
                const vtts = "947301903186944020"
                const mtts = "951345913627021354"
                const ctts = "955599561869639710"

                if(message.channel.id == self || message.channel.id == cour || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == funq || message.channel.id == hydr) return
                
                const ping = ["@everyone", "@here"]
                for (var i = 0; i < ping.length; i++) {
                    const index = lowercase.indexOf(ping[i])
                    if(index !== -1){
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
            // if(message.author.id == "691727350051635262"){
            // message.channel.send("https://c.tenor.com/eUGNMYebEwoAAAAC/bleu-blanc-rouge-france.gif")
            // .catch((err) => {
            //     return console.log(err)
            // })
            // }

            // general responses for everyone (non-bot)
            if(!message.author.bot){
                if(blacklistedchannels.includes(message.channel.id) || blacklistedcategories.includes(message.channel.parent.id)) return

                if(command == "rainbow dash"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("best pony")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(command == "ding"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })
                    
                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("dong")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
                    
                else if(lowercase == "dad"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })
                    
                    await wait(Math.floor(Math.random() * 0) + 1001)

                    message.channel.send("is gone")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(lowercase == "mom"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("?? what's that")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
                    
                else if(command == "why"){
                    if(message.author.id == "527285622809952256") return
                    if(!message.content.startsWith("why not")){
                        message.channel.sendTyping()
                        .catch((err) => {
                            return console.log(err)
                        })
                        
                        await wait(Math.floor(Math.random() * 0) + 1001)

                        message.channel.send("why not")
                        .catch((err) => {
                            return console.log(err)
                        })
                    }
                    else {
                        message.channel.sendTyping()
                        .catch((err) => {
                            return console.log(err)
                        })

                        await wait(Math.floor(Math.random() * 0) + 1001)
                        
                        message.channel.send("because why")
                        .catch((err) => {
                            return console.log(err)
                        })
                    }
                }
            
                else if(command == "igues" || command == "iges" || command == "igs"){
                    message.channel.send("uncertainty detected")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(command == "rick"){
                    message.channel.send("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
                
                else if(lowercase == "bruh" || lowercase == "mug"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("moment")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(command == "bruh"){
                    if(lowercase == "bruh") return

                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("bruh moment")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(command == "mug"){
                    if(lowercase == "mug") return

                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)

                    message.channel.send("mug moment")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
                
                else if(command == "k"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)

                    message.channel.send("lack care")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(command == "kk"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)

                    message.channel.send("lack care (x2)")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
                
                else if(command == "deez"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)

                    message.channel.send("nutz")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(command == "caught"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send('Caught in 8K UHD surround sound 16 Gigs ram, HDR GEFORCE RTX, TI-80 texas insturments, Triple A duracell battery ultrapower100 Cargador Compatible iPhone 1A 5 W 1400 + Cable 100% 1 Metro Blanco Compatible iPhone 5 5 C 5S 6 SE 6S 7 8 X XR XS XS MAX GoPro hero 1 2 terrabyte xbox series x Dell UltraSharp 49 Curved Monitor - U4919DW Sony HDC-3300R 2/3" CCD HD Super Motion Color Camera, 1080p Resolution Toshiba EM131A5C-SS Microwave Oven with Smart Sensor, Easy Clean Interior, ECO Mode and Sound On/Off, 1.2 Cu. ft, Stainless Steel HP LaserJet Pro M404n Monochrome Laser Printer with Built-in Ethernet (W1A52A) GE Voluson E10 Ultrasound Machine LG 23 Cu. Ft. Smart Wi-Fi Enabled InstaView Door-in-Door Counter-Depth Refrigerator with Craft Ice Maker GFW850SPNRS GE 28" Air, Moto G4 SAMSUNG 85-inch Class Crystal UHD TU-8000 Series - 4K UHD HDR Smart TV with Alexa Built-in (UN85TU8000FXZA, 2020 Model) GE 38846 Premium Slim LED Light Bar, 18 Inch Under Cabinet Fixture, Plug-In, Convertible to Direct Wire, Linkable 628 Lumens, 3000K Soft Warm White, High/Off/Low, Easy to Install, 18 Ft Bissell Cleanview Swivel Pet Upright Bagless Vacuum Cleaner Trane20,000-Watt 1-Phase LPG/NG Liquid Cooled Whole House Standby Generator')
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(command == "goodnight"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("goodnight 😴 🛌 💤 🌛 don't let the bed bugs bite")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
                
                else if(command == "silly"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("silly qilly willy rilly tilly yilly pilly dilly filly gilly hilly jilly killy lilly zilly xilly cilly villy billy nilly milly")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(command == "😮"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("why 😮")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(command == "boner"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("what you get from going to your favorite site")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(lowercase == "i like turtles"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("i like trains")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
            
                else if(lowercase == "i like trains"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("i like turtles")
                    .catch((err) => {
                        return console.log(err)
                    })
                }

                else if(lowercase == "hold up" || lowercase == "hol up" || lowercase == "holdup" || lowercase == "holup"){
                    message.channel.send("https://www.reddit.com/r/HolUp/")
                    .catch((err) => {
                        return console.log(err)
                    })
                }

                else if(command == "yuri"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("vcashy waifu")
                    .catch((err) => {
                        return console.log(err)
                    })
                }

                else if(message.content == "‎"){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("georgeerto dialect")
                    .catch((err) => {
                        return console.log(err)
                    })
                }
                
                else if(message.content.startsWith("r/")){
                    const reddit = "r/"
                    for (var i = 0; i < reddit.length; i++) {
                        const index = lowercase.indexOf(reddit[i])
                        if(index !== -1){
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
                                .catch((err) => {
                                    return console.log(err)
                                })
                            }
                            break
                        }
                    }
                }

                else if(message.content.startsWith("R/")){
                    message.channel.send(`https://www.reddit.com/r/foundthemobileuser/`)
                    .catch((err) => {
                        return console.log(err)
                    })
                }

                // obsessed with d
                const ddd = ["ddd"]
                for (var i = 0; i < ddd.length; i++) {
                    const index = lowercase.indexOf(ddd[i])
                    if(index !== -1){
                        // add one to include the space
                        message.channel.sendTyping()
                        .catch((err) => {
                            return console.log(err)
                        })

                        await wait(Math.floor(Math.random() * 0) + 1001)
                        
                        message.channel.send("obsessed with d")
                        .catch((err) => {
                            return console.log(err)
                        })
                        
                        break
                    }
                }
            
                // egghead dashi
                const alot = ["alot"]
                for (var i = 0; i < alot.length; i++) {
                    const index = lowercase.indexOf(alot[i])
                    if(index !== -1){
                        message.channel.sendTyping()
                        .catch((err) => {
                            return console.log(err)
                        })

                        await wait(Math.floor(Math.random() * 0) + 1001)

                        message.reply("a lot*")
                        .catch((err) => {
                            return
                        })
                        
                        break
                    }
                }

                function isUpper(string) {
                    return !/[a-z]/.test(string) && /[A-Z]/.test(string)
                }

                function hasSymbols(string) {
                    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(string)
                }

                if(isUpper(message.content) == true && hasSymbols(message.content) == false){
                    message.channel.sendTyping()
                    .catch((err) => {
                        return console.log(err)
                    })

                    await wait(Math.floor(Math.random() * 0) + 1001)
                    
                    message.channel.send("keep your voice down!")
                    .catch((err) => {
                        return console.log(err)
                    })
                }

                // // dad bot (anywhere in message)
                // if(lowercase.startsWith("im ") || lowercase.startsWith("i'm ")){
                //     if(!lowercase.startsWith("im im") && !lowercase.startsWith("i'm i'm") && !lowercase.startsWith("i'm im") && !lowercase.startsWith("im i'm")){
                //         let imWord
                //         if(lowercase.startsWith("im ")){
                //             imWord = "im "
                //         } else if(lowercase.startsWith("i'm ")){
                //             imWord = "i'm "
                //         }

                //         const name = message.content.slice(imWord[i].length)
                //         if(!name) return

                //         message.channel.sendTyping()
                //         .catch((err) => {
                //             return console.log(err)
                //         })

                //         await wait(Math.floor(Math.random() * 0) + 1001)

                //         message.channel.send(`hi ${name}, i'm dashi!`)
                //         .catch((err) => {
                //             return console.log(err)
                //         })
                //     }

                //     else if(lowercase.startsWith("im im") || lowercase.startsWith("i'm i'm") || lowercase.startsWith("i'm im") || lowercase.startsWith("im i'm")){
                //         message.channel.sendTyping()
                //         .catch((err) => {
                //             return console.log(err)
                //         })

                //         await wait(Math.floor(Math.random() * 0) + 1001)

                //         message.reply("lol nice try :)")
                //         .catch((err) => {
                //             return
                //         })
                //     }
                // }
            }

            else if(message.author.bot){
                if(blacklistedchannels.includes(message.channel.id)) return

                if(message.author.id == "975952163090071553"){        // vcashcarbot
                    return
                }

                else if(message.author.id == "956345939130482750"){   // dashi (self reply xd)
                    return
                }

                else if(message.author.id == "969084144141344788"){   // boomer
                    return
                    if(command == "how"){
                        message.channel.send("<@&969084144141344788> ??? choc himself said it's ok for us to call him \"cock\"")
                        .catch((err) => {
                            return console.log(err)
                        })
                    }
                
                    else if(command == "cookies"){
                        message.channel.send("boomer detected")
                        .catch((err) => {
                            return console.log(err)
                        })
                    }
                
                    else if(command == "i"){
                        message.channel.send("bomer hi")
                        .catch((err) => {
                            return console.log(err)
                        })
                    }
                    
                    else if(command == "why"){
                        message.channel.send("damn do we not have a right to misspell your name")
                        .catch((err) => {
                            return console.log(err)
                        })
                    }
                
                    else if(command == "stop"){
                        message.channel.send("sinner")
                        .catch((err) => {
                            return console.log(err)
                        })
                    }
                
                    else if(command == "yes"){
                        message.channel.send("https://www.unorules.org/wp-content/uploads/2021/09/Uno-Reverse-Card-Green-Classic-Uno-Unorules.org_.png.png")
                        .catch((err) => {
                            return console.log(err)
                        })
                    }
                }

                else if(message.author.id == "973731082136592454"){   // idiotbot
                    // if(command == "shut"){
                    //     message.reply("language")
                    //     .catch((err) => {
                    //         return
                    //     })
                    // }
                
                    // else if(command == "oki"){
                    //     message.reply("uwu owo")
                    //     .catch((err) => {
                    //         return
                    //     })
                    // }
                
                    const badWord = ["fuck", "bitch", "damn", "shit"]
                    for (var i = 0; i < badWord.length; i++) {
                        const index = lowercase.indexOf(badWord[i])
                        if(index !== -1){
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