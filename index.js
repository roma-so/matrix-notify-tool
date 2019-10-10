require('dotenv').config()

const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000

const parseGithub = require('./github-parse')
const notificationTest = require('./notification-test')

const sendUpdateToMatrix = (message) => {
  // https://matrix.org/docs/guides/client-server-api
  // Send the message to the specified Matrix room
  request.post(`${process.env.MATRIX_URL}_matrix/client/r0/rooms/%${process.env.MATRIX_ROOM_ID}/send/m.room.message?access_token=${process.env.ACCESS_TOKEN}`,
    {
      body: message,
      msgtype: 'm.text',
    }
  )
}

const getGithubWebhook = async (req, res) => {
  // Parse the github webhook
  const message = await parseGithub(req, res)

  // If action is 'assigned'
  if (message.length) {
    // Test the webhook by email
    notificationTest(message)
    // Send notification
    sendUpdateToMatrix(message)
  }

  res.json({ message: 'ok' })
}

// Run express and output last commits
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .post('/github', (req, res) => getGithubWebhook(req, res))
  .get('/github', (req, res) => res.render('pages/github'))
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
