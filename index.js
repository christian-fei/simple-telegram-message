const https = require('https')
const querystring = require('querystring')

module.exports = {
  sendMessageFor
}

function sendMessageFor (token, channel) {
  const baseUrl = `https://api.telegram.org/bot${token}`

  return message => {
    let urlParams = querystring.stringify({
      chat_id: channel,
      text: message,
      parse_mode: 'HTML'
    })

    return sendRequest(`${baseUrl}/sendMessage?${urlParams}`)
  }

  function sendRequest (url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode === 200) return resolve(res)
        reject(res)
      })
      .on('error', (e) => {
        console.log(e, 'got an error in https request')
        reject(e)
      })
    })
  }
}
