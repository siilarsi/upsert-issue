import * as github from '@actions/github'

export interface Options {
  owner: string
  repo: string
  title: string
  body?: string
  token: string
}

export async function create(options: Options): Promise<void> {
  const octokit = github.getOctokit(options.token)
  const body = options.body
  await octokit.issues.create({
    owner: options.owner,
    repo: options.repo,
    title: options.title,
    ...{body}
  })
}

export interface CommentOptions {
  owner: string
  repo: string
  issue_number: number
  title: string
  body: string
  token: string
}

export async function createComment(options: CommentOptions): Promise<void> {
  const octokit = github.getOctokit(options.token)
  await octokit.issues.createComment({
    owner: options.owner,
    repo: options.repo,
    issue_number: options.issue_number,
    body: options.body
  })
}
