import * as issue from '../src/issue'
import nock from 'nock'

describe('When creating an issue', () => {
  let issueOptions: any = {}

  beforeEach(() => {
    nock.disableNetConnect()
    nock.abortPendingRequests()
    issueOptions.token = 'abc123'
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  describe('with all identifying path variables', () => {
    beforeEach(() => {
      issueOptions.owner = 'some-organization'
      issueOptions.repo = 'some-repository'
    })

    describe('and with a title', () => {
      beforeEach(() => {
        issueOptions.title = 'some title'
      })

      it('should be created with the title and no body', async () => {
        let actualRequestBody = {}
        let requests = nock('https://api.github.com')
          .post(
            `/repos/some-organization/some-repository/issues`,
            (requestBody: any) => {
              actualRequestBody = requestBody
              return true
            }
          )
          .reply(200)

        await issue.create(issueOptions)

        expect(requests.pendingMocks()).toStrictEqual([])
        expect(actualRequestBody).toStrictEqual({
          title: issueOptions.title
        })
      })

      describe('and a body', () => {
        beforeEach(() => {
          issueOptions.body = 'some body'
        })

        it('should be created with the title and body', async () => {
          let actualRequestBody = {}
          let requests = nock('https://api.github.com')
            .post(
              `/repos/some-organization/some-repository/issues`,
              (requestBody: any) => {
                actualRequestBody = requestBody
                return true
              }
            )
            .reply(200)

          await issue.create(issueOptions)

          expect(requests.pendingMocks()).toStrictEqual([])
          expect(actualRequestBody).toStrictEqual({
            title: issueOptions.title,
            body: issueOptions.body
          })
        })
      })
    })
  })
})

describe('When creating an issue comment', () => {
  let issueCommentOptions: any = {}

  beforeEach(() => {
    nock.disableNetConnect()
    nock.abortPendingRequests()
    issueCommentOptions.token = 'abc123'
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  describe('with all identifying path variables', () => {
    beforeEach(() => {
      issueCommentOptions.owner = 'some-organization'
      issueCommentOptions.repo = 'some-repository'
      issueCommentOptions.issue_number = 123
    })

    describe('and with a body', () => {
      beforeEach(() => {
        issueCommentOptions.body = 'some body'
      })

      it('should be created with the body', async () => {
        let actualRequestBody = {}
        let requests = nock('https://api.github.com')
          .post(
            `/repos/some-organization/some-repository/issues/123/comments`,
            (requestBody: any) => {
              actualRequestBody = requestBody
              return true
            }
          )
          .reply(200)

        await issue.createComment(issueCommentOptions)

        expect(requests.pendingMocks()).toStrictEqual([])
        expect(actualRequestBody).toStrictEqual({
          body: issueCommentOptions.body
        })
      })
    })
  })
})
