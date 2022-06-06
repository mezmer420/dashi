module.exports = {
    callback: async (message, args) => {
     await message.reply(`will delete in 6 sec`)
  .then((sentMessage) => {
    setTimeout(() => {
        message.channel.messages
        .fetch(message.id)
        .then((fetchedMessage) => {
          console.log('Message exists')

          fetchedMessage
            .delete()
            .then(() => console.log('Message deleted successfully'))
            .catch((err) => console.log('Could not delete the message', err))
        })
        .catch((err) => {
          if (err.httpStatus == 404) {
            console.log('Message already deleted')
          } else {
            console.log(err)
          }
        })
    }, 6000)

    setTimeout(() => {
        sentMessage.channel.messages
        .fetch(sentMessage.id)
        .then((fetchedMessage) => {
          console.log('Message exists')

          fetchedMessage
            .delete()
            .then(() => console.log('Message deleted successfully'))
            .catch((err) => console.log('Could not delete the message', err))
        })
        .catch((err) => {
          if (err.httpStatus == 404) {
            console.log('Message already deleted')
          } else {
            console.log(err)
          }
        })
    }, 6000)
  })

    }
}