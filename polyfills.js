/*
  @babel/polyfill will polyfill _most_ newer features used in the app code
  automatically via @babel/preset-env w/ useBuiltIns.
  Some features are not implemented by @babel/polyfill (or rather, its
  dependencies, regenerator-runtime and core-js), and as such should be
  added to this file, which is a common entry point in the Webpack config.
*/
