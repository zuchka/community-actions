import * as core from '@actions/core'

const teammates = core.getInput('teammates', { required: true })
const username = core.getInput('username', { required: true })

export function run(): any {
  const team = teammates.split('|')
  const isMember = team.includes(username)
  console.log(isMember)
  const foo = process.env.GITHUB_EVENT_NAME
  console.log(foo)
  core.setOutput('result', isMember ? 'true' : 'false')
}

run()
