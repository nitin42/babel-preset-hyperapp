// Preset for HyperApp

const flowPreset = require('babel-preset-flow');

const plugins = [
  require.resolve('babel-plugin-transform-class-properties'), // Useful for outside app({}) logic or we may support classes
  [
    require.resolve('babel-plugin-transform-object-rest-spread'), // In app use
    {
      useBuiltIns: true,
    },
  ],
  // Polyfills the runtime needed for async/await and generators
  [
    require.resolve('babel-plugin-transform-runtime'),
    {
      helpers: false,
      polyfill: false,
      regenerator: true
    }
  ],
  [
    require.resolve('babel-plugin-transform-react-jsx'),
    {
      "pragma": "h"
    }
  ]
];

var env = process.env.BABEL_ENV || process.env.NODE_ENV;
if (env !== 'development' && env !== 'test' && env !== 'production') {
  throw new Error(
    'Using `babel-preset-hyperapp` requires that you specify `NODE_ENV` or ' +
    '`BABEL_ENV` environment variables. Valid values are "development", ' +
    '"test", and "production". Instead, received: ' +
    JSON.stringify(env) +
    '.'
  )
}

if (env === 'test') {
  module.exports = {
    presets: [
      flowPreset,
      [
        require('babel-preset-env').default,
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
    plugins: plugins.concat([
      // Compiles import() to a deferred require()
      require.resolve('babel-plugin-dynamic-import-node'),
    ]),
  };
} else {
  module.exports = {
    presets: [
      flowPreset,
      [
        require.resolve('babel-preset-env'),
        {
          targets: {
            ie: 11,
            uglify: true,
          },
          modules: false, // Let webpack do the treeshaking
          // Disable polyfill transforms
          useBuiltIns: false,
        },
      ],
    ],
    plugins: plugins.concat([
      // function* () { yield 10; yield 11; }
      [
        require.resolve('babel-plugin-transform-regenerator'),
        {
          // Async functions are converted to generators by babel-preset-env
          async: false,
        },
      ],
      // Adds syntax support for import()
      require.resolve('babel-plugin-syntax-dynamic-import'),
    ]),
  };
}
