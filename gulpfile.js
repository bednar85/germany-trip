// Gulp + Helpers
var gulp = require('gulp');
var connect = require('gulp-connect');
var htmlreplace = require('gulp-html-replace');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

// Browserify + Helpers
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

// Project Vars
var path = {
    HTML: 'src/index.html',
    MINIFIED_OUT: 'bundle.min.js',
    OUT: 'bundle.js',
    DEST: 'dist',
    DEST_BUILD: 'dist/bundle',
    DEST_SRC: 'dist',
    ENTRY_POINT: './src/js/App.js'
};




// Copy HTML Files
gulp.task('copy', function(){
  gulp.src(path.HTML)
      .pipe(gulp.dest(path.DEST))
      .pipe(livereload());
});

// Bundle JS Files and Minify
gulp.task('build', function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
    })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

// Copy HTML Files and Update JS Path
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
      .pipe(htmlreplace({
          'js': 'bundle/' + path.MINIFIED_OUT
      }))
      .pipe(gulp.dest(path.DEST));
});

// Start Server
gulp.task('connect', function() {
    connect.server({
        root: path.DEST,
        port: 3000,
        livereload: true
    });
});

// Watch HTML and JS Files
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(path.HTML, ['copy']);

    var watcher = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function () {
                  watcher.bundle()
                      .pipe(source(path.OUT))
                      .pipe(jshint())
                      .pipe(jshint.reporter('default'))
                      .pipe(gulp.dest(path.DEST_SRC));
                  })
                  .bundle()
                  .pipe(source(path.OUT))
                  .pipe(jshint())
                  .pipe(jshint.reporter('default'))
                  .pipe(gulp.dest(path.DEST_SRC))
                  .pipe(livereload());
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['connect', 'watch']);

// // Default Modules
// var browserify =  require('browserify'),
//     buffer =      require('vinyl-buffer'),
//     gulp =        require('gulp'),
//     path =        require('path'),
//     runSequence = require('run-sequence'),
//     source =      require('vinyl-source-stream');

// // Gulp Plugins
// var clean =       require('gulp-clean'),
//     compass =     require('gulp-compass'),
//     concat =      require('gulp-concat'),
//     connect =     require('gulp-connect'),
//     copy =        require('gulp-copy'),
//     data =        require('gulp-data'),
//     handlebars =  require('gulp-compile-handlebars'),
//     jshint =      require('gulp-jshint'),
//     livereload =  require('gulp-livereload'),
//     plumber =     require('gulp-plumber'),
//     rename =      require('gulp-rename'),
//     sourcemaps =  require('gulp-sourcemaps'),
//     stylus =      require('gulp-stylus'),
//     uglify =      require('gulp-uglify'),
//     gutil =       require('gulp-util');

// // Stylus Plugins
// var jeet =        require('jeet'),
//     koutoswiss =  require('kouto-swiss'),
//     rupture =     require('rupture');



// // Clean Preview
// gulp.task('clean', function() {
//     return gulp.src('preview', {read: false})
//                .pipe(clean());
// });

// // Lint JS
// gulp.task('lint', function() {
//     return gulp.src('source/js/*.js')
//                .pipe(jshint())
//                .pipe(jshint.reporter('default'));
// });

// // Compile CSS
// gulp.task('stylus', function() {
//     return gulp.src('source/styl/main.styl')
//     // return gulp.src(['source/styl/*.styl', 'source/styl/**/*.styl'])
//                .pipe(plumber({
//                    errorHandler: function(error) {
//                        console.log(error.message);
//                        this.emit('end');
//                    }
//                }))
//                .pipe(sourcemaps.init()) // only for dev
//                .pipe(stylus({
//                    'include css': true,
//                    // compress: true, // only for build
//                    use: [
//                        jeet(),
//                        koutoswiss(),
//                        rupture()
//                    ]
//                }))
//                .pipe(sourcemaps.write('')) // only for dev
//                .pipe(gulp.dest('preview/css'))
//                .pipe(livereload());
// });

// // Copy Libs Folder
// gulp.task('scripts', function() {
//     options = {
//         prefix: 1
//     }

//     return gulp.src('source/js/**')
//                .pipe(copy('preview', options))
//                .pipe(livereload());
// });

// // Bundle Up Remaining Scripts with Browserify
// gulp.task('browserify', function() {
//     return browserify('source/js/main.js')
//         .bundle()
//         //Pass desired output filename to vinyl-source-stream
//         .pipe(source('main.js'))
//         // Start piping stream to tasks!
//         .pipe(gulp.dest('preview/js/'));
// });



// // Copy HTML Files
// gulp.task('compile', function() {
//     var templateData = {},
//         options = {
//             batch: ['source/partials'],
//             helpers : {
//                 xIf : function(lvalue, operator, rvalue, options) {
//                     var operators, result;

//                     if (arguments.length < 3) {
//                         throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
//                     }

//                     if (options === undefined) {
//                         options = rvalue;
//                         rvalue = operator;
//                         operator = "===";
//                     }

//                     operators = {
//                         '==': function (l, r) { return l == r; },
//                         '===': function (l, r) { return l === r; },
//                         '!=': function (l, r) { return l != r; },
//                         '!==': function (l, r) { return l !== r; },
//                         '<': function (l, r) { return l < r; },
//                         '>': function (l, r) { return l > r; },
//                         '<=': function (l, r) { return l <= r; },
//                         '>=': function (l, r) { return l >= r; },
//                         'typeof': function (l, r) { return typeof l == r; }
//                     };

//                     if (!operators[operator]) {
//                         throw new Error("'xIf' doesn't know the operator " + operator);
//                     }

//                     result = operators[operator](lvalue, rvalue);

//                     if (result) {
//                         return options.fn(this);
//                     } else {
//                         return options.inverse(this);
//                     }
//                 }
//             }
//         }

//     return gulp.src('source/templates/*.hbs')
//                .pipe(plumber({
//                    errorHandler: function(error) {
//                        console.log(error.message);
//                        this.emit('end');
//                    }
//                }))
//                .pipe(data(function(file) {
//                    return require('./source/data/' + path.basename(file.path, '.hbs') + '.json');
//                }))
//                .pipe(handlebars(templateData, options))
//                .pipe(rename(function(path) {
//                    path.extname = '.html';
//                }))
//                .pipe(gulp.dest('preview'))
//                .pipe(livereload());
// });

// // Copy Fonts
// gulp.task('fonts', function() {
//     options = {
//         prefix: 1
//     }

//     return gulp.src('source/fonts/*')
//                .pipe(copy('preview', options));
// });

// // Copy Data
// gulp.task('data', function() {
//     options = {
//         prefix: 1
//     }

//     return gulp.src('source/data/**')
//                .pipe(copy('preview', options));
// });

// // Copy Images
// gulp.task('images', function() {
//     options = {
//         prefix: 1
//     }

//     return gulp.src('source/img/**')
//                .pipe(copy('preview', options));
// });

// // Start Server
// gulp.task('connect', function() {
//     connect.server({
//         root: 'preview',
//         port: 3000,
//         livereload: true
//     });
// });

// // Copy Preview Folder
// gulp.task('render', function() {
//     options = {
//         prefix: 1
//     }

//     return gulp.src('preview/**')
//                .pipe(copy('build', options));
// });

// // Watch Files For Changes
// gulp.task('watch', function() {
//     livereload.listen();
//     // gulp.watch('source/js/*.js', ['lint', 'browserify']);
//     gulp.watch(['source/js/*.js', 'source/js/**/*.js'], ['lint', 'scripts']);
//     gulp.watch(['source/styl/*.styl', 'source/styl/**/*.styl'], ['stylus']);
//     gulp.watch('source/**/*.hbs', ['compile', 'data']);
// });

// // Default Task
// gulp.task('default', function(callback) {
//     runSequence('clean',
//                ['lint', 'stylus', 'scripts', 'browserify', 'compile', 'data', 'fonts', 'images'],
//                 'watch', 'connect',
//                  callback);
// });

// // Build Task
// gulp.task('build', function(callback) {
//     runSequence('clean',
//                ['lint', 'stylus', 'scripts', 'browserify', 'compile', 'data', 'fonts', 'images'],
//                 'render',
//                  callback);
// });
