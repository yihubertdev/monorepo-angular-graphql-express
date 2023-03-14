# MonoRepo Angular, Serverless Graphql, Serverless Express

- [YoohooTech](#yoohootech-blog)
  - [Getting started](#getting-started)
    - [Install dependencies](#install-dependencies)
    - [Setup the project](#setup-the-project)
  - [Tests](#tests)
    - [Existing test suites](#existing-test-suites)

---

## Getting started

### Install dependencies

1. Install [git](https://git-scm.com/downloads)
2. Install [node](node version 16.14.2)
3. Install [npm](https://www.npmjs.com/get-npm)
4. Install [angular cli](https://github.com/angular/angular-cli/releases)

   - Install those dependencies and run `npm ci` and `ng serve`
   - Environment config file.

   ```toml
   export const environment = {
    production: "*",
    host: "*",
    firebaseConfig: {
        apiKey: "*",
        authDomain: "*",
        projectId: "*",
        storageBucket: "*",
        messagingSenderId: "*",
        appId: "*",
        measurementId: "*",
    },
    googleCloudApiKey: "*",
   };

   ```

### Setup the project

1. Install
   ```sh
   git clone git@github.com:hubertyydev/hbtyblog-frontend.git
   ```

## Tests

ng test

---

### Existing test suites

- `ng test`
  - karma unit test

---
