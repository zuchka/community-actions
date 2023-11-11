import * as core from '@actions/core'

const org = core.getInput('org', { required: true })
const username = core.getInput('username', { required: true })
const token = core.getInput('token', { required: true })

export async function run(): Promise<void> {
  const url = `https://api.github.com/orgs/${org}/members/${username}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: token,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  console.log(response.status)
  core.setOutput('result', response)
}
