# Upsert issue action

Create an issue or a new comment in one from text input or a from a (readme)

## Inputs

### `repository`

The repository where the issue should be created or where the issue should be
updated with a new comment if `issue_number is provided. Defaults to the
repository of the executing workflow.

### `issue_number`

The issue number where a new comment should be created, if not provided a new issue is created.

### `text`

The input for the new issue or for a new comment in a specified issue. If
`issue_number` is not provided and a new issue is created, then the first line
of the text will be used as the title stripping any preceding "#" and the rest
for the body.

If `issue_number` is provided and instead a new comment is created in the
referred issue, then the whole text is used as-is.

If not provided, the text will default to a description of the origin and usage of the action.

If instead `file_repository` and `file_path` are provided and valid, then they
will be used instead, ignoring this field.

### `file_repository`

The repository where to retrive the file from to be used instead of `text`,
only valid if used with `file_path`. Defaults to the local repository.

### `file_path`

The relative filepath to the file to be used instead of `text`, eg.
`documentation/how-to.md`

### `token`

Only necessary to provide if creating an issue in a private, non-local,
repository. Defaults to the local repositorys token.
