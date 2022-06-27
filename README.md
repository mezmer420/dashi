# dashi
## _A Discord Bot_

A multi-function Discord bot created with Discord.js V13, intended for use in a lone server. Features include unique phrase response ("dialects"), text and slash commands, an economy/inventory system, reaction roles, music features, and more.

Created by mezmer420#7301

I did not know how to program in any way, shape, or form prior to this project. I learned basic JavaScript as I was creating this bot, and even now I still have much to learn about JavaScript. This was and is a fun project for me!

The bot has evolved significantly over time.

The bot itself won't be made public as there's way too much stuff specifically designed only for our server. But feel free to browse the code for inspiration for your own bot(s).

## Features:

- "Dialect" response
- Text-based prefix commands
- Wide array of application (/) commands
- A local database
- Economy and inventory system
- Music system
- Event logging
- Warn and infraction system
- Verification and reaction roles system
- Ability to DM users
- Ability to recieve DMs
- Welcome messaging

- Event and command handlers
- Error handling to prevent practically all crashes

## dashi can and does:

*A slightly comprehensive list*

- Differentiate between human users and bots
- Uniquely react to certain "dialects" (phrases)
- Provide embeds for dialect information
- Selectively grant certain users access to commands
- Selectively allow certain commands/responses in certain channels
- Respond when a command is attempted to be used in unauthorized channel
- Respond when an unauthorized person attempts to use a command
- Respond when an unauthorized person attempts to ping @everyone or @here
- Say whatever I want
- Modify own status and activity
- Delete/edit/pin messages, either immediately or after an interval
- Warn members and store infractions with a randomly generated ID
- Remove infractions by ID
- Spam
- Simulate delay and typing
- Randomize outcomes
- Extract text from images (experimental)
- Display the avatar of a user
- Send Discord.JS docs and and MDN docs info
- Let you pay and rob other users
- Let you purchase items that have an effect in the economy system
- Sell items you purchased, and detect if you do not already own it
- Display a economy leaderboard
- Set cooldowns on certain economy commands (e.g. work), reducable by purchasing certain item(s)
- Set a high cooldown for all eco-related commands in the event of a foiled robbery to simulate jail time, reducable by purchasing certain item(s)
- Find videos from YouTube with a URL or keywords and play their audio in VC (music bot)
- Display basic info about playing songs/videos
- Store song requests in a queue
- Shuffle, skip, and skipto songs
- Let you play hangman
- Require new users to react to a message to verify and gain access to the server
- Assign roles by reacting to a message, and removing roles by unreacting (reaction roles)
- Let you "claim" a waifu by reacted to its respective embed (reaction roles)
- Prevent you from claiming another waifu until you "break up" with your current one
- Log basic events in a logs channel (e.g. channel create/delete, channel update in #logs)
- Let you DM users via dashi
- DMs new users when they join the server
- Prevent runtime errors from leading to a crash

## Dependencies:

    "@discordjs/opus": "^0.5.3",
    "@discordjs/rest": "^0.5.0",
    "@discordjs/voice": "^0.10.0",
    "axios": "^0.27.2",
    "discord-api-types": "^0.33.4",
    "discord-player": "^5.2.2",
    "discord.js": "^13.8.0",
    "discord.js-docs": "^0.3.0",
    "dotenv": "^16.0.1",
    "ffmpeg-static": "^4.4.1",
    "i": "^0.3.7",
    "mongoose": "^6.3.4",
    "npm": "^8.12.1",
    "ns": "^1.0.2",
    "reconlx": "^1.4.21",
    "sequelize": "^6.19.2",
    "sqlite3": "^5.0.8",
    "tesseract.js": "^2.1.5"
