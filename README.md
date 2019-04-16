# Express TypeScript Boilerplate

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
OR
```
$ yarn install
```


#### 3. Start dev server
```
$ npm run dev
```

#### 4. Build for production
```
$ npm run build
```

---

### Directory Structure

```
+-- src
|   +-- routes
|   |   +-- home
|   |   |   +-- controller.ts
|   |   |   +-- index.ts
|   |   +-- user
|   |   |   +-- controller.ts
|   |   |   +-- index.ts
|   +-- app.ts
|   +-- server.ts
+-- nodemon.json
+-- package.json
+-- tsconfig.json
+-- tslint.json
+-- yarn.lock

```
