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
  console.log('title = ' + ghTitle)

  // if (isMember) {
  postData(
    'https://discord.com/api/webhooks/886039948032090152/TN0AU9rQs3bzWfIR-enPZp9xAW2XeOzYiCQH4Y_W6MX-ABjKaKzsJOTp_psayU_Z8H-f',
    {
      username: 'G Bot',
      avatar_url: 'https://i.imgur.com/4M34hi2.png',
      content: `new ${ghEvent} in ${ghRepo} from a community member.\n${ghUrl}`,
      embeds: [
        {
          author: {
            name: 'Birdie♫',
            url: 'https://www.reddit.com/r/cats/',
            icon_url: 'https://i.imgur.com/R66g1Pe.jpg'
          },
          title: 'Title',
          url: 'https://google.com/',
          description:
            'Text message. You can use Markdown here. *Italic* **bold** __underline__ ~~strikeout~~ [hyperlink](https://google.com) `code`',
          color: 15258703,
          fields: [
            {
              name: 'Text',
              value: 'More text',
              inline: true
            },
            {
              name: 'Even more text',
              value: 'Yup',
              inline: true
            },
            {
              name: 'Use `"inline": true` parameter, if you want to display fields in the same line.',
              value: 'okay...'
            },
            {
              name: 'Thanks!',
              value: "You're welcome :wink:"
            }
          ],
          thumbnail: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/4-Nature-Wallpapers-2014-1_ukaavUI.jpg'
          },
          image: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/A_picture_from_China_every_day_108.jpg'
          },
          footer: {
            text: 'Woah! So cool! :smirk:',
            icon_url: 'https://i.imgur.com/fKL31aD.jpg'
          }
        }
      ]
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
