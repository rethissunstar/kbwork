# KB FANATICS

![Github Issues Badge](https://img.shields.io/github/issues/matthew-millard/kb-fanatics)
![License Badge](https://img.shields.io/github/license/matthew-millard/kb-fanatics)
![Contributors Badge](https://img.shields.io/github/contributors/matthew-millard/kb-fanatics?color=blue)
![Last Commit Badge](https://img.shields.io/github/last-commit/matthew-millard/kb-fanatics)

## Description

KB FANATICS - a mock online store dedicated to mechanical keyboard enthusiasts. On the frontend, we utilize React and Apollo Client for an intuitive and dynamic user experience. For the backend, we've chosen NodeJS, Apollo Server, and MongoDB, providing a powerful, scalable, and real-time solution.

## Table Of Contents

- [Project Setup Guide](#project-setup-guide)
  - [Installation Steps](#installation-steps)
  - [Running the Application Locally](#running-the-application-locally)
- [ESLint and Prettier with Airbnb Style Guide](#eslint-and-prettier-with-airbnb-style-guide)
- [Visual Studio Code Configuration](#visual-studio-code-configuration)

## Project Setup Guide

### Installation Steps

1. Clone this repository to your local machine.

2. Navigate to the project root directory.

3. Install the project dependencies by running `npm install`. This will run the following script:

   ```JSON
   "install": "cd server && npm i && cd ../client && npm i"
   ```

4. Launch MongoDB Compass and connect to
   `mongodb://localhost:27017`.

5. Seed the database with the command npm run seed.

### Running the Application Locally

Launch the application with the command `npm run develop`.

## ESLint and Prettier with Airbnb Style Guide

We've chosen to adopt Airbnb's JavaScript Style Guide, one of the most popular code style guides for JavaScript. It promotes best practices, increases consistency and readability of our code, and helps us avoid common errors.

## Visual Studio Code Configuration

We also have a defined workspace configuration for Visual Studio Code (VS Code). This helps to maintain consistency across development environments when multiple developers work on the same project.

```json
{
  "eslint.options": {
    "overrideConfigFile": ".eslintrc.json"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

Here is an explanation of the settings:

- eslint.options: This tells VS Code to use our custom ESLint configuration file (.eslintrc.json) for linting the project.

- editor.defaultFormatter: We use Prettier as our default formatter. This is the extension ID for Prettier in VS Code.
  editor.formatOnSave: We set this to false to prevent VS Code from automatically formatting the entire file when you save it, which might conflict with our ESLint rules.

- editor.codeActionsOnSave: This setting is for applying automated fixes for issues that ESLint has detected when a file is saved. source.fixAll.eslint is set to true to fix all auto-fixable ESLint problems on save.

**_This configuration is saved in the .vscode/settings.json file in the project root. When you open this project in VS Code, these settings will be automatically applied to their editor._**
