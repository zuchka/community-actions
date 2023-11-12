import * as core from '@actions/core'

const teammates = core.getInput('teammates', { required: true })
const username = core.getInput('username', { required: true })

export function run(): any {
  const team: string[] = teammates.split('|')
  const isMember: boolean = team.includes(username)
  core.setOutput('result', isMember ? 'true' : 'false')
  console.log('teammates =' + teammates)
  console.log('team =' + team)
  console.log('isMember =' + isMember)
}
