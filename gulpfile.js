// Gulp + Helpers
var gulp =        require('gulp');
var clean =       require('gulp-clean');
var connect =     require('gulp-connect');
var copy =        require('gulp-copy');
var gutil =       require('gulp-util');
var livereload =  require('gulp-livereload');
var notify =      require('gulp-notify');
var plumber =     require('gulp-plumber');
var runSequence = require('run-sequence');
var source =      require('vinyl-source-stream');
var sourcemaps =  require('gulp-sourcemaps');
var stylus =      require('gulp-stylus');
var uglify =      require('gulp-uglify');

// Browserify + Helpers
var browserify = require('browserify');
var reactify =   require('reactify');
var babelify =   require('babelify');
var watchify =   require('watchify');

// Stylus Plugins
var jeet =       require('jeet');
var koutoswiss = require('kouto-swiss');
var rupture =    require('rupture');


// Project Vars
var path = {
    HTML: 'source/index.html',
    MINIFIED_OUT: 'bundle.min.js',
    OUT: 'bundle.js',
    DEST: 'build',
    DEST_BUILD: 'build/bundle',
    DEST_SRC: 'build',
    ENTRY_POINT: './source/js/App.js'
};



// Clean Build
gulp.task('clean', function() {
    return gulp.src('build', {read: false})
               .pipe(clean());
});


// Bundle and Watch Scripts
function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
    var props = {
        entries: ['source/js/' + file],
        debug : true,
        transform: [babelify, reactify]
    };

    // watchify() if watch requested, otherwise run browserify() once 
    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
        .on('error', handleErrors)
        .pipe(source(file))
        .pipe(gulp.dest('build/js/'));
    }

    // listen for an update and run rebundle
    bundler.on('update', function() {
        rebundle();
        gutil.log('Rebundle...');
    });

    // run it once the first time buildScript is called
    return rebundle();
}

gulp.task('scripts', function() {
    return buildScript('App.js', false);
});

gulp.task('compressScripts', function() {
    return gulp.src('build/js/App.js')
               .pipe(uglify())
               .pipe(gulp.dest('build/js'));
});


// Compile CSS
gulp.task('styles', function() {
    return gulp.src('source/styl/main.styl')
               .pipe(plumber({
                   errorHandler: function(error) {
                       console.log(error.message);
                       this.emit('end');
                   }
               }))
               .pipe(sourcemaps.init())
               .pipe(stylus({
                   'include css': true,
                   compress: true,
                   use: [
                       jeet(),
                       koutoswiss(),
                       rupture()
                   ]
               }))
               .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest('build/css'))
               .pipe(livereload());
});


// Copy HTML Files
gulp.task('copyFiles', function() {
    gulp.src('source/*.html')
        .pipe(gulp.dest('build'));

    gulp.src('source/data/*.json')
        .pipe(gulp.dest('build/data/'));

    gulp.src('source/img/**')
        .pipe(gulp.dest('build/img/'));

    gulp.src('source/fonts/**')
        .pipe(gulp.dest('build/fonts/'));

    gulp.src('source/_experiments/**')
        .pipe(gulp.dest('build/_experiments/'));
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
    gulp.watch([path.HTML, 'source/data/*.json', 'source/img/**'], ['copyFiles']);
    gulp.watch(['source/styl/*.styl', 'source/styl/**/*.styl'], ['styles']);
    gulp.watch('source/_experiments/**', ['copyFiles']);
});

// Default Task
gulp.task('default', ['scripts', 'styles', 'copyFiles', 'watch', 'connect'], function() {
    return buildScript('App.js', true);
});

// Build Task
gulp.task('build', function(callback) {
    runSequence(
        'clean',
        ['scripts', 'styles', 'copyFiles'],
        'compressScripts',
        callback
    );
});
