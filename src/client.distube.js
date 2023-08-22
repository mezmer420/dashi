const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")
const { YtDlpPlugin } = require("@distube/yt-dlp")
const { youtubeCookie } = process.env

module.exports = (client) => {
	client.distube = new DisTube(client, {
		plugins: [
			new SpotifyPlugin({
				emitEventsAfterFetching: true,
			}),
			new SoundCloudPlugin(),
			new YtDlpPlugin(),
		],
		emitNewSongOnly: true,
		leaveOnEmpty: false,
		leaveOnStop: false,
		youtubeCookie: youtubeCookie,
		customFilters: {
			"8d": "apulsator=hz=0.09",
			cursed: "vibrato=f=6.5,tremolo,aresample=48000,asetrate=48000*1.25",
			earrape: "channelsplit,sidechaingate=level_in=64",
			normalizer: "dynaudnorm=f=200",
			purebass: "bass=g=20,dynaudnorm=f=200,asubboost,apulsator=hz=0.08",
			treble: "treble=g=5",
			vibrato: "vibrato=f=6.5",
		},
		ytdlOptions: {
			quality: "highestaudio",
			highWaterMark: 1 << 25,
		},
		nsfw: true,
	})
}
