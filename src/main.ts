import * as core from '@actions/core'
import * as issue from './issue'
import * as input from './input'

async function run(): Promise<void> {
  try {
    const options = input.toIssueOptions(core.getInput)
    let responseBody = ''
    if (options.issue_number === undefined || isNaN(options.issue_number)) {
      responseBody = await issue.create(options)
    } else {
      responseBody = await issue.update(options)
    }

    core.setOutput('github_response_body', responseBody)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
