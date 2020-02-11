This project is for demonstration purposes only

## Setup

### `IDE`

Install the following plugins on vscode:

-   EditorConfig
-   ESLint
-   JEST
-   Prettier
-   SASS
-   vscode-styled-components

### `Project`

Execute the following command to initialize the project.

```shell
npm i -g yarn
yarn global add lerna rimraf
cd portal
yarn bootstrap
```

## Available Scripts

In the project directory, you can run:

### `yarn bootstrap`

Install all dependencies.<br>

### `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the portal app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn bundle`

Builds all llibraries and apps with tests.<br>
Your app is ready to be deployed!

### `yarn eslint`

Launches ESLint tool for JavaScript and jsx

### `yarn storybook`

Runs the storybook in the development mode.<br>
Open [http://localhost:9009](http://localhost:9009) to view it in the browser.

### `yarn build-storybook`

Build storybook to output the static websites in ./build/storybook folder.

### `yarn doc`

Build jsDoc documentation in ./build/jsdoc folder.
