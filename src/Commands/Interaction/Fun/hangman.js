const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
// const { hangman } = require("reconlx")
// npm i reconlx@version1

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("hangman")
	.setDescription("Play hangman")
	.addStringOption((option) =>
		option
			.setName("category")
			.setDescription("Select category to play")
			.setRequired(false)
			.addChoices(
				{ name: "Animals", value: "Animals" },
				{ name: "Car Companies", value: "Car Companies" },
				{ name: "Sports", value: "Sports" },
				{ name: "Holidays", value: "Hammer" },
				{ name: "Countries", value: "Countries" }
			)
	)

module.exports.run = async ({ client, interaction }) => {
	const categories = [
		"Animals",
		"Car Companies",
		"Sports",
		"Holidays",
		"Countries",
	]
	const category =
		interaction.options.getString("category") ||
		categories[Math.floor(Math.random() * categories.length)]

	let words = []

	if (category === "Animals") {
		words = [
			"Aardvark",
			"Albatross",
			"Alligator",
			"Alpaca",
			"Ant",
			"Anteater",
			"Antelope",
			"Ape",
			"Armadillo",
			"Donkey",
			"Baboon",
			"Badger",
			"Barracuda",
			"Bat",
			"Bear",
			"Beaver",
			"Bee",
			"Bison",
			"Boar",
			"Buffalo",
			"Butterfly",
			"Camel",
			"Capybara",
			"Caribou",
			"Cassowary",
			"Cat",
			"Caterpillar",
			"Cattle",
			"Chamois",
			"Cheetah",
			"Chicken",
			"Chimpanzee",
			"Chinchilla",
			"Chough",
			"Clam",
			"Cobra",
			"Cockroach",
			"Cod",
			"Cormorant",
			"Coyote",
			"Crab",
			"Crane",
			"Crocodile",
			"Crow",
			"Curlew",
			"Deer",
			"Dinosaur",
			"Dog",
			"Dogfish",
			"Dolphin",
			"Dotterel",
			"Dove",
			"Dragonfly",
			"Duck",
			"Dugong",
			"Dunlin",
			"Eagle",
			"Echidna",
			"Eel",
			"Eland",
			"Elephant",
			"Elk",
			"Emu",
			"Falcon",
			"Ferret",
			"Finch",
			"Fish",
			"Flamingo",
			"Fly",
			"Fox",
			"Frog",
			"Gaur",
			"Gazelle",
			"Gerbil",
			"Giraffe",
			"Gnat",
			"Gnu",
			"Goat",
			"Goldfinch",
			"Goldfish",
			"Goose",
			"Gorilla",
			"Goshawk",
			"Grasshopper",
			"Grouse",
			"Guanaco",
			"Gull",
			"Hamster",
			"Hare",
			"Hawk",
			"Hedgehog",
			"Heron",
			"Herring",
			"Hippopotamus",
			"Hornet",
			"Horse",
			"Human",
			"Hummingbird",
			"Hyena",
			"Ibex",
			"Ibis",
			"Jackal",
			"Jaguar",
			"Jay",
			"Jellyfish",
			"Kangaroo",
			"Kingfisher",
			"Koala",
			"Kookabura",
			"Kouprey",
			"Kudu",
			"Lapwing",
			"Lark",
			"Lemur",
			"Leopard",
			"Lion",
			"Llama",
			"Lobster",
			"Locust",
			"Loris",
			"Louse",
			"Lyrebird",
			"Magpie",
			"Mallard",
			"Manatee",
			"Mandrill",
			"Mantis",
			"Marten",
			"Meerkat",
			"Mink",
			"Mole",
			"Mongoose",
			"Monkey",
			"Moose",
			"Mosquito",
			"Mouse",
			"Mule",
			"Narwhal",
			"Newt",
			"Nightingale",
			"Octopus",
			"Okapi",
			"Opossum",
			"Oryx",
			"Ostrich",
			"Otter",
			"Owl",
			"Oyster",
			"Panther",
			"Parrot",
			"Partridge",
			"Peafowl",
			"Pelican",
			"Penguin",
			"Pheasant",
			"Pig",
			"Pigeon",
			"Pony",
			"Porcupine",
			"Porpoise",
			"Quail",
			"Quelea",
			"Quetzal",
			"Rabbit",
			"Raccoon",
			"Rail",
			"Ram",
			"Rat",
			"Raven",
			"Reindeer",
			"Rhinoceros",
			"Rook",
			"Salamander",
			"Salmon",
			"Sandpiper",
			"Sardine",
			"Scorpion",
			"Seahorse",
			"Seal",
			"Shark",
			"Sheep",
			"Shrew",
			"Skunk",
			"Snail",
			"Snake",
			"Sparrow",
			"Spider",
			"Spoonbill",
			"Squid",
			"Squirrel",
			"Starling",
			"Stingray",
			"Stinkbug",
			"Stork",
			"Swallow",
			"Swan",
			"Tapir",
			"Tarsier",
			"Termite",
			"Tiger",
			"Toad",
			"Trout",
			"Turkey",
			"Turtle",
			"Viper",
			"Vulture",
			"Wallaby",
			"Walrus",
			"Wasp",
			"Weasel",
			"Whale",
			"Wildcat",
			"Wolf",
			"Wolverine",
			"Wombat",
			"Woodcock",
			"Woodpecker",
			"Worm",
			"Wren",
			"Yak",
			"Zebra",
		]
	} else if (category === "Car Companies") {
		words = [
			"Audi",
			"BMW",
			"Cadillac",
			"Chevrolet",
			"Chrysler",
			"Dodge",
			"Ford",
			"GMC",
			"Honda",
			"Hyundai",
			"Jeep",
			"Kia",
			"Lexus",
			"Nissan",
			"Porsche",
			"Ram",
			"Subaru",
			"Tesla",
			"Toyota",
			"Volkswagen",
		]
	} else if (category === "Sports") {
		words = [
			"Badminton",
			"Baseball",
			"Basketball",
			"Bowling",
			"Cycling",
			"Dodgeball",
			"Fencing",
			"Football",
			"Golf",
			"Hockey",
			"Lacrosse",
			"Rowing",
			"Rugby",
			"Soccer",
			"Skiing",
			"Snowboarding",
			"Swimming",
			"Tennis",
			"Volleyball",
			"Wrestling",
		]
	} else if (category === "Holidays") {
		words = [
			"BodhiDay",
			"Christmas",
			"Diwali",
			"Easter",
			"FathersDay",
			"Halloween",
			"Hanukkah",
			"LaborDay",
			"MartinLutherKingJrDay",
			"MemorialDay",
			"MothersDay",
			"NewYear",
			"SaintPatricksDay",
			"Thanksgiving",
			"ValentinesDay",
			"VeteransDay",
		]
	} else if (category === "Countries") {
		words = [
			"Afghanistan",
			"Austrailia",
			"Austria",
			"Brazil",
			"Canada",
			"Chile",
			"China",
			"Colombia",
			"CostaRica",
			"Cuba",
			"Denmark",
			"Egypt",
			"Germany",
			"Greeze",
			"Guatemala",
			"France",
			"Iran",
			"Iraq",
			"Ireland",
			"Italy",
			"Jamaica",
			"Japan",
			"Malaysia",
			"Mexico",
			"NewZealand",
			"NorthKorea",
			"Philippines",
			"Poland",
			"Portugal",
			"Russia",
			"SaudiArabia",
			"SouthAfrica",
			"SouthKorea",
			"Spain",
			"Sweden",
			"Switzerland",
			"Thailand",
			"UnitedKingdom",
			"UnitedStatesofAmerica",
			"Venezuela",
		]
	}

	const word = words[Math.floor(Math.random() * words.length)]

	console.log(word)

	const hangmangame = new hangman({
		message: interaction,
		word: word,
		client: client,
		channelID: interaction.channel.id,
	})

	await interaction
		.editReply({
			content: `Started By: ${interaction.member.user.username}\nCategory: ${category}`,
		})
		.catch((err) => {})

	hangmangame.start().catch((err) => {
		console.log(err)
	})
}

class hangman {
	/**
	 * @name hangman
	 * @kind constructor
	 * @param {Object} options options
	 * @param {String} [options.channelID] channel to send to (channel.id)
	 * @param {any} [options.message] parameter used for message event
	 * @param {String} [options.permission] required permission to use this command
	 * @param {String} [options.word] word that needed to be guessed
	 * @param {any} [options.client] client used to defined Discord.Client
	 * @description Easy and simple hangman game!
	 */
	constructor(options) {
		if (!options.channelID)
			throw new TypeError("Channel ID is a required argument.")
		if (typeof options.channelID !== "string")
			throw new TypeError("Channel ID must be in a string")
		if (!options.message)
			throw new TypeError(
				"Message is a required argument; parameter used for message event"
			)
		if (!options.word)
			throw new TypeError(
				"Word is an required argument; Word is the word needed to be guessed"
			)
		if (!options.client)
			throw new TypeError(
				"Client is a required argument; client used to defined Discord.Client"
			)
		this.message = options.message
		this.channel = this.message.guild.channels.cache.get(options.channelID)
		this.args = options.args
		this.permission = options.permission
		this.word = options.word.toLowerCase().replace(/[^a-z\s:]/g, "")
		this.client = options.client
	}
	async start() {
		var letters = [
			"🇦",
			"🇧",
			"🇨",
			"🇩",
			"🇪",
			"🇫",
			"🇬",
			"🇭",
			"🇮",
			"🇯",
			"🇰",
			"🇱",
			"🇲",
			"🇳",
			"🇴",
			"🇵",
			"🇶",
			"🇷",
			"🇸",
			"🇹",
			"🇺",
			"🇻",
			"🇼",
			"🇽",
			"🇾",
			"🇿",
		]
		var unicode = [
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"i",
			"j",
			"k",
			"l",
			"m",
			"n",
			"o",
			"p",
			"q",
			"r",
			"s",
			"t",
			"u",
			"v",
			"w",
			"x",
			"y",
			"z",
		]
		var games = []

		var stages = [
			`\`\`\`
      /---|
      |   
      |
      |
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o
      |
      |
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o
      |   |
      | 
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o
      |  /|
      |
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o
      |  /|\\
      |
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o
      |  /|\\
      |  /
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o ~ thanks
      |  /|\\
      |  / \\
      |
      \`\`\`
      `,
		]
		function generateMessage(phrase, guesses) {
			var s = ""
			for (var i = 0; i < phrase.length; i++) {
				if (phrase[i] == " ") s += " "
				else {
					var c = phrase[i]
					if (guesses.indexOf(c) == -1) c = "\\_"
					s += "__" + c + "__ "
				}
			}
			return s
		}
		function nextLetter(message, index, word) {
			message
				.react(letters[index])
				.catch((err) => {})
				.then((r) => {
					index++
					if (index < letters.length) {
						if (index == 13) {
							message.channel
								.send(generateMessage(word, []))
								.then((m) => {
									games.push({
										stage: 0,
										msg0: message,
										msg1: m,
										phrase: word,
										guesses: [],
									})
									nextLetter(m, index)
								})
						} else {
							nextLetter(message, index, word)
						}
					}
				})
		}
		// TODO: I'm way too lazy to change this, but WHY THE FUCK IS THIS AN EVENT LISTENER?!
		this.client.on("messageReactionAdd", (reaction, user) => {
			var msg = reaction.message
			if (!user.bot) {
				for (var i = 0; i < games.length; i++) {
					var game = games[i]
					if (
						(msg.id == game.msg0.id || msg.id == game.msg1.id) &&
						game.stage < stages.length
					) {
						var letter =
							unicode[letters.indexOf(reaction.emoji.name)]

						reaction.users.fetch().then((usrs) => {
							var reactors = usrs
							var remove_next = function (index) {
								if (index < reactors.length)
									reaction
										.remove(reactors[index])
										.then(() => remove_next(index + 1))
							}

							remove_next(0)
						})

						if (game.guesses.indexOf(letter) == -1) {
							game.guesses.push(letter)
							if (game.phrase.indexOf(letter) == -1) {
								game.stage++
								game.msg0.edit(stages[game.stage])
							} else {
								var sik = true
								for (var j = 0; j < game.phrase.length; j++) {
									var c = game.phrase[j]
									if (
										c != " " &&
										game.guesses.indexOf(c) == -1
									) {
										sik = false
									}
								}

								if (sik) {
									game.msg0.edit(
										stages[game.stage].replace(
											"o",
											"o ~ ur alright.. for now"
										)
									)
								}

								game.msg1.edit(
									generateMessage(game.phrase, game.guesses)
								)
							}
						}
					}
					games[i] = game
				}
			}
		})
		if (this.permission) {
			if (!this.message.member.permissions.has(this.permission))
				return this.message.reply(
					`You need ${this.permission} permission to use this command.`
				)
			this.channel.send(stages[0]).then((m) => {
				nextLetter(m, 0, this.word)
			})
		} else {
			this.channel.send(stages[0]).then((m) => {
				nextLetter(m, 0, this.word)
			})
		}
	}
}
