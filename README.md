# ToolBoxChallenge

This repository contains a small full-stack project with two apps:

- `apps/client` — a React front-end built with Vite.
- `apps/server` — an Express server with Mocha/Chai tests.

This README explains the technologies used, Node.js versions, how to run each app locally, how to run tests, and how to run the apps using Docker Compose.

## Technologies

### apps/client
- Framework: React
- Bundler / dev server: Vite
- Test runner: Jest (used in the client app)
- Key libraries: react, react-dom, react-bootstrap, bootstrap
- Node version: 16.20.2

### apps/server
- Framework: Express
- Testing: Mocha + Chai
- Other libs: cors, node-fetch
- Node version: 14.21.3

## Run locally

Prerequisites:
- nvm (for managing multiple node versions)

### Client (development)

1. Install dependencies

```console
cd .\apps\client
npm install
```

2. Start the Vite dev server

```console
npm run start
```

The dev server runs on port 5173 by default. Open http://localhost:5173

### Server (development)

1. Install dependencies

```console
cd .\apps\server
npm install
```

2. Start the server

```console
npm start
```

The server uses `nodemon` in development and will reload on changes. The 3001 port is set in the server code.

## Tests

### Client tests

From `apps/client`:

```console
npm test
```

This runs Jest-based tests in the client app.

### Server tests

From `apps/server`:

```console
npm test
```

This runs Mocha tests (the test command uses `npx mocha --recursive test/**/*.spec.js`).

## Docker (development with Vite)

A development Dockerfile has been provided for the client app that runs the Vite dev server and binds to `0.0.0.0` so the server is accessible from the host.

Build and run the client dev image:

```console
cd .\apps\client
docker build -t toolbox-client:dev .
docker run --rm -p 5173:5173 toolbox-client:dev
```

Open http://localhost:5173

## Docker Compose

Run:

```console
docker-compose up --build
```

This will build and run both services. The client will be reachable on port 5173 and the server on port 3001.
