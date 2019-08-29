const https = require('https')
const querystring = require('querystring')

module.exports = {
  sendMessageFor,
  sendInvoiceFor
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

// https://core.telegram.org/bots/api#sendinvoice
function sendInvoiceFor (token, channel, params) {
  const baseUrl = `https://api.telegram.org/bot${token}`

  return message => {
    const urlParams = querystring.stringify({
      chat_id: channel,
      title: params.title,
      payload: params.payload,
      provider_token: params.provider_token,
      start_parameter: params.start_parameter,
      currency: params.currency,
      prices: params.prices // https://core.telegram.org/bots/api#labeledprice
      // e.g: [{label: 'Subscription', amount: 50}]
    })

    return sendRequest(`${baseUrl}/sendInvoice?${urlParams}`)
  }
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
