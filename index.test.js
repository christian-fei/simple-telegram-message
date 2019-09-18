const tap = require('tap')
const { sendMessage } = require('.')
const nock = require('nock')

tap.test('calls sendMessage api', async t => {
  const scope = nock('https://api.telegram.org')
    .get('/botFAKE/sendMessage?chat_id=1&text=hello%20world&parse_mode=HTML')
    .reply(200, {})

  const token = 'FAKE'
  const channel = '1'
  const message = 'hello world'

  await sendMessage(token, channel, message)

  scope.done()
})

tap.test('handles failure', async t => {
  const scope = nock('https://api.telegram.org')
    .get('/botFAKE/sendMessage?chat_id=1&text=hello%20world&parse_mode=HTML')
    .reply(500, {})

  const token = 'FAKE'
  const channel = '1'
  const message = 'hello world'

  try {
    await sendMessage(token, channel, message)
    t.fail()
  } catch (err) {
    scope.done()
  }
})
