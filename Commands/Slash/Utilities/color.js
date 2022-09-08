const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("color")
	.setDescription("Gives a random color")

module.exports.category = "Utilities"

module.exports.run = async ({ client, interaction }) => {
	const colors = [
		{
			color: "indian red",
			code: {
				hex: "#B0171F",
			},
			id: 1,
		},

		{
			color: "crimson",
			code: {
				hex: "#DC143C",
			},
			id: 2,
		},

		{
			color: "lightpink",
			code: {
				hex: "#FFB6C1",
			},
			id: 4,
		},

		{
			color: "lightpink 1",
			code: {
				hex: "#FFAEB9",
			},
			id: 4,
		},

		{
			color: "lightpink 2",
			code: {
				hex: "#EEA2AD",
			},
			id: 5,
		},

		{
			color: "lightpink 3",
			code: {
				hex: "#CD8C95",
			},
			id: 6,
		},

		{
			color: "lightpink 4",
			code: {
				hex: "#8B5F65",
			},
			id: 7,
		},

		{
			color: "pink",
			code: {
				hex: "#FFC0CB",
			},
			id: 8,
		},

		{
			color: "pink 1",
			code: {
				hex: "#FFB5C5",
			},
			id: 9,
		},

		{
			color: "pink 2",
			code: {
				hex: "#EEA9B8",
			},
			id: 10,
		},

		{
			color: "pink 3",
			code: {
				hex: "#CD919E",
			},
			id: 11,
		},

		{
			color: "pink 4",
			code: {
				hex: "#8B636C",
			},
			id: 12,
		},

		{
			color: "palevioletred",
			code: {
				hex: "#DB7093",
			},
			id: 13,
		},

		{
			color: "palevioletred 1",
			code: {
				hex: "#FF82AB",
			},
			id: 14,
		},

		{
			color: "palevioletred 2",
			code: {
				hex: "#EE799F",
			},
			id: 15,
		},

		{
			color: "palevioletred 3",
			code: {
				hex: "#CD6889",
			},
			id: 16,
		},

		{
			color: "palevioletred 4",
			code: {
				hex: "#8B475D",
			},
			id: 17,
		},

		{
			color: "lavenderblush 1 (lavenderblush)",
			code: {
				hex: "#FFF0F5",
			},
			id: 18,
		},

		{
			color: "lavenderblush 2",
			code: {
				hex: "#EEE0E5",
			},
			id: 19,
		},

		{
			color: "lavenderblush 3",
			code: {
				hex: "#CDC1C5",
			},
			id: 20,
		},

		{
			color: "lavenderblush 4",
			code: {
				hex: "#8B8386",
			},
			id: 21,
		},

		{
			color: "violetred 1",
			code: {
				hex: "#FF3E96",
			},
			id: 22,
		},

		{
			color: "violetred 2",
			code: {
				hex: "#EE3A8C",
			},
			id: 23,
		},

		{
			color: "violetred 3",
			code: {
				hex: "#CD3278",
			},
			id: 24,
		},

		{
			color: "violetred 4",
			code: {
				hex: "#8B2252",
			},
			id: 25,
		},

		{
			color: "hotpink",
			code: {
				hex: "#FF69B4",
			},
			id: 26,
		},

		{
			color: "hotpink 1",
			code: {
				hex: "#FF6EB4",
			},
			id: 27,
		},

		{
			color: "hotpink 2",
			code: {
				hex: "#EE6AA7",
			},
			id: 28,
		},

		{
			color: "hotpink 3",
			code: {
				hex: "#CD6090",
			},
			id: 29,
		},

		{
			color: "hotpink 4",
			code: {
				hex: "#8B3A62",
			},
			id: 30,
		},

		{
			color: "raspberry",
			code: {
				hex: "#872657",
			},
			id: 31,
		},

		{
			color: "deeppink 1 (deeppink)",
			code: {
				hex: "#FF1493",
			},
			id: 32,
		},

		{
			color: "deeppink 2",
			code: {
				hex: "#EE1289",
			},
			id: 33,
		},

		{
			color: "deeppink 3",
			code: {
				hex: "#CD1076",
			},
			id: 34,
		},

		{
			color: "deeppink 4",
			code: {
				hex: "#8B0A50",
			},
			id: 35,
		},

		{
			color: "maroon 1",
			code: {
				hex: "#FF34B3",
			},
			id: 36,
		},

		{
			color: "maroon 2",
			code: {
				hex: "#EE30A7",
			},
			id: 37,
		},

		{
			color: "maroon 3",
			code: {
				hex: "#CD2990",
			},
			id: 38,
		},

		{
			color: "mediumvioletred",
			code: {
				hex: "#C71585",
			},
			id: 39,
		},

		{
			color: "violetred",
			code: {
				hex: "#D02090",
			},
			id: 40,
		},

		{
			color: "orchid",
			code: {
				hex: "#DA70D6",
			},
			id: 41,
		},

		{
			color: "orchid 1",
			code: {
				hex: "#FF83FA",
			},
			id: 42,
		},

		{
			color: "orchid 2",
			code: {
				hex: "#EE7AE9",
			},
			id: 43,
		},

		{
			color: "orchid 3",
			code: {
				hex: "#CD69C9",
			},
			id: 44,
		},

		{
			color: "orchid 4",
			code: {
				hex: "#8B4789",
			},
			id: 45,
		},

		{
			color: "thistle",
			code: {
				hex: "#D8BFD8",
			},
			id: 46,
		},

		{
			color: "thistle 1",
			code: {
				hex: "#FFE1FF",
			},
			id: 47,
		},

		{
			color: "thistle 2",
			code: {
				hex: "#EED2EE",
			},
			id: 48,
		},

		{
			color: "thistle 3",
			code: {
				hex: "#CDB5CD",
			},
			id: 49,
		},

		{
			color: "thistle 4",
			code: {
				hex: "#8B7B8B",
			},
			id: 50,
		},

		{
			color: "plum 1",
			code: {
				hex: "#FFBBFF",
			},
			id: 51,
		},

		{
			color: "plum 2",
			code: {
				hex: "#EEAEEE",
			},
			id: 52,
		},

		{
			color: "plum 3",
			code: {
				hex: "#CD96CD",
			},
			id: 53,
		},

		{
			color: "plum 4",
			code: {
				hex: "#8B668B",
			},
			id: 54,
		},

		{
			color: "plum",
			code: {
				hex: "#DDA0DD",
			},
			id: 55,
		},

		{
			color: "violet",
			code: {
				hex: "#EE82EE",
			},
			id: 56,
		},

		{
			color: "magenta (fuchsia*)",
			code: {
				hex: "#FF00FF",
			},
			id: 57,
		},

		{
			color: "magenta 2",
			code: {
				hex: "#EE00EE",
			},
			id: 58,
		},

		{
			color: "magenta 3",
			code: {
				hex: "#CD00CD",
			},
			id: 59,
		},

		{
			color: "magenta 4 (darkmagenta)",
			code: {
				hex: "#8B008B",
			},
			id: 60,
		},

		{
			color: "purple*",
			code: {
				hex: "#800080",
			},
			id: 61,
		},

		{
			color: "mediumorchid",
			code: {
				hex: "#BA55D3",
			},
			id: 62,
		},

		{
			color: "mediumorchid 1",
			code: {
				hex: "#E066FF",
			},
			id: 63,
		},

		{
			color: "mediumorchid 2",
			code: {
				hex: "#D15FEE",
			},
			id: 64,
		},

		{
			color: "mediumorchid 3",
			code: {
				hex: "#B452CD",
			},
			id: 65,
		},

		{
			color: "mediumorchid 4",
			code: {
				hex: "#7A378B",
			},
			id: 66,
		},

		{
			color: "darkviolet",
			code: {
				hex: "#9400D3",
			},
			id: 67,
		},

		{
			color: "darkorchid",
			code: {
				hex: "#9932CC",
			},
			id: 68,
		},

		{
			color: "darkorchid 1",
			code: {
				hex: "#BF3EFF",
			},
			id: 69,
		},

		{
			color: "darkorchid 2",
			code: {
				hex: "#B23AEE",
			},
			id: 70,
		},

		{
			color: "darkorchid 3",
			code: {
				hex: "#9A32CD",
			},
			id: 71,
		},

		{
			color: "darkorchid 4",
			code: {
				hex: "#68228B",
			},
			id: 72,
		},

		{
			color: "indigo",
			code: {
				hex: "#4B0082",
			},
			id: 73,
		},

		{
			color: "blueviolet",
			code: {
				hex: "#8A2BE2",
			},
			id: 74,
		},

		{
			color: "purple 1",
			code: {
				hex: "#9B30FF",
			},
			id: 75,
		},

		{
			color: "purple 2",
			code: {
				hex: "#912CEE",
			},
			id: 76,
		},

		{
			color: "purple 3",
			code: {
				hex: "#7D26CD",
			},
			id: 77,
		},

		{
			color: "purple 4",
			code: {
				hex: "#551A8B",
			},
			id: 78,
		},

		{
			color: "mediumpurple",
			code: {
				hex: "#9370DB",
			},
			id: 79,
		},

		{
			color: "mediumpurple 1",
			code: {
				hex: "#AB82FF",
			},
			id: 80,
		},

		{
			color: "mediumpurple 2",
			code: {
				hex: "#9F79EE",
			},
			id: 81,
		},

		{
			color: "mediumpurple 3",
			code: {
				hex: "#8968CD",
			},
			id: 82,
		},

		{
			color: "mediumpurple 4",
			code: {
				hex: "#5D478B",
			},
			id: 83,
		},

		{
			color: "darkslateblue",
			code: {
				hex: "#483D8B",
			},
			id: 84,
		},

		{
			color: "lightslateblue",
			code: {
				hex: "#8470FF",
			},
			id: 85,
		},

		{
			color: "mediumslateblue",
			code: {
				hex: "#7B68EE",
			},
			id: 86,
		},

		{
			color: "slateblue",
			code: {
				hex: "#6A5ACD",
			},
			id: 87,
		},

		{
			color: "slateblue 1",
			code: {
				hex: "#836FFF",
			},
			id: 88,
		},

		{
			color: "slateblue 2",
			code: {
				hex: "#7A67EE",
			},
			id: 89,
		},

		{
			color: "slateblue 3",
			code: {
				hex: "#6959CD",
			},
			id: 90,
		},

		{
			color: "slateblue 4",
			code: {
				hex: "#473C8B",
			},
			id: 91,
		},

		{
			color: "ghostwhite",
			code: {
				hex: "#F8F8FF",
			},
			id: 92,
		},

		{
			color: "lavender",
			code: {
				hex: "#E6E6FA",
			},
			id: 93,
		},

		{
			color: "blue*",
			code: {
				hex: "#0000FF",
			},
			id: 94,
		},

		{
			color: "blue 2",
			code: {
				hex: "#0000EE",
			},
			id: 95,
		},

		{
			color: "blue 3 (mediumblue)",
			code: {
				hex: "#0000CD",
			},
			id: 96,
		},

		{
			color: "blue 4 (darkblue)",
			code: {
				hex: "#00008B",
			},
			id: 97,
		},

		{
			color: "navy*",
			code: {
				hex: "#000080",
			},
			id: 98,
		},

		{
			color: "midnightblue",
			code: {
				hex: "#191970",
			},
			id: 99,
		},

		{
			color: "cobalt",
			code: {
				hex: "#3D59AB",
			},
			id: 100,
		},

		{
			color: "royalblue",
			code: {
				hex: "#4169E1",
			},
			id: 101,
		},

		{
			color: "royalblue 1",
			code: {
				hex: "#4876FF",
			},
			id: 102,
		},

		{
			color: "royalblue 2",
			code: {
				hex: "#436EEE",
			},
			id: 103,
		},

		{
			color: "royalblue 3",
			code: {
				hex: "#3A5FCD",
			},
			id: 104,
		},

		{
			color: "royalblue 4",
			code: {
				hex: "#27408B",
			},
			id: 105,
		},

		{
			color: "cornflowerblue",
			code: {
				hex: "#6495ED",
			},
			id: 106,
		},

		{
			color: "lightsteelblue",
			code: {
				hex: "#B0C4DE",
			},
			id: 107,
		},

		{
			color: "lightsteelblue 1",
			code: {
				hex: "#CAE1FF",
			},
			id: 108,
		},

		{
			color: "lightsteelblue 2",
			code: {
				hex: "#BCD2EE",
			},
			id: 109,
		},

		{
			color: "lightsteelblue 3",
			code: {
				hex: "#A2B5CD",
			},
			id: 110,
		},

		{
			color: "lightsteelblue 4",
			code: {
				hex: "#6E7B8B",
			},
			id: 111,
		},

		{
			color: "lightslategray",
			code: {
				hex: "#778899",
			},
			id: 112,
		},

		{
			color: "slategray",
			code: {
				hex: "#708090",
			},
			id: 113,
		},

		{
			color: "slategray 1",
			code: {
				hex: "#C6E2FF",
			},
			id: 114,
		},

		{
			color: "slategray 2",
			code: {
				hex: "#B9D3EE",
			},
			id: 115,
		},

		{
			color: "slategray 3",
			code: {
				hex: "#9FB6CD",
			},
			id: 116,
		},

		{
			color: "slategray 4",
			code: {
				hex: "#6C7B8B",
			},
			id: 117,
		},

		{
			color: "dodgerblue 1 (dodgerblue)",
			code: {
				hex: "#1E90FF",
			},
			id: 118,
		},

		{
			color: "dodgerblue 2",
			code: {
				hex: "#1C86EE",
			},
			id: 119,
		},

		{
			color: "dodgerblue 3",
			code: {
				hex: "#1874CD",
			},
			id: 120,
		},

		{
			color: "dodgerblue 4",
			code: {
				hex: "#104E8B",
			},
			id: 121,
		},

		{
			color: "aliceblue",
			code: {
				hex: "#F0F8FF",
			},
			id: 122,
		},

		{
			color: "steelblue",
			code: {
				hex: "#4682B4",
			},
			id: 123,
		},

		{
			color: "steelblue 1",
			code: {
				hex: "#63B8FF",
			},
			id: 124,
		},

		{
			color: "steelblue 2",
			code: {
				hex: "#5CACEE",
			},
			id: 125,
		},

		{
			color: "steelblue 3",
			code: {
				hex: "#4F94CD",
			},
			id: 126,
		},

		{
			color: "steelblue 4",
			code: {
				hex: "#36648B",
			},
			id: 127,
		},

		{
			color: "lightskyblue",
			code: {
				hex: "#87CEFA",
			},
			id: 128,
		},

		{
			color: "lightskyblue 1",
			code: {
				hex: "#B0E2FF",
			},
			id: 129,
		},

		{
			color: "lightskyblue 2",
			code: {
				hex: "#A4D3EE",
			},
			id: 130,
		},

		{
			color: "lightskyblue 3",
			code: {
				hex: "#8DB6CD",
			},
			id: 131,
		},

		{
			color: "lightskyblue 4",
			code: {
				hex: "#607B8B",
			},
			id: 132,
		},

		{
			color: "skyblue 1",
			code: {
				hex: "#87CEFF",
			},
			id: 133,
		},

		{
			color: "skyblue 2",
			code: {
				hex: "#7EC0EE",
			},
			id: 134,
		},

		{
			color: "skyblue 3",
			code: {
				hex: "#6CA6CD",
			},
			id: 135,
		},

		{
			color: "skyblue 4",
			code: {
				hex: "#4A708B",
			},
			id: 136,
		},

		{
			color: "skyblue",
			code: {
				hex: "#87CEEB",
			},
			id: 137,
		},

		{
			color: "deepskyblue 1 (deepskyblue)",
			code: {
				hex: "#00BFFF",
			},
			id: 138,
		},

		{
			color: "deepskyblue 2",
			code: {
				hex: "#00B2EE",
			},
			id: 139,
		},

		{
			color: "deepskyblue 3",
			code: {
				hex: "#009ACD",
			},
			id: 140,
		},

		{
			color: "deepskyblue 4",
			code: {
				hex: "#00688B",
			},
			id: 141,
		},

		{
			color: "peacock",
			code: {
				hex: "#33A1C9",
			},
			id: 142,
		},

		{
			color: "lightblue",
			code: {
				hex: "#ADD8E6",
			},
			id: 143,
		},

		{
			color: "lightblue 1",
			code: {
				hex: "#BFEFFF",
			},
			id: 144,
		},

		{
			color: "lightblue 2",
			code: {
				hex: "#B2DFEE",
			},
			id: 145,
		},

		{
			color: "lightblue 3",
			code: {
				hex: "#9AC0CD",
			},
			id: 146,
		},

		{
			color: "lightblue 4",
			code: {
				hex: "#68838B",
			},
			id: 147,
		},

		{
			color: "powderblue",
			code: {
				hex: "#B0E0E6",
			},
			id: 148,
		},

		{
			color: "cadetblue 1",
			code: {
				hex: "#98F5FF",
			},
			id: 149,
		},

		{
			color: "cadetblue 2",
			code: {
				hex: "#8EE5EE",
			},
			id: 150,
		},

		{
			color: "cadetblue 3",
			code: {
				hex: "#7AC5CD",
			},
			id: 151,
		},

		{
			color: "cadetblue 4",
			code: {
				hex: "#53868B",
			},
			id: 152,
		},

		{
			color: "turquoise 1",
			code: {
				hex: "#00F5FF",
			},
			id: 153,
		},

		{
			color: "turquoise 2",
			code: {
				hex: "#00E5EE",
			},
			id: 154,
		},

		{
			color: "turquoise 3",
			code: {
				hex: "#00C5CD",
			},
			id: 155,
		},

		{
			color: "turquoise 4",
			code: {
				hex: "#00868B",
			},
			id: 156,
		},

		{
			color: "cadetblue",
			code: {
				hex: "#5F9EA0",
			},
			id: 157,
		},

		{
			color: "darkturquoise",
			code: {
				hex: "#00CED1",
			},
			id: 158,
		},

		{
			color: "azure 1 (azure)",
			code: {
				hex: "#F0FFFF",
			},
			id: 159,
		},

		{
			color: "azure 2",
			code: {
				hex: "#E0EEEE",
			},
			id: 160,
		},

		{
			color: "azure 3",
			code: {
				hex: "#C1CDCD",
			},
			id: 161,
		},

		{
			color: "azure 4",
			code: {
				hex: "#838B8B",
			},
			id: 162,
		},

		{
			color: "lightcyan 1 (lightcyan)",
			code: {
				hex: "#E0FFFF",
			},
			id: 163,
		},

		{
			color: "lightcyan 2",
			code: {
				hex: "#D1EEEE",
			},
			id: 164,
		},

		{
			color: "lightcyan 3",
			code: {
				hex: "#B4CDCD",
			},
			id: 165,
		},

		{
			color: "lightcyan 4",
			code: {
				hex: "#7A8B8B",
			},
			id: 166,
		},

		{
			color: "paleturquoise 1",
			code: {
				hex: "#BBFFFF",
			},
			id: 167,
		},

		{
			color: "paleturquoise 2 (paleturquoise)",
			code: {
				hex: "#AEEEEE",
			},
			id: 168,
		},

		{
			color: "paleturquoise 3",
			code: {
				hex: "#96CDCD",
			},
			id: 169,
		},

		{
			color: "paleturquoise 4",
			code: {
				hex: "#668B8B",
			},
			id: 170,
		},

		{
			color: "darkslategray",
			code: {
				hex: "#2F4F4F",
			},
			id: 171,
		},

		{
			color: "darkslategray 1",
			code: {
				hex: "#97FFFF",
			},
			id: 172,
		},

		{
			color: "darkslategray 2",
			code: {
				hex: "#8DEEEE",
			},
			id: 173,
		},

		{
			color: "darkslategray 3",
			code: {
				hex: "#79CDCD",
			},
			id: 174,
		},

		{
			color: "darkslategray 4",
			code: {
				hex: "#528B8B",
			},
			id: 175,
		},

		{
			color: "cyan / aqua*",
			code: {
				hex: "#00FFFF",
			},
			id: 176,
		},

		{
			color: "cyan 2",
			code: {
				hex: "#00EEEE",
			},
			id: 177,
		},

		{
			color: "cyan 3",
			code: {
				hex: "#00CDCD",
			},
			id: 178,
		},

		{
			color: "cyan 4 (darkcyan)",
			code: {
				hex: "#008B8B",
			},
			id: 179,
		},

		{
			color: "teal*",
			code: {
				hex: "#008080",
			},
			id: 180,
		},

		{
			color: "mediumturquoise",
			code: {
				hex: "#48D1CC",
			},
			id: 181,
		},

		{
			color: "lightseagreen",
			code: {
				hex: "#20B2AA",
			},
			id: 182,
		},

		{
			color: "manganeseblue",
			code: {
				hex: "#03A89E",
			},
			id: 183,
		},

		{
			color: "turquoise",
			code: {
				hex: "#40E0D0",
			},
			id: 184,
		},

		{
			color: "coldgrey",
			code: {
				hex: "#808A87",
			},
			id: 185,
		},

		{
			color: "turquoiseblue",
			code: {
				hex: "#00C78C",
			},
			id: 186,
		},

		{
			color: "aquamarine 1 (aquamarine)",
			code: {
				hex: "#7FFFD4",
			},
			id: 187,
		},

		{
			color: "aquamarine 2",
			code: {
				hex: "#76EEC6",
			},
			id: 188,
		},

		{
			color: "aquamarine 3 (mediumaquamarine)",
			code: {
				hex: "#66CDAA",
			},
			id: 189,
		},

		{
			color: "aquamarine 4",
			code: {
				hex: "#458B74",
			},
			id: 190,
		},

		{
			color: "mediumspringgreen",
			code: {
				hex: "#00FA9A",
			},
			id: 191,
		},

		{
			color: "mintcream",
			code: {
				hex: "#F5FFFA",
			},
			id: 192,
		},

		{
			color: "springgreen",
			code: {
				hex: "#00FF7F",
			},
			id: 193,
		},

		{
			color: "springgreen 1",
			code: {
				hex: "#00EE76",
			},
			id: 194,
		},

		{
			color: "springgreen 2",
			code: {
				hex: "#00CD66",
			},
			id: 195,
		},

		{
			color: "springgreen 3",
			code: {
				hex: "#008B45",
			},
			id: 196,
		},

		{
			color: "mediumseagreen",
			code: {
				hex: "#3CB371",
			},
			id: 197,
		},

		{
			color: "seagreen 1",
			code: {
				hex: "#54FF9F",
			},
			id: 198,
		},

		{
			color: "seagreen 2",
			code: {
				hex: "#4EEE94",
			},
			id: 199,
		},

		{
			color: "seagreen 3",
			code: {
				hex: "#43CD80",
			},
			id: 200,
		},

		{
			color: "seagreen 4 (seagreen)",
			code: {
				hex: "#2E8B57",
			},
			id: 201,
		},

		{
			color: "emeraldgreen",
			code: {
				hex: "#00C957",
			},
			id: 202,
		},

		{
			color: "mint",
			code: {
				hex: "#BDFCC9",
			},
			id: 203,
		},

		{
			color: "cobaltgreen",
			code: {
				hex: "#3D9140",
			},
			id: 204,
		},

		{
			color: "honeydew 1 (honeydew)",
			code: {
				hex: "#F0FFF0",
			},
			id: 205,
		},

		{
			color: "honeydew 2",
			code: {
				hex: "#E0EEE0",
			},
			id: 206,
		},

		{
			color: "honeydew 3",
			code: {
				hex: "#C1CDC1",
			},
			id: 207,
		},

		{
			color: "honeydew 4",
			code: {
				hex: "#838B83",
			},
			id: 208,
		},

		{
			color: "darkseagreen",
			code: {
				hex: "#8FBC8F",
			},
			id: 209,
		},

		{
			color: "darkseagreen 1",
			code: {
				hex: "#C1FFC1",
			},
			id: 210,
		},

		{
			color: "darkseagreen 2",
			code: {
				hex: "#B4EEB4",
			},
			id: 211,
		},

		{
			color: "darkseagreen 3",
			code: {
				hex: "#9BCD9B",
			},
			id: 212,
		},

		{
			color: "darkseagreen 4",
			code: {
				hex: "#698B69",
			},
			id: 213,
		},

		{
			color: "palegreen",
			code: {
				hex: "#98FB98",
			},
			id: 214,
		},

		{
			color: "palegreen 1",
			code: {
				hex: "#9AFF9A",
			},
			id: 215,
		},

		{
			color: "palegreen 2 (lightgreen)",
			code: {
				hex: "#90EE90",
			},
			id: 216,
		},

		{
			color: "palegreen 3",
			code: {
				hex: "#7CCD7C",
			},
			id: 217,
		},

		{
			color: "palegreen 4",
			code: {
				hex: "#548B54",
			},
			id: 218,
		},

		{
			color: "limegreen",
			code: {
				hex: "#32CD32",
			},
			id: 219,
		},

		{
			color: "forestgreen",
			code: {
				hex: "#228B22",
			},
			id: 220,
		},

		{
			color: "green 1 (lime*)",
			code: {
				hex: "#00FF00",
			},
			id: 221,
		},

		{
			color: "green 2",
			code: {
				hex: "#00EE00",
			},
			id: 222,
		},

		{
			color: "green 3",
			code: {
				hex: "#00CD00",
			},
			id: 223,
		},

		{
			color: "green 4",
			code: {
				hex: "#008B00",
			},
			id: 224,
		},

		{
			color: "green*",
			code: {
				hex: "#008000",
			},
			id: 225,
		},

		{
			color: "darkgreen",
			code: {
				hex: "#006400",
			},
			id: 226,
		},

		{
			color: "sapgreen",
			code: {
				hex: "#308014",
			},
			id: 227,
		},

		{
			color: "lawngreen",
			code: {
				hex: "#7CFC00",
			},
			id: 228,
		},

		{
			color: "chartreuse 1 (chartreuse)",
			code: {
				hex: "#7FFF00",
			},
			id: 229,
		},

		{
			color: "chartreuse 2",
			code: {
				hex: "#76EE00",
			},
			id: 230,
		},

		{
			color: "chartreuse 3",
			code: {
				hex: "#66CD00",
			},
			id: 231,
		},

		{
			color: "chartreuse 4",
			code: {
				hex: "#458B00",
			},
			id: 232,
		},

		{
			color: "greenyellow",
			code: {
				hex: "#ADFF2F",
			},
			id: 233,
		},

		{
			color: "darkolivegreen 1",
			code: {
				hex: "#CAFF70",
			},
			id: 234,
		},

		{
			color: "darkolivegreen 2",
			code: {
				hex: "#BCEE68",
			},
			id: 235,
		},

		{
			color: "darkolivegreen 3",
			code: {
				hex: "#A2CD5A",
			},
			id: 236,
		},

		{
			color: "darkolivegreen 4",
			code: {
				hex: "#6E8B3D",
			},
			id: 237,
		},

		{
			color: "darkolivegreen",
			code: {
				hex: "#556B2F",
			},
			id: 238,
		},

		{
			color: "olivedrab",
			code: {
				hex: "#6B8E23",
			},
			id: 239,
		},

		{
			color: "olivedrab 1",
			code: {
				hex: "#C0FF3E",
			},
			id: 240,
		},

		{
			color: "olivedrab 2",
			code: {
				hex: "#B3EE3A",
			},
			id: 241,
		},

		{
			color: "olivedrab 3 (yellowgreen)",
			code: {
				hex: "#9ACD32",
			},
			id: 242,
		},

		{
			color: "olivedrab 4",
			code: {
				hex: "#698B22",
			},
			id: 243,
		},

		{
			color: "ivory 1 (ivory)",
			code: {
				hex: "#FFFFF0",
			},
			id: 244,
		},

		{
			color: "ivory 2",
			code: {
				hex: "#EEEEE0",
			},
			id: 245,
		},

		{
			color: "ivory 3",
			code: {
				hex: "#CDCDC1",
			},
			id: 246,
		},

		{
			color: "ivory 4",
			code: {
				hex: "#8B8B83",
			},
			id: 247,
		},

		{
			color: "beige",
			code: {
				hex: "#F5F5DC",
			},
			id: 248,
		},

		{
			color: "lightyellow 1 (lightyellow)",
			code: {
				hex: "#FFFFE0",
			},
			id: 249,
		},

		{
			color: "lightyellow 2",
			code: {
				hex: "#EEEED1",
			},
			id: 250,
		},

		{
			color: "lightyellow 3",
			code: {
				hex: "#CDCDB4",
			},
			id: 251,
		},

		{
			color: "lightyellow 4",
			code: {
				hex: "#8B8B7A",
			},
			id: 252,
		},

		{
			color: "lightgoldenrodyellow",
			code: {
				hex: "#FAFAD2",
			},
			id: 253,
		},

		{
			color: "yellow 1 (yellow*)",
			code: {
				hex: "#FFFF00",
			},
			id: 254,
		},

		{
			color: "yellow 2",
			code: {
				hex: "#EEEE00",
			},
			id: 255,
		},

		{
			color: "yellow 3",
			code: {
				hex: "#CDCD00",
			},
			id: 256,
		},

		{
			color: "yellow 4",
			code: {
				hex: "#8B8B00",
			},
			id: 257,
		},

		{
			color: "warmgrey",
			code: {
				hex: "#808069",
			},
			id: 258,
		},

		{
			color: "olive*",
			code: {
				hex: "#808000",
			},
			id: 259,
		},

		{
			color: "darkkhaki",
			code: {
				hex: "#BDB76B",
			},
			id: 260,
		},

		{
			color: "khaki 1",
			code: {
				hex: "#FFF68F",
			},
			id: 261,
		},

		{
			color: "khaki 2",
			code: {
				hex: "#EEE685",
			},
			id: 262,
		},

		{
			color: "khaki 3",
			code: {
				hex: "#CDC673",
			},
			id: 263,
		},

		{
			color: "khaki 4",
			code: {
				hex: "#8B864E",
			},
			id: 264,
		},

		{
			color: "khaki",
			code: {
				hex: "#F0E68C",
			},
			id: 265,
		},

		{
			color: "palegoldenrod",
			code: {
				hex: "#EEE8AA",
			},
			id: 266,
		},

		{
			color: "lemonchiffon 1 (lemonchiffon)",
			code: {
				hex: "#FFFACD",
			},
			id: 267,
		},

		{
			color: "lemonchiffon 2",
			code: {
				hex: "#EEE9BF",
			},
			id: 268,
		},

		{
			color: "lemonchiffon 3",
			code: {
				hex: "#CDC9A5",
			},
			id: 269,
		},

		{
			color: "lemonchiffon 4",
			code: {
				hex: "#8B8970",
			},
			id: 270,
		},

		{
			color: "lightgoldenrod 1",
			code: {
				hex: "#FFEC8B",
			},
			id: 271,
		},

		{
			color: "lightgoldenrod 2",
			code: {
				hex: "#EEDC82",
			},
			id: 272,
		},

		{
			color: "lightgoldenrod 3",
			code: {
				hex: "#CDBE70",
			},
			id: 273,
		},

		{
			color: "lightgoldenrod 4",
			code: {
				hex: "#8B814C",
			},
			id: 274,
		},

		{
			color: "banana",
			code: {
				hex: "#E3CF57",
			},
			id: 275,
		},

		{
			color: "gold 1 (gold)",
			code: {
				hex: "#FFD700",
			},
			id: 276,
		},

		{
			color: "gold 2",
			code: {
				hex: "#EEC900",
			},
			id: 277,
		},

		{
			color: "gold 3",
			code: {
				hex: "#CDAD00",
			},
			id: 278,
		},

		{
			color: "gold 4",
			code: {
				hex: "#8B7500",
			},
			id: 279,
		},

		{
			color: "cornsilk 1 (cornsilk)",
			code: {
				hex: "#FFF8DC",
			},
			id: 280,
		},

		{
			color: "cornsilk 2",
			code: {
				hex: "#EEE8CD",
			},
			id: 281,
		},

		{
			color: "cornsilk 3",
			code: {
				hex: "#CDC8B1",
			},
			id: 282,
		},

		{
			color: "cornsilk 4",
			code: {
				hex: "#8B8878",
			},
			id: 283,
		},

		{
			color: "goldenrod",
			code: {
				hex: "#DAA520",
			},
			id: 284,
		},

		{
			color: "goldenrod 1",
			code: {
				hex: "#FFC125",
			},
			id: 285,
		},

		{
			color: "goldenrod 2",
			code: {
				hex: "#EEB422",
			},
			id: 286,
		},

		{
			color: "goldenrod 3",
			code: {
				hex: "#CD9B1D",
			},
			id: 287,
		},

		{
			color: "goldenrod 4",
			code: {
				hex: "#8B6914",
			},
			id: 288,
		},

		{
			color: "darkgoldenrod",
			code: {
				hex: "#B8860B",
			},
			id: 289,
		},

		{
			color: "darkgoldenrod 1",
			code: {
				hex: "#FFB90F",
			},
			id: 290,
		},

		{
			color: "darkgoldenrod 2",
			code: {
				hex: "#EEAD0E",
			},
			id: 291,
		},

		{
			color: "darkgoldenrod 3",
			code: {
				hex: "#CD950C",
			},
			id: 292,
		},

		{
			color: "darkgoldenrod 4",
			code: {
				hex: "#8B6508",
			},
			id: 293,
		},

		{
			color: "orange 1 (orange)",
			code: {
				hex: "#FFA500",
			},
			id: 294,
		},

		{
			color: "orange 2",
			code: {
				hex: "#EE9A00",
			},
			id: 295,
		},

		{
			color: "orange 3",
			code: {
				hex: "#CD8500",
			},
			id: 296,
		},

		{
			color: "orange 4",
			code: {
				hex: "#8B5A00",
			},
			id: 297,
		},

		{
			color: "floralwhite",
			code: {
				hex: "#FFFAF0",
			},
			id: 298,
		},

		{
			color: "oldlace",
			code: {
				hex: "#FDF5E6",
			},
			id: 299,
		},

		{
			color: "wheat",
			code: {
				hex: "#F5DEB3",
			},
			id: 300,
		},

		{
			color: "wheat 1",
			code: {
				hex: "#FFE7BA",
			},
			id: 301,
		},

		{
			color: "wheat 2",
			code: {
				hex: "#EED8AE",
			},
			id: 302,
		},

		{
			color: "wheat 3",
			code: {
				hex: "#CDBA96",
			},
			id: 303,
		},

		{
			color: "wheat 4",
			code: {
				hex: "#8B7E66",
			},
			id: 304,
		},

		{
			color: "moccasin",
			code: {
				hex: "#FFE4B5",
			},
			id: 305,
		},

		{
			color: "papayawhip",
			code: {
				hex: "#FFEFD5",
			},
			id: 306,
		},

		{
			color: "blanchedalmond",
			code: {
				hex: "#FFEBCD",
			},
			id: 307,
		},

		{
			color: "navajowhite 1 (navajowhite)",
			code: {
				hex: "#FFDEAD",
			},
			id: 308,
		},

		{
			color: "navajowhite 2",
			code: {
				hex: "#EECFA1",
			},
			id: 309,
		},

		{
			color: "navajowhite 3",
			code: {
				hex: "#CDB38B",
			},
			id: 310,
		},

		{
			color: "navajowhite 4",
			code: {
				hex: "#8B795E",
			},
			id: 311,
		},

		{
			color: "eggshell",
			code: {
				hex: "#FCE6C9",
			},
			id: 312,
		},

		{
			color: "tan",
			code: {
				hex: "#D2B48C",
			},
			id: 313,
		},

		{
			color: "brick",
			code: {
				hex: "#9C661F",
			},
			id: 314,
		},

		{
			color: "cadmiumyellow",
			code: {
				hex: "#FF9912",
			},
			id: 315,
		},

		{
			color: "antiquewhite",
			code: {
				hex: "#FAEBD7",
			},
			id: 316,
		},

		{
			color: "antiquewhite 1",
			code: {
				hex: "#FFEFDB",
			},
			id: 317,
		},

		{
			color: "antiquewhite 2",
			code: {
				hex: "#EEDFCC",
			},
			id: 318,
		},

		{
			color: "antiquewhite 3",
			code: {
				hex: "#CDC0B0",
			},
			id: 319,
		},

		{
			color: "antiquewhite 4",
			code: {
				hex: "#8B8378",
			},
			id: 320,
		},

		{
			color: "burlywood",
			code: {
				hex: "#DEB887",
			},
			id: 321,
		},

		{
			color: "burlywood 1",
			code: {
				hex: "#FFD39B",
			},
			id: 322,
		},

		{
			color: "burlywood 2",
			code: {
				hex: "#EEC591",
			},
			id: 323,
		},

		{
			color: "burlywood 3",
			code: {
				hex: "#CDAA7D",
			},
			id: 324,
		},

		{
			color: "burlywood 4",
			code: {
				hex: "#8B7355",
			},
			id: 325,
		},

		{
			color: "bisque 1 (bisque)",
			code: {
				hex: "#FFE4C4",
			},
			id: 326,
		},

		{
			color: "bisque 2",
			code: {
				hex: "#EED5B7",
			},
			id: 327,
		},

		{
			color: "bisque 3",
			code: {
				hex: "#CDB79E",
			},
			id: 328,
		},

		{
			color: "bisque 4",
			code: {
				hex: "#8B7D6B",
			},
			id: 329,
		},

		{
			color: "melon",
			code: {
				hex: "#E3A869",
			},
			id: 330,
		},

		{
			color: "carrot",
			code: {
				hex: "#ED9121",
			},
			id: 331,
		},

		{
			color: "darkorange",
			code: {
				hex: "#FF8C00",
			},
			id: 332,
		},

		{
			color: "darkorange 1",
			code: {
				hex: "#FF7F00",
			},
			id: 333,
		},

		{
			color: "darkorange 2",
			code: {
				hex: "#EE7600",
			},
			id: 334,
		},

		{
			color: "darkorange 3",
			code: {
				hex: "#CD6600",
			},
			id: 335,
		},

		{
			color: "darkorange 4",
			code: {
				hex: "#8B4500",
			},
			id: 336,
		},

		{
			color: "orange",
			code: {
				hex: "#FF8000",
			},
			id: 337,
		},

		{
			color: "tan 1",
			code: {
				hex: "#FFA54F",
			},
			id: 338,
		},

		{
			color: "tan 2",
			code: {
				hex: "#EE9A49",
			},
			id: 339,
		},

		{
			color: "tan 3 (peru)",
			code: {
				hex: "#CD853F",
			},
			id: 340,
		},

		{
			color: "tan 4",
			code: {
				hex: "#8B5A2B",
			},
			id: 341,
		},

		{
			color: "linen",
			code: {
				hex: "#FAF0E6",
			},
			id: 342,
		},

		{
			color: "peachpuff 1 (peachpuff)",
			code: {
				hex: "#FFDAB9",
			},
			id: 343,
		},

		{
			color: "peachpuff 2",
			code: {
				hex: "#EECBAD",
			},
			id: 344,
		},

		{
			color: "peachpuff 3",
			code: {
				hex: "#CDAF95",
			},
			id: 345,
		},

		{
			color: "peachpuff 4",
			code: {
				hex: "#8B7765",
			},
			id: 346,
		},

		{
			color: "seashell 1 (seashell)",
			code: {
				hex: "#FFF5EE",
			},
			id: 347,
		},

		{
			color: "seashell 2",
			code: {
				hex: "#EEE5DE",
			},
			id: 348,
		},

		{
			color: "seashell 3",
			code: {
				hex: "#CDC5BF",
			},
			id: 349,
		},

		{
			color: "seashell 4",
			code: {
				hex: "#8B8682",
			},
			id: 350,
		},

		{
			color: "sandybrown",
			code: {
				hex: "#F4A460",
			},
			id: 351,
		},

		{
			color: "rawsienna",
			code: {
				hex: "#C76114",
			},
			id: 352,
		},

		{
			color: "chocolate",
			code: {
				hex: "#D2691E",
			},
			id: 353,
		},

		{
			color: "chocolate 1",
			code: {
				hex: "#FF7F24",
			},
			id: 354,
		},

		{
			color: "chocolate 2",
			code: {
				hex: "#EE7621",
			},
			id: 355,
		},

		{
			color: "chocolate 3",
			code: {
				hex: "#CD661D",
			},
			id: 356,
		},

		{
			color: "chocolate 4 (saddlebrown)",
			code: {
				hex: "#8B4513",
			},
			id: 357,
		},

		{
			color: "ivoryblack",
			code: {
				hex: "#292421",
			},
			id: 358,
		},

		{
			color: "flesh",
			code: {
				hex: "#FF7D40",
			},
			id: 359,
		},

		{
			color: "cadmiumorange",
			code: {
				hex: "#FF6103",
			},
			id: 360,
		},

		{
			color: "burntsienna",
			code: {
				hex: "#8A360F",
			},
			id: 361,
		},

		{
			color: "sienna",
			code: {
				hex: "#A0522D",
			},
			id: 362,
		},

		{
			color: "sienna 1",
			code: {
				hex: "#FF8247",
			},
			id: 363,
		},

		{
			color: "sienna 2",
			code: {
				hex: "#EE7942",
			},
			id: 364,
		},

		{
			color: "sienna 3",
			code: {
				hex: "#CD6839",
			},
			id: 365,
		},

		{
			color: "sienna 4",
			code: {
				hex: "#8B4726",
			},
			id: 366,
		},

		{
			color: "lightsalmon 1 (lightsalmon)",
			code: {
				hex: "#FFA07A",
			},
			id: 367,
		},

		{
			color: "lightsalmon 2",
			code: {
				hex: "#EE9572",
			},
			id: 368,
		},

		{
			color: "lightsalmon 3",
			code: {
				hex: "#CD8162",
			},
			id: 369,
		},

		{
			color: "lightsalmon 4",
			code: {
				hex: "#8B5742",
			},
			id: 370,
		},

		{
			color: "coral",
			code: {
				hex: "#FF7F50",
			},
			id: 371,
		},

		{
			color: "orangered 1 (orangered)",
			code: {
				hex: "#FF4500",
			},
			id: 372,
		},

		{
			color: "orangered 2",
			code: {
				hex: "#EE4000",
			},
			id: 373,
		},

		{
			color: "orangered 3",
			code: {
				hex: "#CD3700",
			},
			id: 374,
		},

		{
			color: "orangered 4",
			code: {
				hex: "#8B2500",
			},
			id: 375,
		},

		{
			color: "sepia",
			code: {
				hex: "#5E2612",
			},
			id: 376,
		},

		{
			color: "darksalmon",
			code: {
				hex: "#E9967A",
			},
			id: 377,
		},

		{
			color: "salmon 1",
			code: {
				hex: "#FF8C69",
			},
			id: 378,
		},

		{
			color: "salmon 2",
			code: {
				hex: "#EE8262",
			},
			id: 379,
		},

		{
			color: "salmon 3",
			code: {
				hex: "#CD7054",
			},
			id: 380,
		},

		{
			color: "salmon 4",
			code: {
				hex: "#8B4C39",
			},
			id: 381,
		},

		{
			color: "coral 1",
			code: {
				hex: "#FF7256",
			},
			id: 382,
		},

		{
			color: "coral 2",
			code: {
				hex: "#EE6A50",
			},
			id: 383,
		},

		{
			color: "coral 3",
			code: {
				hex: "#CD5B45",
			},
			id: 384,
		},

		{
			color: "coral 4",
			code: {
				hex: "#8B3E2F",
			},
			id: 385,
		},

		{
			color: "burntumber",
			code: {
				hex: "#8A3324",
			},
			id: 386,
		},

		{
			color: "tomato 1 (tomato)",
			code: {
				hex: "#FF6347",
			},
			id: 387,
		},

		{
			color: "tomato 2",
			code: {
				hex: "#EE5C42",
			},
			id: 388,
		},

		{
			color: "tomato 3",
			code: {
				hex: "#CD4F39",
			},
			id: 389,
		},

		{
			color: "tomato 4",
			code: {
				hex: "#8B3626",
			},
			id: 390,
		},

		{
			color: "salmon",
			code: {
				hex: "#FA8072",
			},
			id: 391,
		},

		{
			color: "mistyrose 1 (mistyrose)",
			code: {
				hex: "#FFE4E1",
			},
			id: 392,
		},

		{
			color: "mistyrose 2",
			code: {
				hex: "#EED5D2",
			},
			id: 393,
		},

		{
			color: "mistyrose 3",
			code: {
				hex: "#CDB7B5",
			},
			id: 394,
		},

		{
			color: "mistyrose 4",
			code: {
				hex: "#8B7D7B",
			},
			id: 395,
		},

		{
			color: "snow 1 (snow)",
			code: {
				hex: "#FFFAFA",
			},
			id: 396,
		},

		{
			color: "snow 2",
			code: {
				hex: "#EEE9E9",
			},
			id: 397,
		},

		{
			color: "snow 3",
			code: {
				hex: "#CDC9C9",
			},
			id: 398,
		},

		{
			color: "snow 4",
			code: {
				hex: "#8B8989",
			},
			id: 399,
		},

		{
			color: "rosybrown",
			code: {
				hex: "#BC8F8F",
			},
			id: 400,
		},

		{
			color: "rosybrown 1",
			code: {
				hex: "#FFC1C1",
			},
			id: 401,
		},

		{
			color: "rosybrown 2",
			code: {
				hex: "#EEB4B4",
			},
			id: 402,
		},

		{
			color: "rosybrown 3",
			code: {
				hex: "#CD9B9B",
			},
			id: 403,
		},

		{
			color: "rosybrown 4",
			code: {
				hex: "#8B6969",
			},
			id: 404,
		},

		{
			color: "lightcoral",
			code: {
				hex: "#F08080",
			},
			id: 405,
		},

		{
			color: "indianred",
			code: {
				hex: "#CD5C5C",
			},
			id: 406,
		},

		{
			color: "indianred 1",
			code: {
				hex: "#FF6A6A",
			},
			id: 407,
		},

		{
			color: "indianred 2",
			code: {
				hex: "#EE6363",
			},
			id: 408,
		},

		{
			color: "indianred 4",
			code: {
				hex: "#8B3A3A",
			},
			id: 409,
		},

		{
			color: "indianred 3",
			code: {
				hex: "#CD5555",
			},
			id: 410,
		},

		{
			color: "brown",
			code: {
				hex: "#A52A2A",
			},
			id: 411,
		},

		{
			color: "brown 1",
			code: {
				hex: "#FF4040",
			},
			id: 412,
		},

		{
			color: "brown 2",
			code: {
				hex: "#EE3B3B",
			},
			id: 413,
		},

		{
			color: "brown 3",
			code: {
				hex: "#CD3333",
			},
			id: 414,
		},

		{
			color: "brown 4",
			code: {
				hex: "#8B2323",
			},
			id: 415,
		},

		{
			color: "firebrick",
			code: {
				hex: "#B22222",
			},
			id: 416,
		},

		{
			color: "firebrick 1",
			code: {
				hex: "#FF3030",
			},
			id: 417,
		},

		{
			color: "firebrick 2",
			code: {
				hex: "#EE2C2C",
			},
			id: 418,
		},

		{
			color: "firebrick 3",
			code: {
				hex: "#CD2626",
			},
			id: 419,
		},

		{
			color: "firebrick 4",
			code: {
				hex: "#8B1A1A",
			},
			id: 420,
		},

		{
			color: "red 1 (red*)",
			code: {
				hex: "#FF0000",
			},
			id: 421,
		},

		{
			color: "red 2",
			code: {
				hex: "#EE0000",
			},
			id: 422,
		},

		{
			color: "red 3",
			code: {
				hex: "#CD0000",
			},
			id: 423,
		},

		{
			color: "red 4 (darkred)",
			code: {
				hex: "#8B0000",
			},
			id: 424,
		},

		{
			color: "maroon*",
			code: {
				hex: "#800000",
			},
			id: 425,
		},

		{
			color: "sgi beet",
			code: {
				hex: "#8E388E",
			},
			id: 426,
		},

		{
			color: "sgi slateblue",
			code: {
				hex: "#7171C6",
			},
			id: 427,
		},

		{
			color: "sgi lightblue",
			code: {
				hex: "#7D9EC0",
			},
			id: 428,
		},

		{
			color: "sgi teal",
			code: {
				hex: "#388E8E",
			},
			id: 429,
		},

		{
			color: "sgi chartreuse",
			code: {
				hex: "#71C671",
			},
			id: 430,
		},

		{
			color: "sgi olivedrab",
			code: {
				hex: "#8E8E38",
			},
			id: 431,
		},

		{
			color: "sgi brightgray",
			code: {
				hex: "#C5C1AA",
			},
			id: 432,
		},

		{
			color: "sgi salmon",
			code: {
				hex: "#C67171",
			},
			id: 433,
		},

		{
			color: "sgi darkgray",
			code: {
				hex: "#555555",
			},
			id: 434,
		},

		{
			color: "sgi gray 12",
			code: {
				hex: "#1E1E1E",
			},
			id: 435,
		},

		{
			color: "sgi gray 16",
			code: {
				hex: "#282828",
			},
			id: 436,
		},

		{
			color: "sgi gray 32",
			code: {
				hex: "#515151",
			},
			id: 437,
		},

		{
			color: "sgi gray 36",
			code: {
				hex: "#5B5B5B",
			},
			id: 438,
		},

		{
			color: "sgi gray 52",
			code: {
				hex: "#848484",
			},
			id: 439,
		},

		{
			color: "sgi gray 56",
			code: {
				hex: "#8E8E8E",
			},
			id: 440,
		},

		{
			color: "sgi lightgray",
			code: {
				hex: "#AAAAAA",
			},
			id: 441,
		},

		{
			color: "sgi gray 72",
			code: {
				hex: "#B7B7B7",
			},
			id: 442,
		},

		{
			color: "sgi gray 76",
			code: {
				hex: "#C1C1C1",
			},
			id: 443,
		},

		{
			color: "sgi gray 92",
			code: {
				hex: "#EAEAEA",
			},
			id: 444,
		},

		{
			color: "sgi gray 96",
			code: {
				hex: "#F4F4F4",
			},
			id: 445,
		},

		{
			color: "white*",
			code: {
				hex: "#FFFFFF",
			},
			id: 446,
		},

		{
			color: "white smoke (gray 96)",
			code: {
				hex: "#F5F5F5",
			},
			id: 447,
		},

		{
			color: "gainsboro",
			code: {
				hex: "#DCDCDC",
			},
			id: 448,
		},

		{
			color: "lightgrey",
			code: {
				hex: "#D3D3D3",
			},
			id: 449,
		},

		{
			color: "silver*",
			code: {
				hex: "#C0C0C0",
			},
			id: 450,
		},

		{
			color: "darkgray",
			code: {
				hex: "#A9A9A9",
			},
			id: 451,
		},

		{
			color: "gray*",
			code: {
				hex: "#808080",
			},
			id: 452,
		},

		{
			color: "dimgray (gray 42)",
			code: {
				hex: "#696969",
			},
			id: 453,
		},

		{
			color: "black*",
			code: {
				hex: "#000000",
			},
			id: 454,
		},

		{
			color: "gray 99",
			code: {
				hex: "#FCFCFC",
			},
			id: 455,
		},

		{
			color: "gray 98",
			code: {
				hex: "#FAFAFA",
			},
			id: 456,
		},

		{
			color: "gray 97",
			code: {
				hex: "#F7F7F7",
			},
			id: 457,
		},

		{
			color: "white smoke (gray 96)",
			code: {
				hex: "#F5F5F5",
			},
			id: 458,
		},

		{
			color: "gray 95",
			code: {
				hex: "#F2F2F2",
			},
			id: 459,
		},

		{
			color: "gray 94",
			code: {
				hex: "#F0F0F0",
			},
			id: 460,
		},

		{
			color: "gray 93",
			code: {
				hex: "#EDEDED",
			},
			id: 461,
		},

		{
			color: "gray 92",
			code: {
				hex: "#EBEBEB",
			},
			id: 462,
		},

		{
			color: "gray 91",
			code: {
				hex: "#E8E8E8",
			},
			id: 463,
		},

		{
			color: "gray 90",
			code: {
				hex: "#E5E5E5",
			},
			id: 464,
		},

		{
			color: "gray 89",
			code: {
				hex: "#E3E3E3",
			},
			id: 465,
		},

		{
			color: "gray 88",
			code: {
				hex: "#E0E0E0",
			},
			id: 466,
		},

		{
			color: "gray 87",
			code: {
				hex: "#DEDEDE",
			},
			id: 467,
		},

		{
			color: "gray 86",
			code: {
				hex: "#DBDBDB",
			},
			id: 468,
		},

		{
			color: "gray 85",
			code: {
				hex: "#D9D9D9",
			},
			id: 469,
		},

		{
			color: "gray 84",
			code: {
				hex: "#D6D6D6",
			},
			id: 470,
		},

		{
			color: "gray 83",
			code: {
				hex: "#D4D4D4",
			},
			id: 471,
		},

		{
			color: "gray 82",
			code: {
				hex: "#D1D1D1",
			},
			id: 472,
		},

		{
			color: "gray 81",
			code: {
				hex: "#CFCFCF",
			},
			id: 473,
		},

		{
			color: "gray 80",
			code: {
				hex: "#CCCCCC",
			},
			id: 474,
		},

		{
			color: "gray 79",
			code: {
				hex: "#C9C9C9",
			},
			id: 475,
		},

		{
			color: "gray 78",
			code: {
				hex: "#C7C7C7",
			},
			id: 476,
		},

		{
			color: "gray 77",
			code: {
				hex: "#C4C4C4",
			},
			id: 477,
		},

		{
			color: "gray 76",
			code: {
				hex: "#C2C2C2",
			},
			id: 478,
		},

		{
			color: "gray 75",
			code: {
				hex: "#BFBFBF",
			},
			id: 479,
		},

		{
			color: "gray 74",
			code: {
				hex: "#BDBDBD",
			},
			id: 480,
		},

		{
			color: "gray 73",
			code: {
				hex: "#BABABA",
			},
			id: 481,
		},

		{
			color: "gray 72",
			code: {
				hex: "#B8B8B8",
			},
			id: 482,
		},

		{
			color: "gray 71",
			code: {
				hex: "#B5B5B5",
			},
			id: 483,
		},

		{
			color: "gray 70",
			code: {
				hex: "#B3B3B3",
			},
			id: 484,
		},

		{
			color: "gray 69",
			code: {
				hex: "#B0B0B0",
			},
			id: 485,
		},

		{
			color: "gray 68",
			code: {
				hex: "#ADADAD",
			},
			id: 486,
		},

		{
			color: "gray 67",
			code: {
				hex: "#ABABAB",
			},
			id: 487,
		},

		{
			color: "gray 66",
			code: {
				hex: "#A8A8A8",
			},
			id: 488,
		},

		{
			color: "gray 65",
			code: {
				hex: "#A6A6A6",
			},
			id: 489,
		},

		{
			color: "gray 64",
			code: {
				hex: "#A3A3A3",
			},
			id: 490,
		},

		{
			color: "gray 63",
			code: {
				hex: "#A1A1A1",
			},
			id: 491,
		},

		{
			color: "gray 62",
			code: {
				hex: "#9E9E9E",
			},
			id: 492,
		},

		{
			color: "gray 61",
			code: {
				hex: "#9C9C9C",
			},
			id: 493,
		},

		{
			color: "gray 60",
			code: {
				hex: "#999999",
			},
			id: 494,
		},

		{
			color: "gray 59",
			code: {
				hex: "#969696",
			},
			id: 495,
		},

		{
			color: "gray 58",
			code: {
				hex: "#949494",
			},
			id: 496,
		},

		{
			color: "gray 57",
			code: {
				hex: "#919191",
			},
			id: 497,
		},

		{
			color: "gray 56",
			code: {
				hex: "#8F8F8F",
			},
			id: 498,
		},

		{
			color: "gray 55",
			code: {
				hex: "#8C8C8C",
			},
			id: 499,
		},

		{
			color: "gray 54",
			code: {
				hex: "#8A8A8A",
			},
			id: 500,
		},

		{
			color: "gray 53",
			code: {
				hex: "#878787",
			},
			id: 501,
		},

		{
			color: "gray 52",
			code: {
				hex: "#858585",
			},
			id: 502,
		},

		{
			color: "gray 51",
			code: {
				hex: "#828282",
			},
			id: 503,
		},

		{
			color: "gray 50",
			code: {
				hex: "#7F7F7F",
			},
			id: 504,
		},

		{
			color: "gray 49",
			code: {
				hex: "#7D7D7D",
			},
			id: 505,
		},

		{
			color: "gray 48",
			code: {
				hex: "#7A7A7A",
			},
			id: 506,
		},

		{
			color: "gray 47",
			code: {
				hex: "#787878",
			},
			id: 507,
		},

		{
			color: "gray 46",
			code: {
				hex: "#757575",
			},
			id: 508,
		},

		{
			color: "gray 45",
			code: {
				hex: "#737373",
			},
			id: 509,
		},

		{
			color: "gray 44",
			code: {
				hex: "#707070",
			},
			id: 510,
		},

		{
			color: "gray 43",
			code: {
				hex: "#6E6E6E",
			},
			id: 511,
		},

		{
			color: "gray 42",
			code: {
				hex: "#6B6B6B",
			},
			id: 512,
		},

		{
			color: "dimgray (gray 42)",
			code: {
				hex: "#696969",
			},
			id: 513,
		},

		{
			color: "gray 40",
			code: {
				hex: "#666666",
			},
			id: 514,
		},

		{
			color: "gray 39",
			code: {
				hex: "#636363",
			},
			id: 515,
		},

		{
			color: "gray 38",
			code: {
				hex: "#616161",
			},
			id: 516,
		},

		{
			color: "gray 37",
			code: {
				hex: "#5E5E5E",
			},
			id: 517,
		},

		{
			color: "gray 36",
			code: {
				hex: "#5C5C5C",
			},
			id: 518,
		},

		{
			color: "gray 35",
			code: {
				hex: "#595959",
			},
			id: 519,
		},

		{
			color: "gray 34",
			code: {
				hex: "#575757",
			},
			id: 520,
		},

		{
			color: "gray 33",
			code: {
				hex: "#545454",
			},
			id: 521,
		},

		{
			color: "gray 32",
			code: {
				hex: "#525252",
			},
			id: 522,
		},

		{
			color: "gray 31",
			code: {
				hex: "#4F4F4F",
			},
			id: 523,
		},

		{
			color: "gray 30",
			code: {
				hex: "#4D4D4D",
			},
			id: 524,
		},

		{
			color: "gray 29",
			code: {
				hex: "#4A4A4A",
			},
			id: 525,
		},

		{
			color: "gray 28",
			code: {
				hex: "#474747",
			},
			id: 526,
		},

		{
			color: "gray 27",
			code: {
				hex: "#454545",
			},
			id: 527,
		},

		{
			color: "gray 26",
			code: {
				hex: "#424242",
			},
			id: 528,
		},

		{
			color: "gray 25",
			code: {
				hex: "#404040",
			},
			id: 529,
		},

		{
			color: "gray 24",
			code: {
				hex: "#3D3D3D",
			},
			id: 530,
		},

		{
			color: "gray 23",
			code: {
				hex: "#3B3B3B",
			},
			id: 531,
		},

		{
			color: "gray 22",
			code: {
				hex: "#383838",
			},
			id: 532,
		},

		{
			color: "gray 21",
			code: {
				hex: "#363636",
			},
			id: 533,
		},

		{
			color: "gray 20",
			code: {
				hex: "#333333",
			},
			id: 534,
		},

		{
			color: "gray 19",
			code: {
				hex: "#303030",
			},
			id: 535,
		},

		{
			color: "gray 18",
			code: {
				hex: "#2E2E2E",
			},
			id: 536,
		},

		{
			color: "gray 17",
			code: {
				hex: "#2B2B2B",
			},
			id: 537,
		},

		{
			color: "gray 16",
			code: {
				hex: "#292929",
			},
			id: 538,
		},

		{
			color: "gray 15",
			code: {
				hex: "#262626",
			},
			id: 539,
		},

		{
			color: "gray 14",
			code: {
				hex: "#242424",
			},
			id: 540,
		},

		{
			color: "gray 13",
			code: {
				hex: "#212121",
			},
			id: 541,
		},

		{
			color: "gray 12",
			code: {
				hex: "#1F1F1F",
			},
			id: 542,
		},

		{
			color: "gray 11",
			code: {
				hex: "#1C1C1C",
			},
			id: 543,
		},

		{
			color: "gray 10",
			code: {
				hex: "#1A1A1A",
			},
			id: 544,
		},

		{
			color: "gray 9",
			code: {
				hex: "#171717",
			},
			id: 545,
		},

		{
			color: "gray 8",
			code: {
				hex: "#141414",
			},
			id: 546,
		},

		{
			color: "gray 7",
			code: {
				hex: "#121212",
			},
			id: 547,
		},

		{
			color: "gray 6",
			code: {
				hex: "#0F0F0F",
			},
			id: 548,
		},

		{
			color: "gray 5",
			code: {
				hex: "#0D0D0D",
			},
			id: 549,
		},

		{
			color: "gray 4",
			code: {
				hex: "#0A0A0A",
			},
			id: 550,
		},

		{
			color: "gray 3",
			code: {
				hex: "#080808",
			},
			id: 551,
		},

		{
			color: "gray 2",
			code: {
				hex: "#050505",
			},
			id: 552,
		},

		{
			color: "gray 1",
			code: {
				hex: "#030303",
			},
			id: 553,
		},
	]
	const randomcolor = colors[Math.floor(Math.random() * colors.length)]

	await interaction
		.editReply({
			content: `Color: ${randomcolor.color}\nHex: ${randomcolor.code.hex}`,
		})
		.catch((err) => {})
}
