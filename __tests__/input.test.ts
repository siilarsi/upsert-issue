import * as input from '../src/input'
import * as issue from '../src/issue'

test('converting input with text of a single line to issue options', async () => {
  let coreInput = new CoreInputBuilder().withMinimum()

  let issueOptions = input.toIssueOptions(coreInput.get())

  expect(issueOptions).toStrictEqual({
    owner: 'some-owner',
    repo: 'some-repo',
    title: 'some-text',
    token: 'some-token'
  })
})

test('converting input with text of a single line with prefixed ##', async () => {
  let coreInput = new CoreInputBuilder()
    .withMinimum()
    .set('text', '## some-text ##')

  let issueOptions = input.toIssueOptions(coreInput.get())

  expect(issueOptions.title).toEqual('some-text ##')
})

test('converting input with text of multiple lines', async () => {
  const body = `a line
  another line`
  const text = `some-text

${body}`
  let coreInput = new CoreInputBuilder().withMinimum().set('text', text)

  let issueOptions = input.toIssueOptions(coreInput.get())

  expect(issueOptions.title).toEqual('some-text')
  expect(issueOptions.body).toEqual(body)
})

class CoreInputBuilder {
  coreInput: Map<string, string> = new Map<string, string>()

  withMinimum() {
    this.coreInput.set('text', 'some-text')
    this.coreInput.set('repository', 'some-owner/some-repo')
    this.coreInput.set('token', 'some-token')
    return this
  }

  set(key: string, value: string) {
    this.coreInput.set(key, value)
    return this
  }

  get() {
    return (key: string) => {
      return this.coreInput.get(key)!
    }
  }
}
