# Adhere to a commit convention

## Status

Accepted

## Context

Commits are important. Their content and summary give visibility into how the code is developed.

## Decision

In order to keep the commits' format consistent, we have to enforce some kind of style.
We decided to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification.
Every commit is linted using [commitlint](https://commitlint.js.org/#/).

### Resources

- https://www.conventionalcommits.org/en/v1.0.0/#summary
- https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines
- https://commitlint.js.org/#/
- https://sparkbox.com/foundry/semantic_commit_messages

## Consequences

- When the commit does not follow the convention, it cannot be committed.
- Reading the commit graph is straightforward.
- Sharing commit conventions is easy.
- While writing commits, we have to think about the convention.
