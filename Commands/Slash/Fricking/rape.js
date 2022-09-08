const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
} = require("discord.js")
const ms = require("ms")
const wait = require("node:timers/promises").setTimeout

module.exports.data = new SlashCommandBuilder()
	.setName("rape")
	.setDescription("Rape someone")
	.addUserOption((option) =>
		option.setName("user").setDescription("User to rape").setRequired(true)
	)

module.exports.category = "Fricking"

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
	const Member = interaction.member

	if (targetMember === Member) {
		return await interaction
			.editReply({
				content:
					"You jacked off in bathroom... try again when you're ready to actually rape someone",
			})
			.catch((err) => {})
	} else if (targetMember.id === "956345939130482750") {
		const kills = [
			`<@956345939130482750> after a long day, plops down on the couch with ${interaction.member} and turns on The Big Bang Theory. After a Sheldon Cooper joke, ${interaction.member} laughs uncontrollably as they die.`,
			`<@956345939130482750> Alt+F4'd ${interaction.member}.exe!`,
			`<@956345939130482750> attempted to play a flute, exploding the head of ${interaction.member}.`,
			`<@956345939130482750> blew his ear drums out listening to music too hard.`,
			`<@956345939130482750> challenges ${interaction.member} to a fist fight to the death. ${interaction.member} wins.`,
			`<@956345939130482750> cleaves the head of ${interaction.member} with a keyboard.`,
			`<@956345939130482750> crushes ${interaction.member} with a fridge.`,
			`<@956345939130482750> decapitates ${interaction.member} with a sword.`,
			`<@956345939130482750> drags ${interaction.member}s ears too hard and rips them off.`,
			`<@956345939130482750> drowns ${interaction.member} in a beer barrel.`,
			`<@956345939130482750> drowns ${interaction.member} in a tub of hot chocolate. *How was your last drink?*`,
			`<@956345939130482750> eviscerates ${interaction.member} with a rusty butter knife. Ouch!`,
			`<@956345939130482750> feeds toothpaste-filled oreos to ${interaction.member}, who were apparently allergic to fluorine. GGWP.`,
			`<@956345939130482750> fell in love with ${interaction.member} then broke his heart literally.`,
			`<@956345939130482750> fires a supersonic frozen turkey at ${interaction.member}, killing them instantly.`,
			`<@956345939130482750> forgot to leave the car door window open and ${interaction.member} dies from overheating`,
			`<@956345939130482750> forgot to zombie-proof ${interaction.member} lawn... Looks like zombies had a feast last night.`,
			`<@956345939130482750> gets ${interaction.member} to watch anime with them. ${interaction.member} couldn't handle it.`,
			`<@956345939130482750> grabs ${interaction.member} and shoves them into an auto-freeze machine with some juice and sets the temperature to 100 Kelvin, creating human ice pops.`,
			`<@956345939130482750> hired me to kill you, but I don't want to! ${interaction.member}`,
			`<@956345939130482750> hugs ${interaction.member} too hard..`,
			`<@956345939130482750> hulk smashes ${interaction.member} into a pulp.`,
			`<@956345939130482750> killed ${interaction.member} by ripping the skin off of their face and making a mask out of it.`,
			`<@956345939130482750> kills ${interaction.member} after hours of torture.`,
			`<@956345939130482750> kills ${interaction.member} with a candlestick in the study`,
			`<@956345939130482750> kills ${interaction.member} with kindness`,
			`<@956345939130482750> kills ${interaction.member} with their own foot.`,
			`<@956345939130482750> murders ${interaction.member} with an axe.`,
			`<@956345939130482750> pressed delete. It deleted ${interaction.member}`,
			`<@956345939130482750> pushes ${interaction.member} into the cold vacuum of space.`,
			`<@956345939130482750> runs ${interaction.member} over with a PT Cruiser.`,
			`<@956345939130482750> shoots ${interaction.member} in the head.`,
			`<@956345939130482750> shoots in ${interaction.member} mouth with rainbow laser, causing ${interaction.member} head to explode with rainbows and ${interaction.member} is reborn as unicorn. :unicorn:`,
			`<@956345939130482750> shot ${interaction.member} using the Starkiller Base!`,
			`<@956345939130482750> slips bleach into ${interaction.member}'s lemonade.`,
			`<@956345939130482750> strangles ${interaction.member}.`,
			`<@956345939130482750> straps ${interaction.member} to an ICBM and sends them to North Korea along with it.`,
			`<@956345939130482750> strikes ${interaction.member} with the killing curse... *Avada Kedavra!*`,
			`<@956345939130482750> tears off ${interaction.member}s lips after a kiss.`,
			`<@956345939130482750> thicc and collapses ${interaction.member}'s rib cage`,
			`<@956345939130482750> tries to shoot the broad side of a barn, misses and hits ${interaction.member} instead.`,
			`<@956345939130482750> turns on Goosebumps(2015 film) on the TV. ${interaction.member} being a scaredy-cat, dies of an heart attack.`,
			`<@956345939130482750> was so swag that ${interaction.member} died due to it. #Swag`,
			`<@956345939130482750>, are you sure you want to kill ${interaction.member}? They seem nice to me.`,
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
			`${interaction.member} died due to <@956345939130482750> being so stupid`,
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
			`${interaction.member} dies at the hands of <@956345939130482750>.`,
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
			`${interaction.member} dies in a horrible accident, and it was engineered by <@956345939130482750>.`,
			`${interaction.member} dies north of the wall and transforms into a white walker`,
			`${interaction.member} dies of AIDS.`,
			`${interaction.member} dies of dysentery.`,
			`${interaction.member} dies of natural causes.`,
			`${interaction.member} dies of starvation.`,
			`${interaction.member} dies on death row via lethal injection after murdering <@956345939130482750> and their family.`,
			`${interaction.member} dies, but don't let this distract you from the fact that in 1998, The Undertaker threw Mankind off Hell In A Cell, and plummeted 16 ft through an announcer’s table`,
			`${interaction.member} dies.`,
			`After a struggle, ${interaction.member} kills <@956345939130482750>`,
			`${interaction.member} disappeared from the universe.`,
			`${interaction.member} drank some toxic soda before it was recalled.`,
			`${interaction.member} dropped a Nokia phone on their face and split their skull.`,
			`${interaction.member} drowned in their own tears.`,
			`${interaction.member} eats too much copypasta and explodes`,
			`${interaction.member} fell down a cliff while playing Pokemon Go. Good job on keeping your nose in that puny phone. :iphone:`,
			`${interaction.member} fell into a pit of angry feminists.`,
			`${interaction.member} gets hit by a car.`,
			`${interaction.member} gets stabbed by <@956345939130482750>`,
			`${interaction.member} gets struck by lightning.`,
			`${interaction.member} goes genocide and Sans totally dunks ${interaction.member}!`,
			`${interaction.member} got into a knife fight with the pope. One of them is in hell now.`,
			`${interaction.member} got stepped on by an elephant.`,
			`${interaction.member} died from eating too much ass.`,
			`${interaction.member} has a stroke after a sad miserable existence. They are then devoured by their ample cats.`,
			`${interaction.member} has been found guilty, time for their execution!`,
			`${interaction.member} has some bad chinese food, and pays the ultimate price.`,
			`${interaction.member} is abducted by aliens, and the government kills them to cover it up.`,
			`${interaction.member} is dead at the hands of <@956345939130482750>.`,
			`${interaction.member} is injected with chocolate syrup, which mutates them into a person made out of chocolate. While doing a part-time job at the Daycare, they are devoured by the hungry babies. :chocolate_bar:`,
			`${interaction.member} is killed by a rabbit with a vicious streak a mile wide`,
			`${interaction.member} is killed by their own stupidity.`,
			`${interaction.member} is killed in a robbery gone wrong.`,
			`${interaction.member} is not able to be killed. Oh, wait, no, <@956345939130482750> kills them anyway.`,
			`${interaction.member} is so dumb that they choked on oxygen.`,
			`${interaction.member} is stuffed into a suit by Freddy on their night guard duty. Oh, not those animatronics again!`,
			`${interaction.member} is sucked into Minecraft. ${interaction.member}, being a noob at the so called Real-Life Minecraft faces the Game Over screen.`,
			`${interaction.member} killed themselves after seeing the normie memes that <@956345939130482750> posts.`,
			`${interaction.member} kills themselves after realizing how dumb <@956345939130482750> is.`,
			`${interaction.member} lives, despite <@956345939130482750>'s murder attempt.`,
			`${interaction.member} loses the will to live`,
			`${interaction.member} presses a random button and is teleported to the height of 100m, allowing them to fall to their inevitable death. Moral of the story: Don't go around pressing random buttons.`,
			`${interaction.member} reads memes till they die.`,
			`${interaction.member} ripped his heart out..`,
			`${interaction.member} ripped their own heart out to show their love for <@956345939130482750>.`,
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
			`${interaction.member} was killed by <@956345939130482750> with baby wipes.`,
			`${interaction.member} was murdered by <@956345939130482750> and everyone knows it, but there is no proof.`,
			`${interaction.member} was scooped by <@956345939130482750> and their innards are now Ennard.`,
			`${interaction.member} was teleported to the timeline where Jurassic World was real and they were eaten alive by the Indominus Rex.`,
			`${interaction.member} was thrown in the crusher of a trash truck by <@956345939130482750>.`,
			`${interaction.member} was walking normally when out of the corner of their eye they saw someone do a bottle flip and dab causing ${interaction.member} to have a stroke.`,
			`${interaction.member} watched the Emoji Movie and died of sheer cringe.`,
			`${interaction.member} went on a ride with a lead balloon.`,
			`After getting pushed into the ocean by <@956345939130482750>, ${interaction.member} is eaten by a shark.`,
			`After raid of roblox kids entered the server, ${interaction.member} died of cancer.`,
			`Aids, ${interaction.member} died from aids.`,
			`Calling upon the divine powers, <@956345939130482750> smites ${interaction.member} and their heathen ways`,
			`In a sudden turn of events, I **don't** kill ${interaction.member}.`,
			`no u`,
			`Our lord and savior Gaben strikes ${interaction.member} with a lighting bolt.`,
			`Sorry, <@956345939130482750>, I don't like killing people.`,
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
