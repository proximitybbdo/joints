module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    compass: {
      dist: {
        // http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
        src: 'assets/css',
        dest: 'assets/css',
        images: 'assets/img',
        forcecompile: true
      }
    },

    coffee: {
      app: {
        src: ['assets/coffee/**/*.coffee'],
        dest: 'assets/js',
        options: {
          bare: false,
          preserve_dirs: true,
          base_path: 'assets/coffee'
        }
      },

      spec: {
        src: ['test/spec/**/*.coffee'],
        dest: 'tmp',
        options: {
          bare: true,
          preserve_dirs: true
        }
      }
    },

    concat: {
      app: {
        src: [
          'assets/js/app.js',
          'assets/js/main.js',
          'assets/js/config.js',
          'assets/js/router.js',
          'assets/js/helpers/*.js',
          'assets/js/models/*.js',
          'assets/js/views/*.js',
        ],
        dest: 'assets/js/app.js',
        separator: ';'
      },
      dist: {
        src: [
          'assets/js/vendor/jquery.js',
          'assets/js/vendor/lodash.js',
          'assets/js/vendor/backbone.js',
          'assets/js/vendor/handlebars.js',
          'assets/js/templates.js',
          'assets/js/templates-helper.js',
          'assets/js/app.js'
        ],
        dest: 'assets/js/javascript.js',
        separator: ';'
      },

      spec: {
        src: [
          'tmp/test/spec/**/*.js'
        ],
        dest: 'test/spec/specs.js',
        separator: ';'
      }
    },

    min: {
      app: {
        src: ['assets/js/javascript.js'],
        dest: 'assets/js/javascript.min.js'
      },
    },

    mocha: {
      index: ['test/browser/index.html'],
      mocha: {
        ignoreLeaks: false,
        grep: 'food',
        reporter: 'spec'
      },
    },

    watch: {
      test: {
        files: ['spec/unit/**/*.coffee'],
        tasks: 'mocha'
      }, 

      compass: {
        files: [
          'assets/css/**/*.{scss,sass}'
        ],
        tasks: 'compass reload'
      },

      app: {
        files: [
          'assets/**/*.coffee',
          'assets/**/*.sass',
          ],
        tasks: 'coffee:app'
      }
    },

  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-compass');
  
  // Default task.
  grunt.registerTask('default', 'coffee:app compass');
  grunt.registerTask('test', 'coffee:spec concat:spec mocha');
  grunt.registerTask('test-watch', 'mocha watch:test');
};
