import * as github from '@actions/github'
import * as input from './input'

export async function create(options: input.IssueOptions): Promise<string> {
  if (options.title === undefined) {
    throw new Error('"title" is required when creating a new issue')
  }

  const octokit = github.getOctokit(options.token)
  const body = options.body
  const response = await octokit.issues.create({
    owner: options.owner,
    repo: options.repo,
    title: options.title,
    ...{body}
  })
  return JSON.stringify(response)
}
