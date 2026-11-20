# Conduit: Technical Test for Interns

Welcome! Start here. This file explains everything you need: the project, how
to run it, what to build, and the rules.

In this test you will add a feature to a real application that you did not
write. We want to see how you **read and understand** existing code, and how
you **change it safely**.

## 1. The project

**Conduit** is a blogging platform (like a small Medium). Users can sign up,
log in, write articles in Markdown, add tags, comment, favorite articles and
follow other users.

| Layer    | Technology                                  | Folder      |
| -------- | ------------------------------------------- | ----------- |
| Frontend | React + Vite                                | `frontend/` |
| Backend  | Node.js + Express                           | `backend/`  |
| Database | PostgreSQL, with the Sequelize ORM          | `backend/migrations/`, `backend/seeders/`, `backend/models/` |
| Run      | Docker + docker compose                     | `docker-compose.yml` |

**Credits:** This project is based on the open-source
[Conduit RealWorld example app](https://github.com/TonyMckes/conduit-realworld-example-app)
by **TonyMckes** and contributors, part of the
[RealWorld](https://github.com/gothinkster/realworld) project. It is used under
the **MIT License** (see [LICENSE](LICENSE)). We only added a Docker setup,
database migrations and seed data.

## 2. Prerequisites

Install these tools before you start:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (LTS version)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (it includes `docker compose`)

> **Windows users:** run all the commands in this file in **Git Bash** (installed
> with Git for Windows), **not** in PowerShell or cmd.

## 3. Run the project

### 3.1 Get the code and create your branch

```bash
git clone <repository-url>
cd <repository-folder>
git checkout -b firstname-lastname      # example: git checkout -b ahmed-benali
```

### 3.2 Start everything with Docker

```bash
cp .env.example .env
docker compose up --build
```

The first start takes a few minutes. When it is ready:

- Website: <http://localhost:3000>
- API: <http://localhost:3001/api/articles>

The database tables and example data are created automatically when the
backend starts (Sequelize migrations and seeders).

### 3.3 Log in with an example user

| Email               | Password      | Username       |
| ------------------- | ------------- | -------------- |
| `example1@mail.com` | `examplePwd1` | `exampleUser1` |
| `example2@mail.com` | `examplePwd2` | `exampleUser2` |

Users `example3` to `example5` follow the same pattern.

**Before you change anything**, check that the project works: open the
website, log in, open an article, click a tag, favorite an article and write a
comment.

### 3.4 Useful commands

```bash
docker compose up                 # start
docker compose down               # stop
docker compose down -v            # stop AND delete the database (fresh start)
docker compose logs -f server     # see the backend logs
docker compose restart server     # restart the backend (runs new migrations and seeders)
docker compose exec db psql -U conduit -d conduit   # open the database
npm install && npm test           # run the existing tests (on your machine, not in Docker)
```

Your code changes in `backend/` and `frontend/` are picked up automatically.
You only need `docker compose up --build` again if you add a new npm package.

## 4. The task: article status (Draft / Published / Archived)

The full ticket is in **[TASK.md](TASK.md)**. Read it completely, it has more
details and examples. Here is the summary.

### User story

Today, every article is visible to everyone as soon as it is created. Authors
want to **prepare an article as a draft** before sharing it, and to **hide old
articles without deleting them**. Every article must get a **status**:

| Status      | Who can see it                       |
| ----------- | ------------------------------------ |
| `draft`     | Only the author                      |
| `published` | Everyone (how all articles work now) |
| `archived`  | Only the author (not deleted)        |

### Acceptance criteria (summary of TASK.md)

**Data**
1. Every article has a status: `draft`, `published` or `archived`. No other
   value and no empty value is accepted by the database.
2. All existing articles become `published`. No data is lost.
3. The change is made with a **new Sequelize migration** that can be reversed.
   Do not edit existing migrations and do not use `sequelize.sync()`.
4. Seed data: `exampleUser1` has at least 2 draft articles and 1 archived
   article. It must also work on a database that already has the old seed data.

**API**
5. Every article returned by the API includes its `status`.
6. The author can choose the status when creating an article. If no status is
   sent, the article is `published` (existing API clients keep working).
7. The author can change the status of their article.
8. Only the author can change the status: `401` if not logged in, `403` if not
   the author, `404` if the article does not exist, `422` with a clear message
   if the status value is invalid.
9. Draft and archived articles never appear in the Global Feed, "Your Feed",
   the tag filter, or any "Favorited Articles" tab, **not even for the author**.
10. The author's own profile is the only list where they appear. On someone
    else's profile, you only see published articles.
11. The article page of a draft or archived article opens for its author. For
    anyone else it is "not found" (`404`), and they cannot comment on it or
    favorite it.
12. Pagination is correct everywhere (no empty pages at the end).

**User interface**
13. In the editor, the author chooses draft or published (when creating and
    when editing).
14. On the article page, the author sees the status and can change it without
    opening the editor, with a loading state and an error message.
15. On their own profile, the author can filter by **All / Published / Draft /
    Archived**, with a loading state and an error message.
16. Draft and archived articles show a status label in the lists.
17. Other users never see the filter or the labels on someone else's profile.

**Do not break anything**
18. All existing features keep working.
19. The project still starts with `docker compose up`, on a fresh database
    **and** on an existing one.

Some criteria are easy to miss. Read the existing code carefully before you
start.

## 5. Rules

- Work **only on your own branch**, named `firstname-lastname` (your full name,
  lowercase, hyphens, for example `ahmed-benali`). **Never commit or push to
  `main`.**
- Create the folder `candidates/<your-full-name>/` (for example
  `candidates/ahmed-benali/`) with a `SOLUTION.md` file inside (see section 6).
- Make **small commits with clear messages** while you work, not one big commit
  at the end. Example:

  ```text
  Add status column to articles (migration)
  Return the article status in the API
  Add status filter on the profile page
  ```

- **Do not modify other candidates' branches or folders.**
- Database changes must be done with a **new Sequelize migration**.
- When you are done, push your branch and open a **Pull Request to `main`**.
  Fill in the Pull Request template.

  ```bash
  git push -u origin firstname-lastname
  ```

- **AI policy:** You are allowed to use AI tools. But you must understand every
  line you submit. In the interview we will ask you to explain your code and
  make a small change live, without AI.
- **Deadline:** [placeholder]

## 6. SOLUTION.md

In `candidates/<your-full-name>/SOLUTION.md`, explain **in your own words**:

1. **How you understood the existing code**: which parts you read first and why.
2. **What you changed** in the database, the backend and the frontend, and why.
3. **Problems you met** and how you solved them.
4. **How you tested** your work.
5. **What you would improve** with more time.

Short and honest is better than long and generic.

## 7. How your work is evaluated

We look at:

- **Does it work?** The project starts with Docker, the feature works end to
  end, and existing features are not broken.
- **Database design:** the migration, the data rules and the seed data.
- **API quality:** correct behavior, validation, status codes and error
  handling.
- **React code:** clear components that follow the existing style, with
  loading and error states.
- **Git history:** small, clear commits on your own branch, and only the files
  needed for the task.
- **SOLUTION.md:** clear, honest and matching your code.
- **Interview:** you explain your code and make a small change live.

Good luck!
