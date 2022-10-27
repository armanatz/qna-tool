# Simple question and answer tool

Bootstrapped with my personal [Reactivite](https://github.com/armanatz/Reactivite) template

## Features

- Add questions
- Edit questions
- Sort questions alphabetically
- Delete questions (individual or all)
- Click to reveal answer to question

## Getting Started

Clone this repo and navigate to the project folder to install dependencies:

```
// If using NPM as your package manager
npm i

// If using Yarn as your package manager
yarn
```

Then you can run the local development server using:

```
// If using NPM as your package manager
npm run dev

// If using Yarn as your package manager
yarn dev
```

To build the application, run:

```
// If using NPM as your package manager
npm build

// If using Yarn as your package manager
yarn build
```

Build files will be located in the `dist` folder once generated.

## Available Scripts

- `format`: Formats all files with Prettier.
- `lint`: Type-checks all files with TypeScript, and then lints all files using ESLint and StyleLint.
- `preview`: Allows for a local preview of the production build of the application.
- `test`: Runs unit and integration tests based on file changes tracked in git using Vitest.
- `test:ci`: Runs all unit and integration tests in CI mode using Vitest.
- `test:watch`: Runs Vitest test runner in watch mode.
- `validate`: Runs all linting commands defined in `lint`, and then runs `test:ci` for testing.
