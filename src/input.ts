type getInput = (key: string) => string

export interface IssueOptions {
  owner: string
  repo: string
  issue_number?: number
  token: string
  title?: string
  body?: string
}

export function toIssueOptions(get: getInput): IssueOptions {
  const owner = get('repository').split('/')[0]
  const repo = get('repository').split('/')[1]
  const token = get('token')
  const title = get('title')
  const body = get('body')
  return {
    owner,
    repo,
    token,
    ...(title && {title}),
    ...(body && {body})
  }
}
