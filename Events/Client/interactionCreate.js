const {
	Systems,
	basicxp,
	Dialects,
	Tickets,
	Infraction,
	Economy,
	Items,
	dailyCooldown,
	workCooldown,
	begCooldown,
	robCooldown,
	Waifus,
	Birthday,
	Spam,
	Fricking,
	frickingCooldown,
	Suppress,
	Counting,
} = require("../../database")

const { commands } = require("../../slash-register")

const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ChannelType,
} = require("discord.js")

const everyoneid = "939674946379083847"
const categoryid = "991803066686898246"
const openticketid = "982689993195667527"
const transcriptsid = "991804401033416774"

module.exports = {
	name: "interactionCreate",
	async execute(client, interaction, defaultColor) {
		if (interaction.isChatInputCommand()) {
			await interaction.deferReply().catch((err) => {
				console.log(err)
			})

			const name = interaction.commandName
			const commandMethod = commands.get(name)

			if (!commandMethod) return

			commandMethod({
				client,
				interaction,
				Systems,
				basicxp,
				Dialects,
				Infraction,
				Economy,
				Items,
				dailyCooldown,
				workCooldown,
				begCooldown,
				robCooldown,
				Waifus,
				Birthday,
				Spam,
				Fricking,
				frickingCooldown,
				Suppress,
				Counting,
				defaultColor,
			}).catch(async (err) => {
				console.log(err)

				await interaction
					.editReply({
						content: "⚠ | An error executing the command occured",
					})
					.catch((err) => {
						console.log(err)
					})

				return interaction.channel
					.send("<@527285622809952256> lol fix this")
					.catch((err) => {
						console.log(err)
					})
			})
		} else if (interaction.isButton()) {
			// const button_id = interaction.customId
			// const [command, id] = button_id.split("-")

			// if (interaction.member.id !== id) return

			// const member = interaction.guild.members.cache.get(id)
			// const permissions = interaction.member.permissions

			const { guild, member, customId, channel } = interaction

			if (["reportuser", "reportbug", "reportother"].includes(customId)) {
				await interaction
					.deferReply({
						ephemeral: true,
					})
					.catch((err) => {
						console.log(err)
					})

				const ID = Math.floor(Math.random() * 8989000) + 1010000

				await guild.channels
					.create({
						name: `${customId + "-" + ID}`,
						type: ChannelType.GuildText,
						parent: categoryid,
						permissionOverwrites: [
							{
								id: member.id,
								allow: [
									"SendMessages",
									"ViewChannel",
									"ReadMessageHistory",
								],
							},
							{
								id: "950173176246177823",
								allow: [
									"SendMessages",
									"ViewChannel",
									"ReadMessageHistory",
								],
							},
							{
								id: everyoneid,
								deny: [
									"SendMessages",
									"ViewChannel",
									"ReadMessageHistory",
								],
							},
						],
					})
					.then(async (channel) => {
						await Tickets.create({
							memberid: member.id,
							ticketid: ID,
							channelid: channel.id,
							closed: false,
							locked: false,
							type: customId,
						})

						const Embed = new EmbedBuilder()
							.setColor(defaultColor)
							.setAuthor({
								name: `Ticket: ${ID}`,
								iconURL: guild.iconURL({
									size: 4096,
									dynamic: true,
								}),
							})
							.setDescription(
								"Please wait for a response from the Government. In the meantime, please describe your issue in as much detail as possible."
								// All messages sent in this channel will be logged and saved to a government-access transcript file.
							)
							.setFooter({
								text: "The buttons below are Government-only",
							})

						const Buttons = new ActionRowBuilder().addComponents(
							new ButtonBuilder()
								.setCustomId("lock")
								.setLabel("Lock")
								.setStyle("Secondary")
								.setEmoji("🔒"),

							new ButtonBuilder()
								.setCustomId("unlock")
								.setLabel("Unlock")
								.setStyle("Success")
								.setEmoji("🔓"),

							new ButtonBuilder()
								.setCustomId("close")
								.setLabel("Save & Close Ticket")
								.setStyle("Primary")
								.setEmoji("💾")
						)

						const sentMessage = await channel
							.send({
								embeds: [Embed],
								components: [Buttons],
							})
							.catch((err) => {
								console.log(err)
							})

						await sentMessage.pin().catch((err) => {
							console.log(err)
						})

						await channel
							.send(
								`${member} here is your ticket (this message will autodelete)`
							)
							.catch((err) => {})
							.then((msg) => {
								if (msg) {
									setTimeout(
										() => msg.delete().catch((err) => {}),
										10000
									)
								}
							})

						await channel
							.send("<@&950173176246177823>")
							.catch((err) => {})

						await interaction
							.editReply({
								content: `${member} your ticket has been created: ${channel}`,
								ephemeral: true,
							})
							.catch((err) => {})
					})
			} else if (["close", "lock", "unlock"].includes(customId)) {
				if (!member.permissions.has("KickMembers")) return

				await interaction.deferReply().catch((err) => {
					console.log(err)
				})

				const discordTranscripts = require("discord-html-transcripts")

				let Embed = new EmbedBuilder().setColor(defaultColor)

				const getTicket = await Tickets.findOne({
					where: { channelid: channel.id },
				})

				if (!getTicket) {
					await interaction
						.editReply({
							content: `No data was found related to this ticket,`,
						})
						.catch((err) => {})

					return interaction.channel
						.send("<@527285622809952256> delete this DB entru")
						.catch((err) => {})
				}

				switch (customId) {
					case "lock": {
						if (getTicket.locked === true) {
							return await interaction
								.editReply({
									content:
										"The ticket is already locked (this message will autodelete)",
								})
								.catch((err) => {})
								.then((interaction) => {
									setTimeout(
										() =>
											interaction
												.delete()
												.catch((err) => {}),
										6000
									)
								})
						}

						await Tickets.update(
							{ locked: true },
							{ where: { channelid: channel.id } }
						)

						Embed.setDescription(
							"🔒 | This ticket is now locked for review"
						)

						await channel.permissionOverwrites
							.edit(getTicket.memberid, {
								SendMessages: false,
							})
							.catch((err) => {
								console.log(err)
							})

						return await interaction
							.editReply({
								embeds: [Embed],
							})
							.catch((err) => {
								console.log(err)
							})
					}

					case "unlock": {
						if (getTicket.locked === false) {
							return await interaction
								.editReply({
									content:
										"The ticket is already unlocked (this message will autodelete)",
								})
								.catch((err) => {})
								.then((interaction) => {
									setTimeout(
										() =>
											interaction
												.delete()
												.catch((err) => {}),
										6000
									)
								})
						}

						await Tickets.update(
							{ locked: false },
							{ where: { channelid: channel.id } }
						)

						Embed.setDescription("🔓 | This ticket is now unlocked")

						await channel.permissionOverwrites
							.edit(getTicket.memberid, {
								SendMessages: true,
							})
							.catch((err) => {
								console.log(err)
							})

						return await interaction
							.editReply({
								embeds: [Embed],
							})
							.catch((err) => {
								console.log(err)
							})
					}

					case "close": {
						if (getTicket.closed === true) {
							return await interaction
								.editReply({
									content:
										"The ticket is already closed and is about to be autodeleted (this message will autodelete)",
								})
								.catch((err) => {})
								.then((interaction) => {
									setTimeout(
										() =>
											interaction
												.delete()
												.catch((err) => {}),
										6000
									)
								})
						}

						// const attachment = await discordTranscripts.createTranscript(channel, {
						// 	limit: -1,
						// 	fileName: `${getTicket.type} - ${getTicket.ticketid}.html`,
						// })

						await Tickets.update(
							{ closed: true },
							{ where: { channelid: channel.id } }
						)

						const MEMBER = await guild.members.cache.get(
							getTicket.memberid
						)

						// const Message = await guild.channels.cache
						// 	.get(transcriptsid)
						// 	.send({
						// 		embeds: [
						// 			Embed.setAuthor({
						// 				name: MEMBER.user.tag,
						// 				iconURL: MEMBER.user.displayAvatarURL({
						// 					size: 4096,
						// 					dynamic: true,
						// 				}),
						// 			}).setTitle(
						// 				`Report Type: ${getTicket.type}\nID: ${getTicket.ticketid}`
						// 			),
						// 		],
						// 		files: [attachment],
						// 	})

						await interaction.editReply({
							content: "Done",
							// embeds: [
							// 	Embed.setDescription(
							// 		`The transcript is now saved [TRANSCRIPT](${Message.url})`
							// 	),
							// ],
						})

						await channel.send(
							"This channel and respective ticket will autodelete in 10 seconds"
						)

						setTimeout(async () => {
							channel.delete().catch((err) => {})

							const getNewTicket = await Tickets.findOne({
								where: { channelid: channel.id },
							})
							if (getNewTicket) {
								Tickets.destroy({
									where: { channelid: channel.id },
								})
							}
						}, 10000)
					}
				}
			}

			// if (command === "test") {
			// 	return await interaction.reply({
			// 		embeds: [
			// 			new EmbedBuilder()
			// 				.setTitle(`💸 Purchase Complete 💸`)
			// 				.setDescription(
			// 					`You just purchased **motorcycle** for 500 Dashcoins:tm: from your bank! Your new bank balance is Dashcoins:tm:.`
			// 				)
			// 				.setColor(defaultColor)
			// 				.setThumbnail(
			// 					interaction.member.user.displayAvatarURL({
			// 						size: 4096,
			// 					})
			// 				),
			// 		],
			// 	})
			// }

			// if(command === "ban"){
			//     if(!permissions.has("BanMembers")) return

			//     member.ban()
			//     .catch((err) => {
			//         console.log(err)
			//         return await interaction.editReply({
			//             content: "Failed to ban the user"
			//         })
			//         .catch((err) => {
			//             return
			//         })
			//     })

			//     return await interaction.editReply({
			//         content: "Banned the user"
			//     })
			// }

			// else if(command === "kick"){
			//     if(!permissions.has("BanMembers")) return

			//     member.kick()
			//     .catch((err) => {
			//         console.log(err)
			//         return await interaction.editReply({
			//             content: "Failed to ban the user"
			//         })
			//         .catch((err) => {
			//             return
			//         })
			//     })

			//     return await interaction.editReply({
			//         content: "Kicked the user"
			//     })
			// }
		} else if (interaction.isSelectMenu()) {
			const { guild, member, customId, channel, values } = interaction

			if (customId === "help") {
				const option1Embed = new EmbedBuilder()
					.setColor(defaultColor)
					.setTitle("⭐ XP System")
					.setDescription(
						"Rewards the most active members.\n\n"
						// All human members gain a certain amount of XP for every message they sent, outside of <#945527434655187006>, <#947275856919810048>, <#970812606287859722>, <#970859343849349160>, <#964714582402826280>, <#983507823965114378>, <#992630810186367016>, and any category not <#939674946953682974> or <#939674946953682975>. The logic that goes into determining how much XP to give for a message shall remain a mystery.
					)
					.addFields(
						{ name: "Everyone", value: "`/leaderboard rank`" },
						{ name: "mezmer420", value: "`/set level` `/set xp`" }
					)

				const option2Embed = new EmbedBuilder()
					.setColor(defaultColor)
					.setTitle("🗣️ Dialects System")
					.setDescription("Eocians have unique dialects.\n\n")
					.addFields(
						{ name: "Everyone", value: "`/dialect`" },
						{
							name: "mezmer420",
							value: "`/dialectupdate rename` `/dialectupdate remove` `/dialectupdate add` `/dialectupdate setcount`",
						}
					)

				const option3Embed = new EmbedBuilder()
					.setColor(defaultColor)
					.setTitle("💬 General Responses System")
					.setDescription("Universal replies to certain phrases.\n\n")

				const option4Embed = new EmbedBuilder()
					.setColor(defaultColor)
					.setTitle("💸 Economy System")
					.setDescription(
						"Rather advanced economy system with a wide array of options.\n\n"
					)
					.addFields(
						{
							name: "Everyone",
							value: "`/balance` `/beg` `/buy` `/daily` `/deposit` `/inventory` `/leaderboard economy` `/pay` `/rob` `/sell` `/shop` `/trivia` `/withdraw` `/work`",
						},
						{
							name: "mezmer420",
							value: "`/set bank` `/set inventory` `/set wallet`",
						}
					)

				const option5Embed = new EmbedBuilder()
					.setColor(defaultColor)
					.setTitle("🎵 Music System")
					.setDescription(
						"Rather advanced music system that gets the job done.\n\n"
					)
					.addFields({
						name: "Everyone",
						value: "`/autoplay` `/filter` `/loop` `/play song` `/play playlisturl` `/previous` `/pause` `/queue` `/remove` `/resume` `/seek` `/skip` `/skipto` `/shuffle` `/stop`",
					})

				const option6Embed = new EmbedBuilder()
					.setColor(defaultColor)
					.setTitle("❤️ Waifus System")
					.setDescription("Uwu Owo\n\n")
					.addFields(
						{
							name: "Everyone",
							value: "`/balls` `/pony` `/waifu` `/yuri`",
						},
						{ name: "mezmer420", value: "`/set waifu`" }
					)

				const option7Embed = new EmbedBuilder()
					.setColor(defaultColor)
					.setTitle("🎂 Birthdays System")
					.setDescription(
						"Store your birthday and everyone will be announced the day of.\n\n"
					)
					.addFields({
						name: "Everyone",
						value: "`/birthday list` `/birthday set` `/birthday remove`",
					})

				const option8Embed = new EmbedBuilder()
					.setColor(defaultColor)
					.setTitle("👶 Fricking System")
					.setDescription("Create new Eocians.\n\n")
					.addFields(
						{
							name: "Everyone",
							value: "`/frick` `/leaderboard children` `/rape`",
						},
						{ name: "mezmer420", value: "`/set children`" }
					)

				const option9Embed = new EmbedBuilder()
					.setColor(defaultColor)
					.setTitle("❗ Message Filter & Auto Warn System")
					.setDescription(
						"Filters untolerably explicit language and auto warns the user.\n\n"
					)

				const option10Embed = new EmbedBuilder()
					.setColor(defaultColor)
					.setTitle("👮 Crazy Suppress System")
					.setDescription(
						"Deletes all messages specified user(s) sends. ~~Can be used as punishment.~~\n\n"
					)

				const option11Embed = new EmbedBuilder()
					.setColor(defaultColor)
					.setTitle("✅ Anti-crash System")
					.setDescription(
						"Integral core system that ensures it's impossible to crash dashi.\n\n"
					)

				let Embeds = []

				values.forEach(async (value) => {
					if (value.includes("XP")) {
						Embeds.push(option1Embed)
					}

					if (value.includes("Dialects")) {
						Embeds.push(option2Embed)
					}

					if (value.includes("General Responses")) {
						Embeds.push(option3Embed)
					}

					if (value.includes("Economy")) {
						Embeds.push(option4Embed)
					}

					if (value.includes("Music")) {
						Embeds.push(option5Embed)
					}

					if (value.includes("Waifus")) {
						Embeds.push(option6Embed)
					}

					if (value.includes("Birthdays")) {
						Embeds.push(option7Embed)
					}

					if (value.includes("Fricking")) {
						Embeds.push(option8Embed)
					}

					if (value.includes("Message Filter & Auto Warn")) {
						Embeds.push(option9Embed)
					}

					if (value.includes("Crazy Suppress")) {
						Embeds.push(option10Embed)
					}

					if (value.includes("Anti-crash")) {
						Embeds.push(option11Embed)
					}
				})

				return await interaction
					.reply({
						embeds: Embeds,
						ephemeral: true,
					})
					.catch((err) => {})
			}
		} else if (interaction.isUserContextMenuCommand()) {
			const name = interaction.commandName
			const commandMethod = commands.get(name)

			if (!commandMethod) return

			commandMethod({
				client,
				interaction,
				Systems,
				basicxp,
				Dialects,
				Infraction,
				Economy,
				Items,
				dailyCooldown,
				workCooldown,
				begCooldown,
				robCooldown,
				Waifus,
				Birthday,
				Spam,
				Fricking,
				frickingCooldown,
				Suppress,
				Counting,
				defaultColor,
			}).catch(async (err) => {
				console.log(err)

				return await interaction
					.editReply({
						content: "⚠ | An error executing the command occured",
					})
					.catch((err) => {
						console.log(err)
					})
			})
		} else if (interaction.isMessageContextMenuCommand()) {
			const name = interaction.commandName
			const commandMethod = commands.get(name)

			if (!commandMethod) return

			commandMethod({
				client,
				interaction,
				Systems,
				basicxp,
				Dialects,
				Infraction,
				Economy,
				Items,
				dailyCooldown,
				workCooldown,
				begCooldown,
				robCooldown,
				Waifus,
				Birthday,
				Spam,
				Fricking,
				frickingCooldown,
				Suppress,
				Counting,
				defaultColor,
			}).catch(async (err) => {
				console.log(err)

				return await interaction
					.editReply({
						content: "⚠ | An error executing the command occured",
					})
					.catch((err) => {
						console.log(err)
					})
			})
		}
	},
}
