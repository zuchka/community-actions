import * as core from '@actions/core'

const teammates = core.getInput('teammates', { required: true })
const username = core.getInput('username', { required: true })
const webhook = core.getInput('webhook', { required: true })

export function run(): any {
  const team = teammates.split('|')
  const isMember = team.includes(username)
  const ghRepo = stripQuotes(process.env.GITHUB_REPO)
  const ghIssueUrl = stripQuotes(process.env.GITHUB_ISSUE_URL)
  const ghPrUrl = stripQuotes(process.env.GITHUB_PR_URL)
  const ghEvent = stripQuotes(process.env.GITHUB_EVENT_NAME)
  
  const ghUrl = ghEvent === 'pull_request' ? ghPrUrl : ghIssueUrl  
  core.setOutput('result', isMember ? 'true' : 'false')

  if (!isMember) {
    console.log( 'sending webhook for: ' + ghUrl + ' ...')
    postData(webhook, {
      username: 'Railway Bot',
      avatar_url: 'https://railway.app/brand/logo-dark.png',
      content: `new community activity in ${ghRepo}:\n\n${ghUrl}\n\n`
    })
  } else {
    console.log('Skipping webhook: author is an org member')
  }
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  console.log('Webhook sent. response code = ' + response.status)
  return response.status
}

function stripQuotes(envVar: string | undefined) {
  const stripped = envVar ? envVar.slice(1, -1) : ''
  return stripped
}

run()
