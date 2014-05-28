/*
 * grunt-font-sampler
 * https://github.com/pedrocorreia/font-sampler
 *
 * Copyright (c) 2014 Pedro Correia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('font_sampler', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      fontname: 'Ink-Icons',
      charmap: 'glyphs.json',
      dest: 'dist/sample.html',
      sizes: [16,18,20,22,24,26,28,30,32,34,36,38,40],
      stylesheets: ["http://cdn.ink.sapo.pt/3.0.2/css/ink.min.css","/css/ink-icons.css"]
    });

    var json = grunt.file.readJSON(options.charmap);
    var chars = json.chars;

    var sampler = grunt.file.read('doc-head.html');

    options.stylesheets.forEach(function(css){
        sampler += '<link rel="stylesheet" type="text/css" href="'+css+'">\n'
    });

    // create sizes css
    sampler += '<style>\n';

    options.sizes.forEach(function(size){
        sampler += '.p'+size+' { font-size: '+size+'px !important; } \n'
    });

    sampler += '</style>\n';

    sampler += grunt.file.read('doc-body.html');

    options.sizes.forEach(function(size){
        sampler += '<div class="all-25 p'+size+'">\n';
        sampler += '<p>'+ size +'px<p>\n';
        chars.forEach(function(glyph){
            sampler += '<span class="ii ii-'+glyph+'"></span>\n'
        });
        sampler += '</div>\n';
    });

    sampler += grunt.file.read('doc-end.html');

    grunt.file.write(options.dest, sampler);


    // // Iterate over all specified file groups.
    // this.files.forEach(function(f) {
    //   // Concat specified files.
    //   var src = f.src.filter(function(filepath) {
    //     // Warn on and remove invalid source files (if nonull was set).
    //     if (!grunt.file.exists(filepath)) {
    //       grunt.log.warn('Source file "' + filepath + '" not found.');
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }).map(function(filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));
    //
    //   // Handle options.
    //   src += options.punctuation;
    //
    //   // Write the destination file.
    //   grunt.file.write(f.dest, src);
    //
    //   // Print a success message.
    //   grunt.log.writeln('File "' + f.dest + '" created.');
    // });
  });

};
