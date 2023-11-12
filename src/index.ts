import * as core from '@actions/core'

const teammates = core.getInput('teammates', { required: true })
const username = core.getInput('username', { required: true })

export function run(): any {
  const team = teammates.split('|')
  const isMember = team.includes(username)
  const GHEvent = process.env.GITHUB_EVENT_NAME
  const GHRepo = process.env.GITHUB_REPO
  const GHContext: any = process.env.GITHUB_CONTEXT
  const url = GHContext.event.issue.html_url
  const title = GHContext.event.issue.title
  const body = GHContext.event.issue.body
  console.log('url = ' + url)
  console.log('title = ' + title)
  console.log('body = ' + body)
  if (GHEvent == 'issue') {
    postData(
      'https://discord.com/api/webhooks/886039948032090152/TN0AU9rQs3bzWfIR-enPZp9xAW2XeOzYiCQH4Y_W6MX-ABjKaKzsJOTp_psayU_Z8H-f',
      {
        username: 'G Bot',
        avatar_url: 'https://i.imgur.com/4M34hi2.png',
        content: `An external contributor just created a new ${GHEvent} in ${GHRepo}.`,
        embeds: [
          {
            title: title,
            url: url,
            description: body,
            color: 15258703
          }
        ]
      }
    )
  }
  core.setOutput('result', isMember ? 'true' : 'false')
}

run()

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  console.log(response.status)
  return response.status
}
