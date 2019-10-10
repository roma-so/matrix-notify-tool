require('dotenv').config()

const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000

const getGithubWebhook = async (req, res) => {}

// Run express and output last commits
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .post('/github', (req, res) => getGithubWebhook(req, res))
  .get('/github', (req, res) => res.render('pages/github'))
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
