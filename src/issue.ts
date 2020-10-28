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
