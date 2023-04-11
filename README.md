<a href="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate?targetFile=package.json">
  <img src="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate?targetFile=package.json" style="max-width:100%;">
</a>
<a href="#">
  <img src="https://github.com/sidhantpanda/docker-express-typescript-boilerplate/workflows/Publish%20latest%20image/badge.svg" alt="Publish latest image" style="max-width:100%;">
</a>

---

# Express TypeScript Boilerplate with ChatGPT reviews
This repo can be used as a starting point for backend development with Nodejs. It comes bundled with Docker and is CI/CD optimized. The development environment uses `docker-compose` to start dependent services like mongo. There is [an action](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/.github/workflows/code-review.yml) to review all PRs with ChatGPT.

A few things to note in the project:
* **[Github Actions Workflows](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/tree/master/.github/workflows)** - Pre-configured Github Actions to run automated builds and publish image to Github Packages.
* **[Dockerfile](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/Dockerfile)** - Dockerfile to generate docker builds.
* **[docker-compose](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/docker-compose.yml)** - Docker compose script to start service in production mode.
* **[Containerized Mongo for development](#development)** - Starts a local mongo container with data persistence across runs.
* **[Safe Mongooose Connection Helper](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/src/lib/safe-mongoose-connection.ts)** - A helper class to connect with Mongoose reliably.
* **Joi** - For declarative payload validation
* **[Middleware for easier async/await](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/src/middleware/request-middleware.ts)** - Catches errors from routes and throws them to express error handler to prevent app crash due to uncaught errors.
* **[OpenAPI 3.0 Spec](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/openapi.yml)** - A starter template to get started with API documentation using OpenAPI 3.0. This API spec is also available when running the development server at `http://localhost:3000/dev/api-docs`
* **[.env file for configuration](#environment)** - Change server config like app port, mongo url etc
* **[Winston Logger](#logging)** - Uses winston as the logger for the application.
* **ESLINT** - ESLINT is configured for linting.
* **Jest** - Using Jest for running test cases

## I. Installation

### Using `curl`

```
$ bash <(curl -s https://raw.githubusercontent.com/sidhantpanda/public/master/scripts/generate-express-ts-app.sh)
```

### Manual Method

#### 1. Clone this repo

```
$ git clone git@github.com:sidhantpanda/docker-express-typescript-boilerplate.git your-app-name
$ cd your-app-name
```

#### 2. Install dependencies

```
$ yarn install
```

## II. Configuration

#### Update Docker repository for actions
```
$ yarn setup-actions
```

## III. Development

### Start dev server
Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.

```
$ yarn dev
```
Running the above commands results in 
* 🌏**API Server** running at `http://localhost:3000`
* ⚙️**Swagger UI** at `http://localhost:3000/dev/api-docs`
* 🛢️**MongoDB** running at `mongodb://localhost:27017`

## IV. Packaging and Deployment

The mongo container is only only available in dev environment. When you build and deploy the docker image, be sure to provide the correct **[environment variables](#environment)**.

#### 1. Build and run without Docker

```
$ yarn build && yarn start
```

#### 2. Run with docker

```
$ docker build -t api-server .
$ docker run -t -i \
      --env NODE_ENV=production \
      --env MONGO_URL=mongodb://host.docker.internal:27017/books \
      -p 3000:3000 \
      api-server
```

#### 3. Run with docker-compose

```
$ docker-compose up
```


---

## Environment
To edit environment variables, create a file with name `.env` and copy the contents from `.env.default` to start with.

| Var Name  | Type  | Default | Description  |
|---|---|---|---|
| NODE_ENV  | string  | `development` |API runtime environment. eg: `staging`  |
|  PORT | number  | `3000` | Port to run the API server on |
|  MONGO_URL | string  | `mongodb://localhost:27017/books` | URL for MongoDB |

## Logging
The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at `src/logger.ts`.
* All logs are saved in `./logs` directory and at `/logs` in the docker container.
* The `docker-compose` file has a volume attached to container to expose host directory to the container for writing logs.
* Console messages are prettified
* Each line in error log file is a stringified JSON.


### Directory Structure

```
+-- scripts
|   +-- dev.sh
|   +-- setup-github-actions.sh
+-- src
|   +-- controllers
|   |   +-- book
|   |   |   +-- add.ts
|   |   |   +-- all.ts
|   |   |   +-- get.ts
|   |   |   +-- index.ts
|   |   |   +-- remove.ts
|   |   |   +-- search.ts
|   +-- errors
|   |   +-- application-error.ts
|   |   +-- bad-request.ts
|   +-- lib
|   |   +-- safe-mongo-connection.ts
|   |   +-- winston-console-transport.ts
|   +-- middleware
|   |   +-- request-middleware.ts
|   +-- models
|   |   +-- Book.ts
|   +-- public
|   |   +-- index.html
|   +-- app.ts
|   +-- logger.ts
|   +-- routes.ts
|   +-- server.ts
+-- .env.default
+-- .eslintrc.json
+-- .gitignore
+-- .gitpod.yml
+-- docker-compose.dev.yml
+-- docker-compose.yml
+-- Dockerfile
+-- jest.config.js
+-- LICENSE
+-- nodemon.json
+-- openapi.yml
+-- package.json
+-- README.md
+-- renovate.json
+-- tsconfig.json
+-- yarn.lock
```
