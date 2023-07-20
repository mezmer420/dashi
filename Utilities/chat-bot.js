const { ChannelType } = require("discord.js")
const fetch = require("node-fetch")
const { Configuration, OpenAIApi } = require("openai")
const config = require("../config.json")
const configuration = new Configuration({
	organization: config.openAIOrganizationId,
	apiKey: config.openAIKey,
})
const wait = require("node:timers/promises").setTimeout

module.exports.run = async ({ client, chatPrompt }) => {
	// client.on("messageCreate", async (message) => {
	// 	if (message.channel.type === ChannelType.DM) return
	// 	if (
	// 		message.channel.id !== "995386274091380826" // #talk-to-dashi
	// 		// && message.channel.id !== "945527434655187006" // #spam
	// 	)
	// 		return
	// 	if (message.author.bot) return
	// 	async function TypeWaitSend(str) {
	// 		await message.channel.sendTyping().catch((err) => {
	// 			console.log(err)
	// 		})
	// 		await wait(Math.floor(Math.random() * 7000) + 3001)
	// 		await message.channel.send(str).catch((err) => {
	// 			console.log(err)
	// 		})
	// 	}
	// 	try {
	// 		if (!message.content) return
	// 		if (
	// 			message.content.startsWith("(") &&
	// 			message.content.endsWith(")")
	// 		)
	// 			return
	// 		// let response = await fetch(
	// 		// 	"https://chatbot-api.gq/?message=" + message.content
	// 		// )
	// 		// // response = response.headers
	// 		// console.log(response)
	// 		// const test = await fetch(
	// 		// 	"https://chatbot-api.gq/?message=" + message.content,
	// 		// 	{
	// 		// 		method: "GET",
	// 		// 	}
	// 		// )
	// 		// console.log(test)
	// 		// let prompt = await chatPrompt.findOne()
	// 		// prompt = prompt.prompt
	// 		// const URL = "https://chatgpt-api.shn.hk/v1/"
	// 		// let response = await fetch(URL, {
	// 		// 	method: "POST",
	// 		// 	headers: {
	// 		// 		"Content-Type": "application/json",
	// 		// 	},
	// 		// 	body: JSON.stringify({
	// 		// 		model: "gpt-3.5-turbo",
	// 		// 		messages: [
	// 		// 			{
	// 		// 				role: "system",
	// 		// 				content: prompt,
	// 		// 			},
	// 		// 			{
	// 		// 				role: "user",
	// 		// 				content: message.content,
	// 		// 			},
	// 		// 		],
	// 		// 		max_tokens: 200,
	// 		// 		temperature: 0.3,
	// 		// 		frequency_penalty: 0.2, // Number between -2.0 and 2.0. Positive values decrease the model's likelihood to repeat the same line verbatim.
	// 		// 		presence_penalty: 0.2, // Number between -2.0 and 2.0. Positive values increase the model's likelihood to talk about new topics.
	// 		// 		// stop: ["dashi:"], // Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
	// 		// 	}),
	// 		// })
	// 		// if (response.status === 429) {
	// 		// 	return message.reply(
	// 		// 		"lol the OpenAI API is experiencing too many requests to handle that message. Try again?"
	// 		// 	)
	// 		// }
	// 		// response = await response.json().catch((err) => {
	// 		// 	return console.log(err)
	// 		// })
	// 		// // console.log(response)
	// 		// const choice = response.choices[0].message.content
	// 		// if (!choice) {
	// 		// 	return TypeWaitSend(
	// 		// 		"Sorry, I didn't quite understand that! Try again?"
	// 		// 	)
	// 		// }
	// 		// TypeWaitSend(`${choice}`)
	// 		// ///////////////////////////////////////////////////
	// 		// // const openAI = new OpenAIApi(configuration)
	// 		// // async function gptResponse() {
	// 		// // 	const completion = await openAI.createCompletion({
	// 		// // 		model: "text-davinci-003",
	// 		// // 		prompt: `${prompt} With this in mind, respond to the following: ${message.content}`,
	// 		// // 		max_tokens: 500,
	// 		// // 		temperature: 0.3,
	// 		// // 		frequency_penalty: 0.2, // Number between -2.0 and 2.0. Positive values decrease the model's likelihood to repeat the same line verbatim.
	// 		// // 		presence_penalty: 0.2, // Number between -2.0 and 2.0. Positive values increase the model's likelihood to talk about new topics.
	// 		// // 		// stop: ["dashi:"], // Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
	// 		// // 	})
	// 		// // 	const response = completion.data.choices[0].text
	// 		// // 	await wait(Math.floor(Math.random() * 3001) + 0)
	// 		// // 	if (!message) return
	// 		// // 	if (!response) {
	// 		// // 		return TypeWaitSend(
	// 		// // 			"Sorry, I didn't quite understand that! Try again?"
	// 		// // 		)
	// 		// // 	}
	// 		// // 	await TypeWaitSend(`${response}`)
	// 		// // }
	// 		// // await gptResponse()
	// 	} catch (err) {
	// 		console.log(err)
	// 		message.reply(
	// 			"The OpenAI API failed to return a response (e.g., currently down)"
	// 		)
	// 	}
	// })
}
