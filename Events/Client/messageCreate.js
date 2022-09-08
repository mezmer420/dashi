const { ChannelType } = require("discord.js")

const {
	blacklistedchannels,
	blacklistedcategories,
} = require("../../blacklisted-channels-and-categories")

const wait = require("node:timers/promises").setTimeout

module.exports = {
	name: "messageCreate",
	async execute(client, message, defaultColor) {
		const args = message.content.split(/ +/)
		const firstWord = args.shift().toLowerCase()
		const lowercase = message.content.toLowerCase()

		async function TypeWaitSend(str) {
			await message.channel.sendTyping().catch((err) => {
				console.log(err)
			})

			await wait(Math.floor(Math.random() * 0) + 1001)

			await message.channel.send(str).catch((err) => {
				console.log(err)
			})
		}

		if (message.channel.type === ChannelType.GuildText) {
			if (!message.author.bot) {
				if (
					blacklistedchannels.includes(message.channel.id) ||
					blacklistedcategories.includes(message.channel.parent.id)
				)
					return

				if (message.content === "<@956345939130482750>") {
					return message
						.reply("Hmm? If it's help you want, try using `/help`")
						.catch((err) => {})
				}

				// general responses for everyone (non-bot)
				const { Systems } = require("../../database")
				const getGeneralresponses = await Systems.findOne({
					where: { system: "General Responses" },
				})

				if (getGeneralresponses.online === false) return

				// all caps
				function isUpper(string) {
					return !/[a-z]/.test(string) && /[A-Z]/.test(string)
				}

				function hasSymbols(string) {
					return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(string)
				}

				if (
					isUpper(message.content) == true &&
					hasSymbols(message.content) == false
				) {
					return TypeWaitSend("Keep your voice down!")
				}

				switch (lowercase) {
					case "rainbow dash": {
						return TypeWaitSend("best pony")
					}

					case "ding": {
						return TypeWaitSend("dong")
					}

					case "dad": {
						return TypeWaitSend("is gone")
					}

					case "mom": {
						return TypeWaitSend("?? what's that")
					}

					case "bruh":
					case "mug": {
						return TypeWaitSend("moment")
					}

					case "cock": {
						return TypeWaitSend("cock moment")
					}

					case "hold up":
					case "hol up":
					case "holdup":
					case "holup": {
						return message.channel
							.send("https://www.reddit.com/r/HolUp/")
							.catch((err) => {})
					}

					case "deez": {
						return TypeWaitSend("nuts")
					}

					case "69": {
						return TypeWaitSend("nice")
					}
				}

				switch (firstWord) {
					case "why": {
						if (message.author.id === "527285622809952256") return
						if (!message.content.startsWith("why not")) {
							return TypeWaitSend("why not")
						} else {
							return TypeWaitSend("because why")
						}
					}

					case "igues":
					case "iges":
					case "igs": {
						return message.channel
							.send("uncertainty detected")
							.catch((err) => {})
					}

					case "rick": {
						return message.channel
							.send("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
							.catch((err) => {})
					}

					case "bruh": {
						if (lowercase === "bruh") return

						return TypeWaitSend("bruh moment")
					}

					case "mug": {
						if (lowercase === "mug") return

						return TypeWaitSend("mug moment")
					}

					case "k": {
						return TypeWaitSend("lack care")
					}

					case "kk": {
						return TypeWaitSend("lack care (x2)")
					}

					case "kkk": {
						return TypeWaitSend(
							"what Master presented as part of his AP Seminar score"
						)
					}

					case "caught": {
						return TypeWaitSend(
							'Caught in 8K UHD surround sound 16 Gigs ram, HDR GEFORCE RTX, TI-80 texas insturments, Triple A duracell battery ultrapower100 Cargador Compatible iPhone 1A 5 W 1400 + Cable 100% 1 Metro Blanco Compatible iPhone 5 5 C 5S 6 SE 6S 7 8 X XR XS XS MAX GoPro hero 1 2 terrabyte xbox series x Dell UltraSharp 49 Curved Monitor - U4919DW Sony HDC-3300R 2/3" CCD HD Super Motion Color Camera, 1080p Resolution Toshiba EM131A5C-SS Microwave Oven with Smart Sensor, Easy Clean Interior, ECO Mode and Sound On/Off, 1.2 Cu. ft, Stainless Steel HP LaserJet Pro M404n Monochrome Laser Printer with Built-in Ethernet (W1A52A) GE Voluson E10 Ultrasound Machine LG 23 Cu. Ft. Smart Wi-Fi Enabled InstaView Door-in-Door Counter-Depth Refrigerator with Craft Ice Maker GFW850SPNRS GE 28" Air, Moto G4 SAMSUNG 85-inch Class Crystal UHD TU-8000 Series - 4K UHD HDR Smart TV with Alexa Built-in (UN85TU8000FXZA, 2020 Model) GE 38846 Premium Slim LED Light Bar, 18 Inch Under Cabinet Fixture, Plug-In, Convertible to Direct Wire, Linkable 628 Lumens, 3000K Soft Warm White, High/Off/Low, Easy to Install, 18 Ft Bissell Cleanview Swivel Pet Upright Bagless Vacuum Cleaner Trane20,000-Watt 1-Phase LPG/NG Liquid Cooled Whole House Standby Generator'
						)
					}

					case "goodnight": {
						return TypeWaitSend(
							"goodnight 😴 🛌 💤 🌛 don't let the bed bugs bite"
						)
					}

					case "silly": {
						return TypeWaitSend(
							"silly qilly willy rilly tilly yilly pilly dilly filly gilly hilly jilly killy lilly zilly xilly cilly villy billy nilly milly"
						)
					}

					case "😮": {
						return TypeWaitSend("why 😮")
					}

					case "boner": {
						return TypeWaitSend(
							"what you get from going to your favorite site"
						)
					}

					case "i like turtles": {
						return TypeWaitSend("i like trains")
					}

					case "i like trains": {
						return TypeWaitSend("i like turtles")
					}

					case "yuri": {
						return TypeWaitSend("vcashy waifu")
					}
				}

				if (message.content.startsWith("r/")) {
					const reddit = "r/"
					for (var i = 0; i < reddit.length; i++) {
						const index = lowercase.indexOf(reddit[i])
						if (index !== -1) {
							const subreddit = message.content.slice(
								index + reddit[i].length + 1
							)

							if (!subreddit) return

							return message.channel
								.send(`https://www.reddit.com/r/${subreddit}/`)
								.catch((err) => {
									console.log(err)
								})
						}
					}
				} else if (message.content.startsWith("R/")) {
					return message.channel
						.send(`https://www.reddit.com/r/foundthemobileuser/`)
						.catch((err) => {})
				}

				// obsessed with d
				const ddd = ["ddd"]
				for (var i = 0; i < ddd.length; i++) {
					const index = lowercase.indexOf(ddd[i])
					if (index !== -1) {
						return TypeWaitSend("obsessed with d")
					}
				}

				// egghead dashi
				const alot = ["alot"]
				for (var i = 0; i < alot.length; i++) {
					const index = lowercase.indexOf(alot[i])
					if (index !== -1) {
						message.channel.sendTyping().catch((err) => {
							console.log(err)
						})

						await wait(Math.floor(Math.random() * 0) + 1001)

						return message.reply("a lot*").catch((err) => {})
					}
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
				//             console.log(err)
				//         })

				//         await wait(Math.floor(Math.random() * 0) + 1001)

				//         message.channel.send(`hi ${name}, i'm dashi!`)
				//         .catch((err) => {
				//             console.log(err)
				//         })
				//     }

				//     else if(lowercase.startsWith("im im") || lowercase.startsWith("i'm i'm") || lowercase.startsWith("i'm im") || lowercase.startsWith("im i'm")){
				//         message.channel.sendTyping()
				//         .catch((err) => {
				//             console.log(err)
				//         })

				//         await wait(Math.floor(Math.random() * 0) + 1001)

				//         message.reply("lol nice try :)")
				//         .catch((err) => {})
				//     }
				// }
			} else if (message.author.bot) {
				if (blacklistedchannels.includes(message.channel.id)) return

				if (message.author.id === "975952163090071553") {
					// vcashcarbot
					return
				} else if (message.author.id === "956345939130482750") {
					// dashi (self reply xd)
					return
				} else if (message.author.id === "969084144141344788") {
					// boomer
					return
					if (firstWord === "how") {
						return message.channel
							.send(
								'<@&969084144141344788> ??? choc himself said it\'s ok for us to call him "cock"'
							)
							.catch((err) => {
								console.log(err)
							})
					} else if (firstWord === "cookies") {
						return message.channel
							.send("boomer detected")
							.catch((err) => {
								console.log(err)
							})
					} else if (firstWord === "i") {
						return message.channel.send("bomer hi").catch((err) => {
							console.log(err)
						})
					} else if (firstWord === "why") {
						return message.channel
							.send(
								"damn do we not have a right to misspell your name"
							)
							.catch((err) => {
								console.log(err)
							})
					} else if (firstWord === "stop") {
						return message.channel.send("sinner").catch((err) => {
							console.log(err)
						})
					} else if (firstWord === "yes") {
						return message.channel
							.send(
								"https://www.unorules.org/wp-content/uploads/2021/09/Uno-Reverse-Card-Green-Classic-Uno-Unorules.org_.png.png"
							)
							.catch((err) => {
								console.log(err)
							})
					}
				} else if (message.author.id === "973731082136592454") {
					// idiotbot
					// if (firstWord === "shut") {
					// 	return message.reply("language").catch((err) => {})
					// } else if (firstWord === "oki") {
					// 	return message.reply("uwu owo").catch((err) => {})
					// }

					const badWord = ["fuck", "bitch", "damn", "shit"]
					for (var i = 0; i < badWord.length; i++) {
						const index = lowercase.indexOf(badWord[i])
						if (index !== -1) {
							return message.reply("language!").catch((err) => {})
						}
					}
				}
			}
		}
	},
}
