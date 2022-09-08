const DarkDashboard = require("dbd-dark-dashboard")
const DBD = require("discord-dashboard")
const config = require("../config.json")
const { rawCommands } = require("../slash-register")

module.exports.run = async ({ client }) => {
	let Admins = []
	let Economy = []
	let Fricking = []
	let Fun = []
	let Government = []
	let Info = []
	let Music = []
	let Owner = []
	let Utilities = []
	let Waifus = []

	const admins = rawCommands.filter((x) => x.category === "Admins")
	const economy = rawCommands.filter((x) => x.category === "Economy")
	const fricking = rawCommands.filter((x) => x.category === "Fricking")
	const fun = rawCommands.filter((x) => x.category === "Fun")
	const government = rawCommands.filter((x) => x.category === "Government")
	const info = rawCommands.filter((x) => x.category === "Info")
	const music = rawCommands.filter((x) => x.category === "Music")
	const owner = rawCommands.filter((x) => x.category === "Owner")
	const utilities = rawCommands.filter((x) => x.category === "Utilities")
	const waifus = rawCommands.filter((x) => x.category === "Waifus")

	CommandPush(admins, Admins)
	CommandPush(economy, Economy)
	CommandPush(fricking, Fricking)
	CommandPush(fun, Fun)
	CommandPush(government, Government)
	CommandPush(info, Info)
	CommandPush(music, Music)
	CommandPush(owner, Owner)
	CommandPush(utilities, Utilities)
	CommandPush(waifus, Waifus)

	await DBD.useLicense(config.DBD)

	DBD.Dashboard = DBD.UpdatedClass()

	const Dashboard = new DBD.Dashboard({
		port: 8000,
		client: {
			id: config.client_id,
			secret: config.client_secret,
		},
		redirectUri: "http://localhost:8000/discord/callback",
		domain: "http://localhost",
		bot: client,
		supportServer: {
			slash: "/support",
			inviteUrl: "https://discord.com/invite/yxR34AfJ",
		},
		acceptPrivacyPolicy: true,
		minimizedConsoleLogs: true,
		guildAfterAuthorization: {
			use: true,
			guildId: "939674946379083847",
		},
		invite: {
			clientId: client.user.id,
			scopes: ["bot", "applications.commands", "guilds", "identify"],
			permissions: "8",
			redirectUri: "https://discord.com/invite/yxR34AfJ",
		},
		theme: DarkDashboard({
			information: {
				createdBy: "iMidnight",
				websiteTitle: "iMidnight",
				websiteName: "iMidnight",
				websiteUrl: "https:/www.imidnight.ml/",
				dashboardUrl: "http://localhost:3000/",
				supporteMail: "support@imidnight.ml",
				supportServer: "https://discord.gg/yYq4UgRRzz",
				imageFavicon:
					"https://www.imidnight.ml/assets/img/logo-circular.png",
				iconURL:
					"https://www.imidnight.ml/assets/img/logo-circular.png",
				loggedIn: "Successfully signed in.",
				mainColor: "#2CA8FF",
				subColor: "#ebdbdb",
				preloader: "Loading...",
			},

			index: {
				card: {
					category: "iMidnight's Panel - The center of everything",
					title: `Welcome to the iMidnight discord where you can control the core features to the bot.`,
					image: "https://i.imgur.com/axnP93g.png",
					footer: "Footer",
				},

				information: {
					category: "Category",
					title: "Information",
					description: `This bot and panel is currently a work in progress so contact me if you find any issues on discord.`,
					footer: "Footer",
				},

				feeds: {
					category: "Category",
					title: "Information",
					description: `This bot and panel is currently a work in progress so contact me if you find any issues on discord.`,
					footer: "Footer",
				},
			},

			commands: [
				{
					category: "Admins",
					subTitle: "Admin Commands",
					aliasesDisabled: false,
					list: Admins,
				},
				{
					category: "Economy",
					subTitle: "Economy Commands",
					aliasesDisabled: false,
					list: Economy,
				},
				{
					category: "Fricking",
					subTitle: "Fricking Commands",
					aliasesDisabled: false,
					list: Fricking,
				},
				{
					category: "Fun",
					subTitle: "Fun Commands",
					aliasesDisabled: false,
					list: Fun,
				},
				{
					category: "Government",
					subTitle: "Government Commands",
					aliasesDisabled: false,
					list: Government,
				},
				{
					category: "Info",
					subTitle: "Info Commands",
					aliasesDisabled: false,
					list: Info,
				},
				{
					category: "Music",
					subTitle: "Music Commands",
					aliasesDisabled: false,
					list: Music,
				},
				{
					category: "Owner",
					subTitle: "Owner Commands",
					aliasesDisabled: false,
					list: Owner,
				},
				{
					category: "Utilities",
					subTitle: "Utilities Commands",
					aliasesDisabled: false,
					list: Utilities,
				},
				{
					category: "Waifus",
					subTitle: "Waifus Commands",
					aliasesDisabled: false,
					list: Waifus,
				},
			],
		}),
		settings: [],
	})

	Dashboard.init()
}

function CommandPush(filteredArray, CategoryArray) {
	filteredArray.forEach((obj) => {
		let cmdObject = {
			commandName: obj.data.name,
			commandUsage: "/" + obj.data.name,
			commandDescription: obj.data.description,
			commandAlias: "None",
		}

		CategoryArray.push(cmdObject)
	})
}
