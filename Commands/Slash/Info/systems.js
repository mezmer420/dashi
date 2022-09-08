const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("systems")
	.setDescription("View systems statuses")

module.exports.category = "Info"

module.exports.run = async ({ client, interaction, Systems, defaultColor }) => {
	const xpData = await Systems.findOne({
		where: { system: "XP" },
	})

	let xpStatus

	if (xpData.online === true) {
		xpStatus = "🟢 Online"
	} else if (xpData.online === false) {
		xpStatus = "🔴 Offline"
	}

	const dialectsData = await Systems.findOne({
		where: { system: "Dialects" },
	})

	let dialectsStatus

	if (dialectsData.online === true) {
		dialectsStatus = "🟢 Online"
	} else if (dialectsData.online === false) {
		dialectsStatus = "🔴 Offline"
	}

	const generalresponsesData = await Systems.findOne({
		where: { system: "General Responses" },
	})

	let generalresponsesStatus

	if (generalresponsesData.online === true) {
		generalresponsesStatus = "🟢 Online"
	} else if (generalresponsesData.online === false) {
		generalresponsesStatus = "🔴 Offline"
	}

	const economyData = await Systems.findOne({
		where: { system: "Economy" },
	})

	let economyStatus

	if (economyData.online === true) {
		economyStatus = "🟢 Online"
	} else if (economyData.online === false) {
		economyStatus = "🔴 Offline"
	}

	const musicData = await Systems.findOne({
		where: { system: "Music" },
	})

	let musicStatus

	if (musicData.online === true) {
		musicStatus = "🟢 Online"
	} else if (musicData.online === false) {
		musicStatus = "🔴 Offline"
	}

	const waifusData = await Systems.findOne({
		where: { system: "Waifus" },
	})

	let waifusStatus

	if (waifusData.online === true) {
		waifusStatus = "🟢 Online"
	} else if (waifusData.online === false) {
		waifusStatus = "🔴 Offline"
	}

	const birthdaysData = await Systems.findOne({
		where: { system: "Birthdays" },
	})

	let birthdaysStatus

	if (birthdaysData.online === true) {
		birthdaysStatus = "🟢 Online"
	} else if (birthdaysData.online === false) {
		birthdaysStatus = "🔴 Offline"
	}

	const frickingData = await Systems.findOne({
		where: { system: "Fricking" },
	})

	let frickingStatus

	if (frickingData.online === true) {
		frickingStatus = "🟢 Online"
	} else if (frickingData.online === false) {
		frickingStatus = "🔴 Offline"
	}

	const messagefilterandautowarnData = await Systems.findOne({
		where: { system: "Message Filter & Auto Warn" },
	})

	let messagefilterandautowarnStatus

	if (messagefilterandautowarnData.online === true) {
		messagefilterandautowarnStatus = "🟢 Online"
	} else if (messagefilterandautowarnData.online === false) {
		messagefilterandautowarnStatus = "🔴 Offline"
	}

	const crazysuppressData = await Systems.findOne({
		where: { system: "Crazy Suppress" },
	})

	let crazysuppressStatus

	if (crazysuppressData.online === true) {
		crazysuppressStatus = "🟢 Online"
	} else if (crazysuppressData.online === false) {
		crazysuppressStatus = "🔴 Offline"
	}

	const anticrashData = await Systems.findOne({
		where: { system: "Anti-crash Logging" },
	})

	let anticrashStatus

	if (anticrashData.online === true) {
		anticrashStatus = "🟢 Online"
	} else if (anticrashData.online === false) {
		anticrashStatus = "🔴 Offline"
	}

	const dashi = await client.users.fetch("956345939130482750")

	const Embed = new EmbedBuilder()
		.setColor(defaultColor)
		.setAuthor({
			name: "Systems",
			iconURL: dashi.displayAvatarURL({
				size: 4096,
				dynamic: true,
			}),
		})
		.addFields(
			{
				name: "XP",
				value: `${xpStatus}`,
				inline: true,
			},
			{
				name: "Dialects",
				value: `${dialectsStatus}`,
				inline: true,
			},
			{
				name: "General Responses",
				value: `${generalresponsesStatus}`,
				inline: true,
			},
			{
				name: "Economy",
				value: `${economyStatus}`,
				inline: true,
			},
			{
				name: "Music",
				value: `${musicStatus}`,
				inline: true,
			},
			{
				name: "Waifus",
				value: `${waifusStatus}`,
				inline: true,
			},
			{
				name: "Birthdays",
				value: `${birthdaysStatus}`,
				inline: true,
			},
			{
				name: "Fricking",
				value: `${frickingStatus}`,
				inline: true,
			},
			{
				name: "Message Filter & Auto Warn",
				value: `${messagefilterandautowarnStatus}`,
				inline: true,
			},
			{
				name: "Crazy Suppress",
				value: `${crazysuppressStatus}`,
				inline: true,
			},
			{
				name: "Anti-crash Logging",
				value: `${anticrashStatus}`,
				inline: true,
			}
		)
		.setTimestamp()
	// .setFooter({
	// 	text: "*Only controls logging; anti-crash system is always on",
	// })

	return await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
