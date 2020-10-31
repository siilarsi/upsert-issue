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
  const repository  = get('repository')
  const repositoryArr = repository.split('/')
  const owner = repositoryArr[0]
  const repo = repositoryArr[1]
  if (repositoryArr.length !== 2 || owner.length === 0 || repo.length === 0) {
    throw Error(`"repository": "${repository}" must have format "owner/repo"`)
  }

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
