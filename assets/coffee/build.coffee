require.config {
  deps: ['main']
  baseUrl: "/assets/js"
  paths:
    jquery: 'vendor/jquery'
    lodash: 'vendor/lodash'
    backbone: 'vendor/backbone'
    handlebars: 'vendor/handlebars'
  shim:
    handlebars:
      exports: "Handlebars"
    lodash:
      exports: "_"
    backbone:
      deps: ['lodash', 'jquery']
      exports: 'Backbone'
}
