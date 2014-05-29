/*
 * grunt-font-sampler
 * https://github.com/pedrocorreia/font-sampler
 *
 * Copyright (c) 2014 Pedro Correia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    font_sampler: {
      my_sample: {
          fontname: 'Ink-Icons',
          charmap: 'glyphs.json',
          dest: 'dist/sample.html',
          sizes: [16,18,20,22,24,26,28,30,32,34,36,38,40],
          stylesheets: ["http://cdn.ink.sapo.pt/3.0.2/css/ink.min.css","css/ink-icons.css"],
          col_width: 100,
          sample_template: '<div class="all-{% width %} p{% size %}">\n<p>{% size %}px</p>{% glyph %}</div>\n',
          glyph_template: '<span class="ii ii-{% glyph %}"></span>\n'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'font_sampler', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
