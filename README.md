# CTM-stats

Open-source website to display [CTM-STATS](https://docs.google.com/spreadsheets/d/11EVjpP3bq1Q5zZJqZI23dmiYIsfcKcJBO376BTR6bBI/edit#gid=441377961).

This website is build with these tools:

- [NodeJS](https://nodejs.org/en/): Node.js® is an open-source, cross-platform JavaScript runtime environment.
- [React](https://react.dev/): Frontend code is develop with React and [Typescript](https://www.typescriptlang.org/).
- [Antd](https://ant.design/): An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises.
- [css-modules](https://github.com/css-modules/css-modules): This project uses css modules and [scss](https://sass-lang.com/).
- [Supabase](https://supabase.com/): Where all the CSV data is stored in an SQL database.
- [Docker](https://www.docker.com/products/docker-desktop/): Required to run supabase environment.

## Project scaffolding and import all the info

If you want to run this project you need to install [docker desktop](https://docs.docker.com/desktop/) and nodejs >= 18.

Once you installed those tools you can run these commands:

```bash
npm i # install dependencies

npx supabase start # create the supabase environment
```

Once you have your supabase containers running if you want to include all the info you have to go to this repository and execute a few commands explained [here](https://github.com/kevinccbsg/ctm-stats-import). *I have plans to integrate all in one repository 😅*

## Run project

After you import all the info you need to create a `.env` file like this with your env variables.

```bash
# these values appear after you run the npx supabase start command
API_URL=http://localhost:54321
GRAPHQL_URL=http://localhost:54321/graphql/v1
DB_URL=postgresql://postgres:postgres@localhost:54322/postgres
STUDIO_URL=http://localhost:54323
INBUCKET_URL=http://localhost:54324
JWT_SECRET=<JWT_SECRET>
SERVICE_ROLE_KEY=<SERVICE_ROLE_KEY>
```

Then you only need to run `npm run dev` and you will have the dev environment.

There's also `npm run test` command to run the unit tests. We are using [vitest](https://vitest.dev/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/).
