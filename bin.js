#!/usr/bin/env node

const { sendMessageFor } = require('.')

main(process.env)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(`an error occurred: ${err.message}`)
    process.exit(1)
  })

async function main ({ TELEGRAM_TOKEN, TELEGRAM_CHANNEL, TELEGRAM_TEXT }) {
  console.log(`${TELEGRAM_CHANNEL} -> "${TELEGRAM_TEXT}"`)
  return sendMessageFor(TELEGRAM_TOKEN, TELEGRAM_CHANNEL)(TELEGRAM_TEXT)
}
