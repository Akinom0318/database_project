# Database Project
- This is a project that simulates a web of shopping website like 原價屋.

## Tech we use
- svelteKit
- TailwindCSS(flowbite, skeleton)
- Javascript, Typescript, node.js, npm package
- MySQL for backend
- prisma
- docker(compose)

## Team Member
1. Akinom
2. [SunGj](https://github.com/SunGj921028)
3. KJC
4. Notpotato

## How to use
#### Please prepare a environment already with nodejs, npm, docker, docker-compose.
1. Just clone this repo to your local repo using
```bash
git clone https://github.com/Akinom0318/database_project.git
```
2. Install the modules we need for the project
```bash
npm install
# Or
npm i
```
3. Please watch .env.example to see the environment setting.
4. The first five variables are for the docker to set up your DB environment, and the last one is for prisma to connect to your DB.
5. So, add a ```.env``` file on the root folder, add those six lines in .env.example into it.
6. Once you make your own .env file done
```bach
docker-compose up --build -d
```
7. Then you can open the website by
```bash
npm run dev
```

## Default Admin Account and Password
```bash
email: admin
password: admin
```

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

---
