import * as github from '@actions/github'
import {Options} from './input'

export async function upsertIssue(options: Options): Promise<void> {
  const octokit = github.getOctokit(options.token)
  const title = options.title
  const body = options.body
  await octokit.issues.create({
    owner: options.organization,
    repo: options.repository,
    title,
    ...(body && {body})
  })
}
