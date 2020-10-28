import * as input from '../src/input'
import * as issue from '../src/issue'

test('converting input with a single line of text to issue options', async () => {
  let coreInput = new Map<string, string>()
  coreInput.set('text', 'a single line of text')
  coreInput.set('repository', 'some-owner/some-repo')
  coreInput.set('token', 'some-token')
  const getCoreInput = (key: string) => {
    let value: string = coreInput.get(key)!
    return value
  }

  let issueOptions: any
  issueOptions = input.toIssueOptions(getCoreInput)

  expect(issueOptions).toStrictEqual({
    title: 'a single line of text',
    owner: 'some-owner',
    repo: 'some-repo',
    token: 'some-token'
  })
})
