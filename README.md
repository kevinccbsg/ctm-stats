# CTM-Stats

An open-source website designed to display [CTM-STATS](https://docs.google.com/spreadsheets/d/11EVjpP3bq1Q5zZJqZI23dmiYIsfcKcJBO376BTR6bBI/edit#gid=441377961).

This website is built with the following tools:

- [Node.js](https://nodejs.org/en/): Node.js® is an open-source, cross-platform JavaScript runtime environment.
- [React](https://react.dev/): The frontend code is developed with React and [TypeScript](https://www.typescriptlang.org/).
- [Ant Design (Antd)](https://ant.design/): An enterprise-class UI design language and React UI library with a set of high-quality React components—considered one of the best React UI libraries for enterprises.
- [CSS Modules](https://github.com/css-modules/css-modules): This project uses CSS modules and [SCSS](https://sass-lang.com/).
- [Supabase](https://supabase.com/): All CSV data is stored in an SQL database.
- [Docker](https://www.docker.com/products/docker-desktop/): Docker is required to run the Supabase environment.

## Project Scaffolding and Importing Information

To run this project, you need to install [Docker Desktop](https://docs.docker.com/desktop/) and Node.js version 18 or higher.

Once you have installed these tools, you can execute the following commands:

```bash
npm i # Install dependencies

npx supabase start # Create the Supabase environment
```

Once your Supabase containers are running, if you want to include all the information, you need to go to this repository and execute a few commands explained [here](https://github.com/kevinccbsg/ctm-stats-import). *(I have plans to integrate everything into one repository 😅)*

## Run project

After importing all the information, you need to create a `.env` file like this with your environment variables.

```bash
# These values appear after you run the `npx supabase start` command
API_URL=http://localhost:54321
GRAPHQL_URL=http://localhost:54321/graphql/v1
DB_URL=postgresql://postgres:postgres@localhost:54322/postgres
STUDIO_URL=http://localhost:54323
INBUCKET_URL=http://localhost:54324
JWT_SECRET=<JWT_SECRET>
SERVICE_ROLE_KEY=<SERVICE_ROLE_KEY>
```

Then, you only need to run ``npm run dev`, and you will have the development environment.

There's also the npm run test command to run the unit tests. We are using [vitest](https://vitest.dev/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/).
