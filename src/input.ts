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
  const repository = get('repository')
  const repositoryArr = repository.split('/')
  const owner = repositoryArr[0]
  const repo = repositoryArr[1]
  if (repositoryArr.length !== 2 || owner.length === 0 || repo.length === 0) {
    throw Error(`"repository": "${repository}" must have format "owner/repo"`)
  }

  const token = get('token')
  const title = get('title')
  const body = get('body')
  const maybe_issue_number = get('issue_number')
  let issue_number = 0
  if (maybe_issue_number !== undefined && isNaN(+maybe_issue_number)) {
    throw new Error()
  } else if (maybe_issue_number !== undefined) {
    issue_number = +maybe_issue_number
  }

  return {
    owner,
    repo,
    ...(maybe_issue_number && {issue_number}),
    token,
    ...(title && {title}),
    ...(body && {body})
  }
}
