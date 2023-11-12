import * as core from '@actions/core'

const teammates = core.getInput('teammates', { required: true })
const username = core.getInput('username', { required: true })

export function run(): void {
  const team: string[] = teammates.split('|')
  const isMember: boolean = team.includes(username)
  core.setOutput('result', isMember)
}
