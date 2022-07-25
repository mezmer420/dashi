const { ChannelType } = require("discord.js")

module.exports = {
	callback: async (client, message, args) => {
		if (message.channel.type !== ChannelType.GuildText) return
		
		const cocks = [
			"https://img.hobbyfarms.com/wp-content/uploads/2017/10/05200837/big-rooster-689001268.jpg",
			"https://thumbs.dreamstime.com/b/beautiful-big-white-rooster-village-190230667.jpg",
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/11b2e3a2-fbf2-4a7c-8488-0dddfba67bb1/ddd7ljo-294ab3e8-7c12-453f-a9ee-9d90615cf617.jpg/v1/fill/w_1280,h_1610,q_75,strp/big_rooster_by_studencik_ddd7ljo-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYxMCIsInBhdGgiOiJcL2ZcLzExYjJlM2EyLWZiZjItNGE3Yy04NDg4LTBkZGRmYmE2N2JiMVwvZGRkN2xqby0yOTRhYjNlOC03YzEyLTQ1M2YtYTllZS05ZDkwNjE1Y2Y2MTcuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.wyYdVA5_A1KcZEpW43r5aZe-2h3ZlcCtjjOFD0TN4Tc",
			"https://i.ytimg.com/vi/CD6WSG-CU-8/maxresdefault.jpg",
			"https://as1.ftcdn.net/v2/jpg/03/06/48/68/1000_F_306486875_4n6usZREUd0lzKVZinlcJBBAAicnGmHB.jpg",
		]
		const cock = cocks[Math.floor(Math.random() * cocks.length)]

		message.channel.send(cock).catch((err) => {
			console.log(err)
		})
	},
}
