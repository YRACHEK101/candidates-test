# Conduit: Technical Test for Interns

Welcome! In this test you will work on a real, existing web application and add
a new feature to it. We want to see how you **read and understand** code that
you did not write, and how you **change it safely**.

## 1. About the project

**Conduit** is a blogging platform (like a small Medium). Users can sign up,
write articles, add tags, comment, favorite articles and follow other users.

| Layer    | Technology                                   |
| -------- | -------------------------------------------- |
| Frontend | React + Vite (folder `frontend/`)            |
| Backend  | Node.js + Express (folder `backend/`)        |
| Database | PostgreSQL, with the Sequelize ORM           |
| Run      | Docker + docker compose                      |

**Credits:** This project is based on the open-source
[Conduit RealWorld example app](https://github.com/TonyMckes/conduit-realworld-example-app)
by **TonyMckes** and contributors, part of the
[RealWorld](https://github.com/gothinkster/realworld) project. It is used under
the MIT License (see [LICENSE](LICENSE)). We only added a Docker setup, database
migrations and seed data.

## 2. Prerequisites

Install these tools before you start:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (LTS version)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (it includes `docker compose`)

## 3. Steps

### 3.1 Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 3.2 Create your own branch

Name your branch with your full name, in lowercase, with hyphens.
Example for Ahmed Benali:

```bash
git checkout -b ahmed-benali
```

### 3.3 Create your candidate folder

Create a folder with your full name inside `candidates/`.
Example: `candidates/ahmed-benali/`. You will put your `SOLUTION.md` file in it
(see section 4).

### 3.4 Run the project (before you change anything!)

```bash
cp .env.example .env        # on Windows (PowerShell): copy .env.example .env
docker compose up --build
```

The first start takes a few minutes. When it is ready:

- Website: <http://localhost:3000>
- API: <http://localhost:3001/api/articles>

The database tables and example data are created automatically when the
backend starts (Sequelize migrations and seeders).

You can log in with an example user:

| Email               | Password      |
| ------------------- | ------------- |
| `example1@mail.com` | `examplePwd1` |
| `example2@mail.com` | `examplePwd2` |

(Users `example3` to `example5` follow the same pattern.)

**Check that everything works before you change anything:** open the website,
log in, open an article, filter by a tag, favorite an article, write a comment.

Useful commands:

```bash
docker compose up                 # start
docker compose down               # stop
docker compose down -v            # stop AND delete the database (fresh start)
docker compose logs -f server     # see backend logs
docker compose restart server     # restart the backend (runs new migrations/seeders)
docker compose exec db psql -U conduit -d conduit   # open the database
```

Your code changes in `backend/` and `frontend/` are picked up automatically.
You do not need to rebuild the images, except if you add a new npm package
(then run `docker compose up --build`).

### 3.5 Implement the task

Read [TASK.md](TASK.md) carefully and implement the feature in the project code.
Read all the acceptance criteria. Some of them are easy to miss.

### 3.6 Commit often

Make **small commits with clear messages** while you work. Do not make one big
commit at the end. Example:

```text
Add status column to articles (migration)
Return article status in the API
Hide draft articles from the global feed
Add status filter on the profile page
```

### 3.7 Push and open a Pull Request

```bash
git push -u origin ahmed-benali
```

Then open a **Pull Request** to the `main` branch and fill in the template.

## 4. Required: SOLUTION.md

Inside your folder (`candidates/<your-full-name>/SOLUTION.md`), explain **in your
own words**:

1. **How you understood the existing code**: which parts you read first and why.
2. **What you changed** in the database, the backend and the frontend, and why.
3. **Problems you met** and how you solved them.
4. **How you tested** your work.
5. **What you would improve** with more time.

Short and honest is better than long and generic.

## 5. AI policy

You are allowed to use AI tools. But you must understand every line you submit.
In the interview we will ask you to explain your code and make a small change
live, without AI.

## 6. Deadline

[placeholder]

Good luck!
