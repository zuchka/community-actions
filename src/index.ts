import * as core from '@actions/core'

const teammates = core.getInput('teammates', { required: true })
const username = core.getInput('username', { required: true })

export function run(): any {
  const team = teammates.split('|')
  const isMember = team.includes(username)
  const ghEvent = process.env.GITHUB_EVENT_NAME
  const ghRepo = process.env.GITHUB_REPO
  const ghUrl = process.env.GITHUB_ISSUE_URL
  const ghTitle = process.env.GITHUB_ISSUE_TITLE
  const ghBody = process.env.GITHUB_ISSUE_BODY
  console.log('event = ' + ghEvent)
  console.log('repo = ' + ghRepo)
  console.log('body = ' + ghBody)
  console.log('url = ' + ghUrl)
  console.log('repo = ' + ghTitle)

  // if (isMember) {
  postData(
    'https://discord.com/api/webhooks/886039948032090152/TN0AU9rQs3bzWfIR-enPZp9xAW2XeOzYiCQH4Y_W6MX-ABjKaKzsJOTp_psayU_Z8H-f',
    {
      username: 'G Bot',
      avatar_url: 'https://i.imgur.com/4M34hi2.png',
      content: `An external contributor just created a new ${ghEvent} in ${ghRepo}.`
    }
  )
  // }
}
// core.setOutput('result', isMember ? 'true' : 'false')
// }

run()

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  console.log('response code = ' + response.status)
  return response.status
}
