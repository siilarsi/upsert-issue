import * as core from '@actions/core'
import * as issue from './issue'
import * as input from './input'

async function run(): Promise<void> {
  try {
    const options = input.toIssueOptions(core.getInput)
    const responseBody = await issue.create(options)
    core.setOutput('github_response_body', responseBody)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
