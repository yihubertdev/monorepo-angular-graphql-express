# MONOHub

- [Introduction](#yoohootech-blog)
  - [Architecture](#architecuture)
    - [Monorepo](#monorepo)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Getting started](#getting-started)
    - [Install dependencies](#install-dependencies)
    - [Setup the project](#setup-the-project)
  - [Tests](#tests)
    - [Existing test suites](#existing-test-suites)

## Architecuture
### MonoRepo

the project is built on the top of `yarn workspace`

### Frontend

- Lastest version of angular, the package.json will keep maintian the latest version of each node package by running command `yarn checkpack`.

- Angular service built with firebase packages.

- Design pattern strictly followed by SOLID principles.

### Backend

- Google cloud functions with apollo graphql.

- Google cloud functions with apollo express rest api.

- Storage and database connected with firebase packages.

- Async task triggered by GCP pub/sub, GCP tasks.

## Getting started

### Install dependencies

1. Install [git](https://git-scm.com/downloads)
2. Install [node](node version 16.14.2)
3. Install [npm](https://www.npmjs.com/get-npm)
4. Install [angular cli](https://github.com/angular/angular-cli/releases)

   - Install those dependencies and run `./deploy.sh` and `yarn install`
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

switched to jest, better performance

### Unit test

- `ng test`
  - jest unit test

### E2E test

---
