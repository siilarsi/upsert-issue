import * as issue from '../src/issue'
import nock from 'nock'

describe('When creating an issue for a repository', () => {
  let options: any = {}
  let actualRequestBody = {}
  let issuePath = '/repos/some-org/some-repo/issues'
  let requests: any
  beforeEach(() => {
    options = {
      owner: 'some-org',
      repo: 'some-repo',
      token: 'abc123'
    }
    nock.disableNetConnect()
    nock.abortPendingRequests()
    requests = nock('https://api.github.com')
      .post(issuePath, (requestBody: any) => {
        actualRequestBody = requestBody
        return true
      })
      .reply(200, {id: 123})
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  describe('with a title and without a body', () => {
    let actualResponseBody: any = {}
    beforeEach(async () => {
      options.title = 'some title'

      actualResponseBody = await issue.create(options)
    })

    it('should invoke the GitHub API route for issues', () => {
      expect(requests.pendingMocks()).toStrictEqual([])
    })

    it('should have the title without the body in the request body', () => {
      expect(actualRequestBody).toStrictEqual({
        title: options.title
      })
    })

    it('should return the response body from the GitHub API', () => {
      const expected = {
        data: {
          id: 123
        },
        headers: {
          'content-type': 'application/json'
        },
        status: 200,
        url: `https://api.github.com${issuePath}`
      }
      expect(JSON.parse(actualResponseBody)).toStrictEqual(expected)
    })
  })

  describe('with both a title and body', () => {
    beforeEach(async () => {
      options.title = 'some title'
      options.body = 'some body'

      await issue.create(options)
    })

    it('should have both the title and body in the request body', () => {
      expect(actualRequestBody).toStrictEqual({
        title: options.title,
        body: options.body
      })
    })
  })
})
