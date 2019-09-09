  <!-- Dependency Status -->
<a href="https://david-dm.org/sidhantpanda/docker-express-typescript-boilerplate">
  <img src="https://david-dm.org/flexdinesh/react-redux-boilerplate.svg" alt="Dependency Status" />
</a>
<!-- devDependency Status -->
<a href="https://david-dm.org/sidhantpanda/docker-express-typescript-boilerplate#info=devDependencies">
  <img src="https://david-dm.org/flexdinesh/react-redux-boilerplate/dev-status.svg" alt="devDependency Status" />
</a>
<a href="https://travis-ci.org/sidhantpanda/docker-express-typescript-boilerplate">
  <img src="https://travis-ci.org/sidhantpanda/docker-express-typescript-boilerplate.svg?branch=master" alt="Build Status" />
</a>
<a href="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate?targetFile=package.json">
  <img src="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate?targetFile=package.json" style="max-width:100%;">
</a>

# Express TypeScript Boilerplate
This repo can be used as a starting point for backend development with Nodejs. It comes bundled with Docker and is CI/CD optimized. The development environment uses `docker-compose` to start dependent services like mongo.

A few things to note in the project:
* [Dockerfile](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/Dockerfile) - Dockerfile to generate docker builds.
* [docker-compose](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/docker-compose.yml) - Docker compose script to start service in production mode.
* [Mongo Connection Helper](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/src/mongo-connection.ts) - A helper class to connect to MongoDB reliably.
* [Middleware for easier async/await](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/src/middleware/handle-error-middleware.ts) - Catches errors from routes and throws them to express error handler to prevent app crash due to uncaught errors.
* [OpenAPI 3.0 Spec](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/openapi.json) - A starter template to get started with API documentation using OpenAPI 3.0. This API spec is also available when running the development server at `http://localhost:3000/dev/api-docs`


## Using `curl`

```
$ bash <(curl -s https://raw.githubusercontent.com/sidhantpanda/public/master/scripts/generate-express-ts-app.sh)
```

## Manual Method

#### 1. Clone this repo

```
$ git clone git@github.com:sidhantpanda/express-typescript-boilerplate.git your-app-name
$ cd your-app-name
```

#### 2. Install dependencies

```
$ npm i
```

#### 3. Start dev server
Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.

```
$ npm run dev
```


#### 4A. Run with docker-compose

```
$ docker-compose up
```

#### 4B. Run with docker

```
$ docker build -t api-server .
$ docker run -t -i -p 3000:3000 api-server
```

#### 4C. Build and run

```
$ npm run build && npm run start
```

---

### Directory Structure

```
+-- scripts
|   +-- dev.sh
+-- src
|   +-- middleware
|   |   +-- handle-error-middleware.ts
|   +-- models
|   |   +-- Book.ts
|   +-- app.ts
|   +-- server.ts
|   +-- routes
|   |   +-- book
|   |   |   +-- controller
|   |   |   |   +-- add.ts
|   |   |   |   +-- search.ts
|   |   |   |   +-- index.ts
|   |   |   +-- index.ts
|   +-- app.ts
|   +-- server.ts
+-- .eslintrc.js
+-- .gitignore
+-- .prettierrc.js
+-- docker-compose.dev.yml
+-- docker-compose.yml
+-- Dockerfile
+-- nodemon.json
+-- openapi.json
+-- package-lock.json
+-- package.json
+-- README.md
+-- tsconfig.json
```
