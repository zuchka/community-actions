import * as core from '@actions/core'

const teammates = core.getInput('teammates', { required: true })
const username = core.getInput('username', { required: true })
// const token = core.getInput('token', { required: true })
// const org = 'railwayapp'
// const username = 'bar'
// const token = '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'
// const teammates = 'zuchka|20k-ultra|foo'

export function run(): any {
  console.log(teammates)
  const team = teammates.split('|')
  console.log(team)
  const isMember = team.includes(username)
  core.setOutput('result', isMember ? 'true' : 'false')
  console.log(team)
  console.log(isMember)
  // const url = `https://api.github.com/orgs/${org}/members/${username}`
  // const response = await fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: token,
  //     Accept: 'application/vnd.github+json',
  //     'X-GitHub-Api-Version': '2022-11-28'
  //   }
  // })
}
