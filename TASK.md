# TASK: Article status (Draft / Published / Archived)

**Type:** Feature  **Duration:** 5 days  **Deadline:** no later than November 27, 2026 at 23:59

## Context

Today, on Conduit, an article is visible to everyone as soon as it is created.
Authors tell us they want to prepare an article in several steps before sharing
it, and they want to hide old articles without deleting them (deleting also
removes all comments and favorites).

We want to add a **status** to every article:

| Status      | Meaning                                                    |
| ----------- | ---------------------------------------------------------- |
| `draft`     | Work in progress. Only the author can see it.              |
| `published` | Visible to everyone (this is how all articles work today). |
| `archived`  | Hidden from everyone except the author. Not deleted.       |

## User stories

- As an **author**, I want to save an article as a draft, so that I can finish
  it later before other people see it.
- As an **author**, I want to publish, archive or move back to draft one of my
  articles, so that I control who can see it.
- As an **author**, I want to filter my own articles by status on my profile
  page, so that I can quickly find my drafts and archived articles.
- As a **reader**, I only want to see published articles, so that I never see
  unfinished or old content.

## Acceptance criteria

### Data

1. Every article has a status: `draft`, `published` or `archived`. The database
   must not accept any other value, and the status can never be empty.
2. **All articles that already exist must become `published`.** No article,
   comment, tag, favorite or follower may be lost or changed.
3. The database change is done with a **new Sequelize migration**. Do not edit
   the existing migrations and do not use `sequelize.sync()`. The migration
   must also be reversible (its `down` step works).
4. The seed data includes, for the user `exampleUser1`, at least **2 draft**
   articles and **1 archived** article, so that reviewers can test the feature.
   It must also work on a database that already contains the existing seed data.

### API

5. Every article returned by the API includes its `status`.
6. When an author creates an article, they can choose the status.
   **If no status is sent, the article is `published`**, so that existing
   clients of the API keep working exactly as before.
7. The author can change the status of their article (for example from `draft`
   to `published`, or from `published` to `archived`).
8. **Only the author of an article can change its status.**
   - Not logged in: `401`
   - Logged in but not the author: `403`
   - Article does not exist: `404`
   - Invalid status value (for example `"deleted"`): `422`, with a clear error
     message in the same error format as the rest of the API.
9. **Draft and archived articles are never shown in shared lists.** For
   everybody (logged in or not, **including the author**), they must **not**
   appear in:
   - the Global Feed
   - "Your Feed" (articles of followed users)
   - the tag filter (clicking a popular tag)
   - the "Favorited Articles" tab of any profile
10. **The author's own profile is the only list where they appear.**
    - On their own profile ("My Articles"), the author sees all their articles,
      whatever the status.
    - On someone else's profile, a user only sees published articles.
11. **The article page** (`/article/<slug>`) of a draft or archived article:
    - The author can open it.
    - For any other user, it must answer as if the article does not exist
      (`404`), and they cannot comment on it or favorite it.
12. Pagination must be correct everywhere: the number of pages must match the
    number of articles the user can actually see (no empty pages at the end).

### User interface

13. In the article editor, the author can choose whether the article is saved as
    a draft or published (when creating **and** when editing).
14. On the article page, the author can see the current status and change it
    (publish / archive / move back to draft) without opening the editor.
    While the change is saving, the user sees that something is happening, and
    if it fails, the user sees an error message.
15. On **their own** profile page, the author can filter their articles by
    status: **All**, **Published**, **Draft**, **Archived**. The list shows a
    loading state while it loads and an error message if loading fails.
16. In the article lists, draft and archived articles show a visible status
    label so that the author can recognize them.
17. Other users never see the status filter or the status labels on someone
    else's profile.

### Do not break anything

18. All existing features keep working: sign up, login, settings, create / edit
    / delete article, comments, favorites, follow / unfollow, tags, feeds,
    pagination.
19. The project still starts with `docker compose up` on a fresh database
    **and** on a database that already exists (your migration and seed data are
    applied automatically).

## Expected behavior (examples)

- `exampleUser1` creates "My trip to Japan" and saves it as a **draft**.
  - `exampleUser1` sees it on their own profile with a "Draft" label, but
    not in the Global Feed.
  - `exampleUser2` does not see it in the Global Feed, in the tag filter, or on
    `exampleUser1`'s profile. If `exampleUser2` opens its URL directly, they get
    the "not found" page.
- `exampleUser1` publishes it. Now everyone sees it in the Global Feed, and
  followers of `exampleUser1` see it in "Your Feed".
- `exampleUser2` adds it to their favorites. Later, `exampleUser1` **archives**
  it. It disappears from the Global Feed **and** from the "Favorited Articles"
  tab of `exampleUser2`. Its comments and favorites are kept: if
  `exampleUser1` publishes it again, everything comes back.
- `exampleUser2` tries to change the status of an article of `exampleUser1`
  (for example with Postman or curl): the API answers `403` and nothing changes.

## Out of scope

- Scheduling an article to be published at a future date.
- Keeping a history of status changes.
- Admin or moderator roles.
