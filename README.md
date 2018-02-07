# simple-telegram-message

> … aims to be a simple, dependency-less module that does one thing, and it does it well

send a telegram message to yourself, a friend or a channel with node.js


## requirements

to get a your user id, search on telegram for the bot **@userinfobot**.

to get the telegram bot token, create a bot with the help of **@BotFather** and he will provide you with all the information you need :)


## two step usage

```sh
npm i simple-telegram-message
```

```js
const { sendMessageFor } = require('simple-telegram-message')
const sendMessage = sendMessageFor(process.env.TELEGRAM_TOKEN, 'user_id|channel_id')
sendMessage(`Hi from bot!`)
```

## api

### `sendMessageFor`

this function is the only one exported by `simple-telegram-message`, and it is used to create a new function (see [sendMessage](#send-message))

### `sendMessage`

`sendMessage` is the function returned by [sendMessageFor](#send-message-for).

it returns a promise that resolves when the message has been successfully sent, or rejects if the message failed.


## help

reach out on twitter [@christian_fei](https://twitter.com/christian_fei/)!
