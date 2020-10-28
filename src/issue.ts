import * as github from '@actions/github'

export interface Options {
  title: string
  owner: string
  repository: string
  body?: string
  token: string
}

export async function create(options: Options): Promise<void> {
  const octokit = github.getOctokit(options.token)
  const title = options.title
  const body = options.body
  await octokit.issues.create({
    owner: options.owner,
    repo: options.repository,
    title,
    ...(body && {body})
  })
}
