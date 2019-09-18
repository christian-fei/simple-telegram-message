const https = require('https')
const querystring = require('querystring')

module.exports = {
  sendMessage,
  sendMessageFor,
  sendRequest
}

function sendMessage (token, channel, message) {
  return sendMessageFor(token, channel)(message)
}

function sendMessageFor (token, channel) {
  const baseUrl = `https://api.telegram.org/bot${token}`

  return message => {
    const urlParams = querystring.stringify({
      chat_id: channel,
      text: message,
      parse_mode: 'HTML'
    })

    return sendRequest(`${baseUrl}/sendMessage?${urlParams}`)
  }
}

function sendRequest (url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => res.statusCode === 200 ? resolve(res) : reject(res))
      .on('error', reject)
  })
}
