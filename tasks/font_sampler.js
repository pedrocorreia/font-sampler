/*
 * grunt-font-sampler
 * https://github.com/pedrocorreia/font-sampler
 *
 * Copyright (c) 2014 Pedro Correia
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');

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
      stylesheets: ["http://cdn.ink.sapo.pt/3.0.2/css/ink.min.css","css/ink-icons.css"],
      col_width: 100,
      sample_template: '<div class="all-{% width %} p{% size %}">\n<p>{% size %}px</p>{% glyph %}</div>\n',
      glyph_template: '<span class="ii ii-{% glyph %}"></span>\n'
    });

    var css = "\n";
    var samples_markup = "<h1>"+ options.fontname +"</h1>\n";
    var sampler = "\n";

    // load the glyphs json map
    var json = grunt.file.readJSON(options.charmap);
    var glyphs = json.glyphs;

    // load the template file
    var template = grunt.file.read('template.html');

    var sample_tag = /\{%[ ]*sample[ ]*%\}/ig;
    var stylesheets_tag = /\{%[ ]*stylesheets[ ]*%\}/ig;
    var width_tag = /\{%[ ]*width[ ]*%\}/ig;
    var size_tag = /\{%[ ]*size[ ]*%\}/ig;
    var glyph_tag = /\{%[ ]*glyph[ ]*%\}/ig;

    // build the css string
    options.stylesheets.forEach(function(file){
        css += '<link rel="stylesheet" type="text/css" href="' + file + '">\n';
        // css += file ;
    });

    // console.log(css);
    // create sizes css
    css += '<style>\n';

    options.sizes.forEach(function(size){
        css += '.p'+size+' { font-size: '+size+'px !important; } \n';
    });

    css += '</style>\n';

    // console.log(template.match(stylesheets_tag));

    sampler = template.replace(stylesheets_tag,css);


    options.sizes.forEach(function(size){

        grunt.log.writeln('Creating sample for ' + chalk.cyan(size + 'px') + '.');

        samples_markup += options.sample_template.replace(size_tag,size);
        samples_markup = samples_markup.replace(width_tag,options.col_width);

        var glyph_markup = "\n";

        glyphs.forEach(function(glyph){
            glyph_markup += options.glyph_template.replace(glyph_tag,glyph);
        });

        samples_markup = samples_markup.replace(glyph_tag,glyph_markup);
    });

    sampler = sampler.replace(sample_tag,samples_markup);

    grunt.file.write(options.dest, sampler);

    grunt.log.writeln('File ' + chalk.green(options.dest) + ' created.');

  });

};
