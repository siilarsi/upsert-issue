import * as issue from './issue'

export function toIssueOptions(
  getInput: (key: string) => string
): issue.Options {
  const owner = getInput('repository').split('/')[0]
  const repo = getInput('repository').split('/')[1]
  const text = getInput('text').split(/\r?\n/)
  const title = text[0].replace(/^[\s#]+/g, '')
  const body = text.slice(2).join('\n')
  const token = getInput('token')

  return {
    owner,
    repo,
    title,
    ...(body && {body}),
    token
  }
}
