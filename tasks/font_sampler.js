/*
 * grunt-font-sampler
 * https://github.com/pedrocorreia/font-sampler
 *
 * Copyright (c) 2014 Pedro Correia
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var parser = require('xml2js');

module.exports = function(grunt) {

  grunt.registerMultiTask('font_sampler', 'The best Grunt plugin ever.', function() {

    var done = this.async();

    var options = this.options({
      fontname: 'Ink-Icons',
      charmap: 'chars',
      dest: 'dist/sample.html',
      sass: 'src/sass/_glyphs.scss',
      sizes: [16,18,20,22,24,26,28,30,32,34,36,38,40],
      stylesheets: ["http://cdn.ink.sapo.pt/3.0.2/css/ink.min.css","css/ink-icons.css"],
      col_width: 100,
      sample_template: '<div class="all-{% width %} p{% size %}">\n<p>{% size %}px</p>{% glyph %}</div>\n',
      glyph_template: '<span class="ii ii-{% glyph %}"></span>\n',
      page_template: 'template/template.html',
      glyph_name_prefix: 'ink.',
      glyph_name_separator: '.',
      remove_glyph_name_prefix: true,
      sass_header: '$sf-icons: (\n'
    });

    var xml_chars = grunt.file.read(options.charmap);
    var json_chars, scss, unicode, name;
    var glyphs = [];

    parser.parseString(xml_chars, function (err, result) {
        json_chars = result;
    });

    scss = options.sass_header;

    json_chars.ZapfTable.glyphInfo.forEach(function(glyph, index){

        if ( glyph.unicodeList !== undefined ) {

            unicode = glyph.unicodeList[0].unicode[0].$.value;
            name = glyph.fontGlyph[0].$.glyphName.replace(/\./g,"-");
            name = name.replace(/ink-/g,'');


            if( unicode.match(/\+E([a-z0-9])/g) !== null )
            {
                scss += "\t('"+name+"','"+unicode.replace("U\+",'\\').toLowerCase()+"'),\n";
                glyphs.push(name);
            }
        }

    });

    scss += ");\n";
    // console.log(scss);

    var css = "\n";
    var samples_markup = '<div class="all-100"><h1>'+ options.fontname +'</h1></div>\n';
    var sampler = "\n";

    // load the template file
    var template = grunt.file.read(options.page_template);

    var sample_tag = /\{%[ ]*sample[ ]*%\}/ig;
    var stylesheets_tag = /\{%[ ]*stylesheets[ ]*%\}/ig;
    var width_tag = /\{%[ ]*width[ ]*%\}/ig;
    var size_tag = /\{%[ ]*size[ ]*%\}/ig;
    var glyph_tag = /\{%[ ]*glyph[ ]*%\}/ig;

    // build the css string
    options.stylesheets.forEach(function(file){
        css += '<link rel="stylesheet" type="text/css" href="' + file + '">\n';
    });

    // create sizes css
    css += '<style>\n';

    options.sizes.forEach(function(size){
        css += '.p'+size+' { font-size: '+size+'px !important; } \n';
    });

    css += '</style>\n';

    // // console.log(template.match(stylesheets_tag));

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
        samples_markup = samples_markup.replace(size_tag,size);
    });

    sampler = sampler.replace(sample_tag,samples_markup);

    grunt.file.write(options.dest, sampler);
    grunt.file.write(options.sass, scss);

    grunt.log.writeln('File ' + chalk.green(options.sass) + ' created with '+ chalk.green(json_chars.ZapfTable.glyphInfo.length) +' icons.');
    grunt.log.writeln('File ' + chalk.green(options.dest) + ' created.');

    done();

  });

};
