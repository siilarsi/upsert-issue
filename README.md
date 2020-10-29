# Upsert issue action

Create or update an issue

## Inputs

### `title`

The title of the issue to create or update, mandatory if creating a new issue.

### `body`

The content of the issue to create or update.

### `repository`

Defaults to the repository of the executing workflow.

Only necessary to provide if upserting an issue in a non-local repository.

If provided must container both owner and repo name, eg.
```yaml
- uses: siilarsi/upsert-issue
  with:
    repository: "owner/repo"
```

### `issue_number`

The issue which should be updated. If left out a new issue is created.

### `token`

Defaults to the local repositorys token.

Only necessary to provide if creating an issue in a private, non-local,
repository.

## Outputs

### `github_response_body`

The response body returned from the GitHub API when creating an issue or issue
comment.
