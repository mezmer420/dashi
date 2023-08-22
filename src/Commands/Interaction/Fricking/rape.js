const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
} = require("discord.js")
const ms = require("ms")
const wait = require("node:timers/promises").setTimeout

module.exports.category = "Fricking"

module.exports.data = new SlashCommandBuilder()
	.setName("rape")
	.setDescription("Rape someone")
	.addUserOption((option) =>
		option.setName("user").setDescription("User to rape").setRequired(true)
	)

module.exports.run = async ({ client, interaction, Systems }) => {
	const getFricking = await Systems.findOne({
		where: { system: "Fricking" },
	})

	if (getFricking.online === false) {
		return await interaction
			.editReply({
				content: "The Fricking system is currently disabled",
			})
			.catch((err) => {})
	}

	const targetMember = interaction.options.getMember("user")

	if (targetMember === interaction.member) {
		return await interaction
			.editReply({
				content:
					"You jacked off in bathroom... try again when you're ready to actually rape someone",
			})
			.catch((err) => {})
	} else if (targetMember.id === client.user.id) {
		const kills = [
			`<@${client.user.id}> after a long day, plops down on the couch with ${interaction.member} and turns on The Big Bang Theory. After a Sheldon Cooper joke, ${interaction.member} laughs uncontrollably as they die.`,
			`<@${client.user.id}> Alt+F4'd ${interaction.member}.exe!`,
			`<@${client.user.id}> attempted to play a flute, exploding the head of ${interaction.member}.`,
			`<@${client.user.id}> blew his ear drums out listening to music too hard.`,
			`<@${client.user.id}> challenges ${interaction.member} to a fist fight to the death. ${interaction.member} wins.`,
			`<@${client.user.id}> cleaves the head of ${interaction.member} with a keyboard.`,
			`<@${client.user.id}> crushes ${interaction.member} with a fridge.`,
			`<@${client.user.id}> decapitates ${interaction.member} with a sword.`,
			`<@${client.user.id}> drags ${interaction.member}s ears too hard and rips them off.`,
			`<@${client.user.id}> drowns ${interaction.member} in a beer barrel.`,
			`<@${client.user.id}> drowns ${interaction.member} in a tub of hot chocolate. *How was your last drink?*`,
			`<@${client.user.id}> eviscerates ${interaction.member} with a rusty butter knife. Ouch!`,
			`<@${client.user.id}> feeds toothpaste-filled oreos to ${interaction.member}, who were apparently allergic to fluorine. GGWP.`,
			`<@${client.user.id}> fell in love with ${interaction.member} then broke his heart literally.`,
			`<@${client.user.id}> fires a supersonic frozen turkey at ${interaction.member}, killing them instantly.`,
			`<@${client.user.id}> forgot to leave the car door window open and ${interaction.member} dies from overheating`,
			`<@${client.user.id}> forgot to zombie-proof ${interaction.member} lawn... Looks like zombies had a feast last night.`,
			`<@${client.user.id}> gets ${interaction.member} to watch anime with them. ${interaction.member} couldn't handle it.`,
			`<@${client.user.id}> grabs ${interaction.member} and shoves them into an auto-freeze machine with some juice and sets the temperature to 100 Kelvin, creating human ice pops.`,
			`<@${client.user.id}> hired me to kill you, but I don't want to! ${interaction.member}`,
			`<@${client.user.id}> hugs ${interaction.member} too hard..`,
			`<@${client.user.id}> hulk smashes ${interaction.member} into a pulp.`,
			`<@${client.user.id}> killed ${interaction.member} by ripping the skin off of their face and making a mask out of it.`,
			`<@${client.user.id}> kills ${interaction.member} after hours of torture.`,
			`<@${client.user.id}> kills ${interaction.member} with a candlestick in the study`,
			`<@${client.user.id}> kills ${interaction.member} with kindness`,
			`<@${client.user.id}> kills ${interaction.member} with their own foot.`,
			`<@${client.user.id}> murders ${interaction.member} with an axe.`,
			`<@${client.user.id}> pressed delete. It deleted ${interaction.member}`,
			`<@${client.user.id}> pushes ${interaction.member} into the cold vacuum of space.`,
			`<@${client.user.id}> runs ${interaction.member} over with a PT Cruiser.`,
			`<@${client.user.id}> shoots ${interaction.member} in the head.`,
			`<@${client.user.id}> shoots in ${interaction.member} mouth with rainbow laser, causing ${interaction.member} head to explode with rainbows and ${interaction.member} is reborn as unicorn. :unicorn:`,
			`<@${client.user.id}> shot ${interaction.member} using the Starkiller Base!`,
			`<@${client.user.id}> slips bleach into ${interaction.member}'s lemonade.`,
			`<@${client.user.id}> strangles ${interaction.member}.`,
			`<@${client.user.id}> straps ${interaction.member} to an ICBM and sends them to North Korea along with it.`,
			`<@${client.user.id}> strikes ${interaction.member} with the killing curse... *Avada Kedavra!*`,
			`<@${client.user.id}> tears off ${interaction.member}s lips after a kiss.`,
			`<@${client.user.id}> thicc and collapses ${interaction.member}'s rib cage`,
			`<@${client.user.id}> tries to shoot the broad side of a barn, misses and hits ${interaction.member} instead.`,
			`<@${client.user.id}> turns on Goosebumps(2015 film) on the TV. ${interaction.member} being a scaredy-cat, dies of an heart attack.`,
			`<@${client.user.id}> was so swag that ${interaction.member} died due to it. #Swag`,
			`<@${client.user.id}>, are you sure you want to kill ${interaction.member}? They seem nice to me.`,
			`${interaction.member} accidentally clicked on a popup ad that reads \`Doctors hate us, see the one best trick for dying today!\``,
			`${interaction.member} accidentally tripped and died while getting up to write their suicide note.`,
			`${interaction.member} ate a piece of exotic butter. It was so amazing that it killed them.`,
			`${interaction.member} ate an apple and turned out it was made out of wax. Someone died from wax poisoning later that day.`,
			`${interaction.member} ate too many laxatives and drowned in their own shit. Ew.`,
			`${interaction.member} bleeds out after trying to get on \`Dumbest hillbilly moments\`.`,
			`${interaction.member} bought a fidget spinner and drowned in pussy.`,
			`${interaction.member} can't be killed, as they are a ghost.`,
			`${interaction.member} chokes in a trash can.`,
			`${interaction.member} chokes on a chicken bone.`,
			`${interaction.member} chokes on cheerios and dies. What an idiot...`,
			`${interaction.member} cranks up the music system only to realize the volume was at max and the song playing was Baby by Justin Beiber...`,
			`${interaction.member} cums in eye, goes blind, runs for help but ran straight onto train tracks and gets plowed by a train.`,
			`${interaction.member} decided it was a good idea to fight a tiger while smelling like meat. It did not end well.`,
			`${interaction.member} did not make a meme dank enough and was stoned.`,
			`${interaction.member} died after fapping 50 times in a row with no break.`,
			`${interaction.member} died after gaming for 90 hours straight without moving or eating.`,
			`${interaction.member} died after playing with an edgy razor blade fidget spinner.`,
			`${interaction.member} died after realizing how shitty their grammar was`,
			`${interaction.member} died after trying to out-meme Dank Memer.`,
			`${interaction.member} died an honorable death. Death by snoo snoo.`,
			`${interaction.member} died because RemindMeBot forgot to remind them to breathe`,
			`${interaction.member} died because they started playing with a fidget spinner but they realise its 2016 so you start fapping to the old witch in snow white and obama starts mowing their lawn and they jump out of the window and get ripped to pieces by Obama's lawn mower`,
			`${interaction.member} died due to <@${client.user.id}> being so stupid`,
			`${interaction.member} died due to eating WAY too many hotdogs in preparation for their date Friday night.`,
			`${interaction.member} died eating expired and infected raw fish with the filthiest rice in the world as sushi while being constantly stabbed in the scrotum with a 9inch nail sharp enough to stab through kevlar. The soy sauce was cat piss.`,
			`${interaction.member} died from a high salt intake`,
			`${interaction.member} died from a swift kick to the brain.`,
			`${interaction.member} died from a tragic amount of bad succ`,
			`${interaction.member} died from doing the ice bucket challenge.`,
			`${interaction.member} died from drinking too much water Huh, I guess it IS possible!.`,
			`${interaction.member} died from eating cactus needles.`,
			`${interaction.member} died from eating too much ass.`,
			`${interaction.member} died from eating too much bread :/`,
			`${interaction.member} died from ebola.`,
			`${interaction.member} died from meme underdose :/`,
			`${interaction.member} died from not eating enough ass.`,
			`${interaction.member} died from not whacking it enough. (There's a healthy balance, boys)`,
			`${interaction.member} died from reposting in the wrong neighborhood`,
			`${interaction.member} died from shitting for 36 hours straight.`,
			`${interaction.member} died from swallowing rocks too fast`,
			`${interaction.member} died from too many sunburns.`,
			`${interaction.member} died from whacking it too much. (There's a healthy balance, boys)`,
			`${interaction.member} died of oversucc`,
			`${interaction.member} died when testing a hydrogen bomb. There is nothing left to bury.`,
			`${interaction.member} died while listening to 'It's every day bro'`,
			`${interaction.member} died while playing hopscotch on *seemingly* deactivated land mines.`,
			`${interaction.member} died while trying to find the city of England`,
			`${interaction.member} died. OOF`,
			`${interaction.member} dies after swallowing a toothpick.`,
			`${interaction.member} dies at the hands of <@${client.user.id}>.`,
			`${interaction.member} dies because they used a bobby pin to lift their eyelashes`,
			`${interaction.member} dies because they were just too angry.`,
			`${interaction.member} dies by swearing on a Christian Minecraft server`,
			`${interaction.member} dies due to lack of friends.`,
			`${interaction.member} dies from bad succ.`,
			`${interaction.member} dies from dabbing too hard.`,
			`${interaction.member} dies from dabbing too hard`,
			`${interaction.member} dies from disrespecting wahmen.`,
			`${interaction.member} dies from just being a bad, un-likeable dude.`,
			`${interaction.member} dies from posting normie memes.`,
			`${interaction.member} dies from severe dislike of sand. It's coarse and rough and irritating it gets everywhere`,
			`${interaction.member} dies from watching the emoji movie and enjoying it.`,
			`${interaction.member} dies in a horrible accident, and it was engineered by <@${client.user.id}>.`,
			`${interaction.member} dies north of the wall and transforms into a white walker`,
			`${interaction.member} dies of AIDS.`,
			`${interaction.member} dies of dysentery.`,
			`${interaction.member} dies of natural causes.`,
			`${interaction.member} dies of starvation.`,
			`${interaction.member} dies on death row via lethal injection after murdering <@${client.user.id}> and their family.`,
			`${interaction.member} dies, but don't let this distract you from the fact that in 1998, The Undertaker threw Mankind off Hell In A Cell, and plummeted 16 ft through an announcer’s table`,
			`${interaction.member} dies.`,
			`After a struggle, ${interaction.member} kills <@${client.user.id}>`,
			`${interaction.member} disappeared from the universe.`,
			`${interaction.member} drank some toxic soda before it was recalled.`,
			`${interaction.member} dropped a Nokia phone on their face and split their skull.`,
			`${interaction.member} drowned in their own tears.`,
			`${interaction.member} eats too much copypasta and explodes`,
			`${interaction.member} fell down a cliff while playing Pokemon Go. Good job on keeping your nose in that puny phone. :iphone:`,
			`${interaction.member} fell into a pit of angry feminists.`,
			`${interaction.member} gets hit by a car.`,
			`${interaction.member} gets stabbed by <@${client.user.id}>`,
			`${interaction.member} gets struck by lightning.`,
			`${interaction.member} goes genocide and Sans totally dunks ${interaction.member}!`,
			`${interaction.member} got into a knife fight with the pope. One of them is in hell now.`,
			`${interaction.member} got stepped on by an elephant.`,
			`${interaction.member} died from eating too much ass.`,
			`${interaction.member} has a stroke after a sad miserable existence. They are then devoured by their ample cats.`,
			`${interaction.member} has been found guilty, time for their execution!`,
			`${interaction.member} has some bad chinese food, and pays the ultimate price.`,
			`${interaction.member} is abducted by aliens, and the government kills them to cover it up.`,
			`${interaction.member} is dead at the hands of <@${client.user.id}>.`,
			`${interaction.member} is injected with chocolate syrup, which mutates them into a person made out of chocolate. While doing a part-time job at the Daycare, they are devoured by the hungry babies. :chocolate_bar:`,
			`${interaction.member} is killed by a rabbit with a vicious streak a mile wide`,
			`${interaction.member} is killed by their own stupidity.`,
			`${interaction.member} is killed in a robbery gone wrong.`,
			`${interaction.member} is not able to be killed. Oh, wait, no, <@${client.user.id}> kills them anyway.`,
			`${interaction.member} is so dumb that they choked on oxygen.`,
			`${interaction.member} is stuffed into a suit by Freddy on their night guard duty. Oh, not those animatronics again!`,
			`${interaction.member} is sucked into Minecraft. ${interaction.member}, being a noob at the so called Real-Life Minecraft faces the Game Over screen.`,
			`${interaction.member} killed themselves after seeing the normie memes that <@${client.user.id}> posts.`,
			`${interaction.member} kills themselves after realizing how dumb <@${client.user.id}> is.`,
			`${interaction.member} lives, despite <@${client.user.id}>'s murder attempt.`,
			`${interaction.member} loses the will to live`,
			`${interaction.member} presses a random button and is teleported to the height of 100m, allowing them to fall to their inevitable death. Moral of the story: Don't go around pressing random buttons.`,
			`${interaction.member} reads memes till they die.`,
			`${interaction.member} ripped his heart out..`,
			`${interaction.member} ripped their own heart out to show their love for <@${client.user.id}>.`,
			`${interaction.member} screams in terror as they accidentally spawn in the cthulhu while uttering random latin words. Cthulhu grabs ${interaction.member} by the right leg and takes them to his dimension yelling, \`Honey, Dinner's ready!\``,
			`${interaction.member} slipped in the bathroom and choked on the shower curtain.`,
			`${interaction.member} slips on a banana peel and falls down the stairs.`,
			`${interaction.member} spins a fidget spinner and when it stops he dies...`,
			`${interaction.member} steps on a george foreman and dies of waffle foot.`,
			`${interaction.member} takes an arrow to the knee. And everywhere else.`,
			`${interaction.member} talked back to mods and got destroyed by the ban hammer.`,
			`${interaction.member} tips his fedora too far and falls onto the tracks of an oncoming subway.`,
			`${interaction.member} tried to get crafty, but they accidentally cut themselves with the scissors.:scissors:`,
			`${interaction.member} tried to get famous on YouTube by live-streaming something dumb. Skydiving while chained to a fridge.`,
			`${interaction.member} tried to outrun a train, the train won.`,
			`${interaction.member} tried to pick out the holy grail. He chose... poorly.`,
			`${interaction.member} tried to play in the street...`,
			`${interaction.member} trips over his own shoe laces and dies.`,
			`${interaction.member} vocally opposed the Clintons and then suddenly disappeared.`,
			`${interaction.member} was a resident of Alderaan before Darth Vader destroyed the planet...`,
			`${interaction.member} was accused of stealing Neptune's crown...`,
			`${interaction.member} was charging their Samsung Galaxy Note 7...`,
			`${interaction.member} was eaten alive by ants`,
			`${interaction.member} was given a chance to synthesize element 119 (Ununennium) and have it named after them, but they messed up. R.I.P.`,
			`${interaction.member} was killed by <@${client.user.id}> with baby wipes.`,
			`${interaction.member} was murdered by <@${client.user.id}> and everyone knows it, but there is no proof.`,
			`${interaction.member} was scooped by <@${client.user.id}> and their innards are now Ennard.`,
			`${interaction.member} was teleported to the timeline where Jurassic World was real and they were eaten alive by the Indominus Rex.`,
			`${interaction.member} was thrown in the crusher of a trash truck by <@${client.user.id}>.`,
			`${interaction.member} was walking normally when out of the corner of their eye they saw someone do a bottle flip and dab causing ${interaction.member} to have a stroke.`,
			`${interaction.member} watched the Emoji Movie and died of sheer cringe.`,
			`${interaction.member} went on a ride with a lead balloon.`,
			`After getting pushed into the ocean by <@${client.user.id}>, ${interaction.member} is eaten by a shark.`,
			`After raid of roblox kids entered the server, ${interaction.member} died of cancer.`,
			`Aids, ${interaction.member} died from aids.`,
			`Calling upon the divine powers, <@${client.user.id}> smites ${interaction.member} and their heathen ways`,
			`In a sudden turn of events, I **don't** kill ${interaction.member}.`,
			`no u`,
			`Our lord and savior Gaben strikes ${interaction.member} with a lighting bolt.`,
			`Sorry, <@${client.user.id}>, I don't like killing people.`,
			`The bullet missed Harambe and hit ${interaction.member} instead. Yay for Harambe!`,
			`While performing colonoscopy on an elephant, ${interaction.member} gets their head stuck in the elephants rectum and chokes.`,
		]

		let kill = kills[Math.floor(Math.random() * kills.length)]

		return await interaction
			.editReply({
				content: kill,
			})
			.catch((err) => {})
	}

	await interaction
		.editReply({
			content: `You just raped <@${targetMember.id}>!`,
		})
		.catch((err) => {})
}
