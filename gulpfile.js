const gulp = require("gulp");
const pug = require("gulp-pug");
const tailwindcss = require("tailwindcss");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const jsonData = require("./src/data.json");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();


// Initialize BrowserSync
gulp.task("browserSync", function () {
    browserSync.init({
      server: {
        baseDir: "./docs",
        index:"/index.html",
      }
    })
})    



// Testing function Message 
gulp.task("Message", function (done) {
    console.log("Gulp Running ....");
    done();
});

// Copy Pug
gulp.task("CopyPug", async function () {
    const prettier = (await import("gulp-prettier")).default;
    return gulp
        .src("src/pages/*")
        .pipe(pug({
            data: {
              works : jsonData.works,
              projects : jsonData.projects,
              features : jsonData.features,
              about : jsonData.about,
              process : jsonData.process,
              about_groupes : jsonData.about_groupes,
              benefits : jsonData.benefits,
              team : jsonData.team,
              features_groupes : jsonData.features_groupes,
              pricing : jsonData.pricing,
              info_accordion : jsonData.info_accordion,
              our_blog : jsonData.our_blog.home.blog
            }
            })
            )
        .pipe(prettier())
        .pipe(gulp.dest("docs"))
        .pipe(browserSync.stream());
});

// Copy Partials
gulp.task("CopyIncludes", () => {
    return gulp
        .src("src/includes/*")
        .pipe(pug())
        .pipe(gulp.dest("docs/includes"))
        .pipe(browserSync.stream());
});

// Copy Scss
gulp.task("Scss", function () {
    return gulp.src('src/assets/Scss/*.scss')
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([
            tailwindcss,
            autoprefixer({
                cascade: false,
            }),
        ]))
        .pipe(gulp.dest('docs/assets/css'))
        .pipe(browserSync.stream());
});

// CopyJs
gulp.task("Js", function () {
    return gulp
      .src("src/assets/js/*.js") // Chemin des fichiers JavaScript source
      .pipe(concat('script.js'))
      .pipe(babel({ presets: ["@babel/env"] }))
      .pipe(uglify()) // Minifier le fichier JavaScript
      .pipe(gulp.dest("docs/assets/js")) // Répertoire de destination pour le fichier minifié
      .pipe(browserSync.stream());
  });

gulp.task("watch", function (done) {
    gulp.series("browserSync")();
    gulp.watch("src/pages/*", gulp.series("CopyPug"));
    gulp.watch("src/includes/*", gulp.series("CopyIncludes"));
    gulp.watch("src/assets/Scss/*.scss", gulp.series("Scss"));
    gulp.watch("src/assets/js/*.js", gulp.series("Js"));
    done();
});

gulp.task(
    "default",
    gulp.series(
        "Message",
        "browserSync",
        "CopyPug",
        "CopyIncludes",
        "Scss",
        "Js"
    ),
    "watch"
);

