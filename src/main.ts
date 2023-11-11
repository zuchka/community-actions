import * as core from '@actions/core'
import * as github from '@actions/github'

const org = core.getInput('org', { required: true })
const username = core.getInput('username', { required: true })
const token = core.getInput('token', { required: true })

const octokit = new (github.getOctokit as any)(token)

export async function run(): Promise<void> {
  try {
    const isMember = await octokit.rest.orgs.checkMembership({
      org,
      username
    })
    if (isMember.status === 204) {
      core.setOutput('result', isMember)
    }
  } catch (error: any) {
    if (error.status === 404) {
      core.setOutput('result', '404')
    } else {
      console.error(
        `An error occurred while checking if the repository is starred: ${error}`
      )
    }
  }
}
