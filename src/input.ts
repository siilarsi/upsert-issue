import * as issue from './issue'

export function toIssueOptions(
  getInput: (key: string) => string
): issue.Options {
  const owner = getInput('repository').split('/')[0]
  const repo = getInput('repository').split('/')[1]
  const title = getInput('text')
  const token = getInput('token')

  return {
    owner,
    repo,
    title,
    token
  }
}
