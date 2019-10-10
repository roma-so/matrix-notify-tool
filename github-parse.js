const getRawBody = require('raw-body')

const userMap = require('./user-mapping')

module.exports = async (req, res) => {
  const body = await getRawBody(req)

  // Parse the github webhook and replace payload string
  const info = JSON.parse(decodeURIComponent(body.toString('utf8').replace('payload=', '')))
  let message = ''

  // If action equal to assigne
  if (info && info.pull_request && info.action && info.action === 'assigned') {
    const pull = info.pull_request

    // Get all assigned users and detect matrix ID
    let users = ''
    pull.assignees.forEach((user) => {
      const assigned = userMap.list.filter((person) => person.github_user === user.login)
      if (assigned.length) users += ` ${assigned[0].matrix_id}`
    })

    // Notification
    message = `Hey${users}! You assigned to Pull Request #${pull.number} (${pull.html_url}) with the title "${pull.title}".`
  }
  return message
}
