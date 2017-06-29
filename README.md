# babel-preset-hyperapp
A Babel preset for HyperApp

## Usage
If you want to use this Babel preset in a project using HyperApp, you can install it with following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then create a file named `.babelrc` with following contents in the root folder of your project:

```source-js
{
  "presets": ["hyperapp"]
}
```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/) and [transform-react-jsx](http://babeljs.io/docs/plugins/transform-react-jsx/), which assumes that `Object.assign` is available or polyfilled.

Also remember to provide environment variables in your `package.json` like this, 

```
"scripts": {
  "start": "NODE_ENV=development ./node_modules/.bin/webpack-dev-server --watch --hot --open,
  "build": "NODE_ENV=production ./node_modules/.bin/webpack"
}

```
