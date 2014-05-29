# grunt-font-sampler

> Generates an html document with icon font character samples at specified pixel sizes for easy visualization.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-font-sampler --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-font-sampler');
```

## The "font_sampler" task

### Overview
In your project's Gruntfile, add a section named `font_sampler` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  font_sampler: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});

```

fontname: 'Ink-Icons',
charmap: 'glyphs.json',
dest: 'dist/sample.html',
sizes: [16,18,20,22,24,26,28,30,32,34,36,38,40],
stylesheets: ["http://cdn.ink.sapo.pt/3.0.2/css/ink.min.css","css/ink-icons.css"],
col_width: 100,
sample_template: '<div class="all-{% width %} p{% size %}">\n<p>{% size %}px</p>{% glyph %}</div>\n',
glyph_template: '<span class="ii ii-{% glyph %}"></span>\n'


### Options

#### options.fontname
Type: `String`
Default value: `'My Font'`

The font sample name.

#### options.charmap
Type: `Json File`
Default value: `'glyphs.json'`

Json file containing the glyphs array of css classes that match the required characters to be sampled. See glyphs.json file for more detail.

#### options.dest
Type: `String`
Default value: `'dist/sample.html'`

The sample file name.

#### options.sizes
Type: `Array`
Default value: `[16,18,20,22,24,26,28,30,32,34,36,38,40]`

An array of pixel font sizes to be sampled.

#### options.stylesheets
Type: `Array`
Default value: `["http://cdn.ink.sapo.pt/3.0.2/css/ink.min.css"]`

Stylesheets to be link on the sample file.

#### options.col_width
Type: `Integer`
Default value: `100`

The sample layout column with. Eg. 50 will produce a two column layout.

#### options.sample_template
Type: `String`
Default value: `'<div class="all-{% width %} p{% size %}">\n<p>{% size %}px</p>{% glyph %}</div>\n'`

HTML snippet that will will contain the samples for each size. Must have the {% width %}, {% size %} and {% glyph %} tags.

#### options.glyph_templace
Type: `String`
Default value: `'<span class="ii ii-{% glyph %}"></span>\n'`

HTML snippet that will will contain the sampled character. Must have the {% glyph %} tag.

### Usage Examples

```js
grunt.initConfig({
  font_sampler: {
    my_sample: {
        fontname: 'My Icon Font',
        charmap: 'glyphs.json',
        dest: 'dist/sample.html',
        sizes: [16,18,20,22,24,26,28,30,32,34,36,38,40],
        stylesheets: ["http://cdn.ink.sapo.pt/3.0.2/css/ink.min.css","css/my-icon-font.css"],
        col_width: 100,
        sample_template: '<div class="all-{% width %} p{% size %}">\n<p>{% size %}px</p>{% glyph %}</div>\n',
        glyph_template: '<span class="ii ii-{% glyph %}"></span>\n'
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
