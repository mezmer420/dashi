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

const {hangman} = require("reconlx")

module.exports = {
    callback: async (client, message, args) => {
        if(message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == logs || message.channel.id == spec || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == poli || message.channel.id == role || message.channel.id == funq || message.channel.id == lear || message.channel.id == fran || message.channel.id == bots || message.channel.id == hydr) return

        if(message.channel.id !== "939674946953682976" && message.channel.id !== "939686071241949205" && message.channel.id !== "940786577808969738" && message.channel.id !== "945527434655187006" && message.channel.id !== "969027553878749204") return message.reply(`you can only use that command in ${message.guild.channels.cache.get("939674946953682976").toString()}, ${message.guild.channels.cache.get("939686071241949205").toString()}, ${message.guild.channels.cache.get("940786577808969738").toString()}, ${message.guild.channels.cache.get("945527434655187006").toString()}, or ${message.guild.channels.cache.get("969027553878749204").toString()}! (these messages will autodelete)`)
        .then(msg => {
            setTimeout(() => message.delete()
            .catch((err) => {
                return
            }), 6000)
            setTimeout(() => msg.delete()
            .catch((err) => {
                return
            }), 6000)
        })

        const categories = [
            "Animals",
            "Car Companies",
            "Sports"
        ]
        const category = categories[Math.floor(Math.random() * categories.length)]

        let words = []

        if(category == "Animals"){
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
                "Red deer",
                "Red panda",
                "Reindeer",
                "Rhinoceros",
                "Rook",
                "Salamander",
                "Salmon",
                "Sand Dollar",
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
                "Zebra"
            ]
        }

        else if(category == "Car Companies"){
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
                "Volkswagen"
            ]
        }

        else if(category == "Sports"){
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
                "Wrestling"
            ]
        }

        const word = words[Math.floor(Math.random() * words.length)]

        console.log(word)

        const hangmangame = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: message.channel.id
        })

        await client.channels.cache.get(`${message.channel.id}`).send(`**Hangman**\nStarted By: ${message.author.username}\nCategory: ${category}`)

        hangmangame.start()
        .catch((err) => {
            console.log(err)
            return
        })
    }
}