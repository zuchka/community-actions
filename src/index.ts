import * as core from '@actions/core'

const teammates = core.getInput('teammates', { required: true })
const username = core.getInput('username', { required: true })

export async function run(): Promise<void> {
  try {
    const team: string[] = teammates.split('|')
    const isMember: boolean = team.includes(username)
    console.log('teammates = ' + teammates)
    console.log('team = ' + team)
    console.log('isMember = ' + isMember)
    core.setOutput('result', isMember)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
