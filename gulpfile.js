//- Gulp js
const gulp = require("gulp");
const pug = require("gulp-pug");
const tailwindcss = require("tailwindcss");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const jsonData = require("./src/data.json");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();
const sitemap = require('gulp-sitemap');
const fs = require('fs');
const path = require("path");

// Tâche pour recharger le navigateur
gulp.task("browserSync", function () {
    browserSync.init({
      server: {
        baseDir: "./docs",
        index: "/index.html",
      },
      port: 3000, // Le port sur lequel le serveur va écouter
      middleware: function (req, res, next) {
        // Chemin du fichier demandé
        const filePath = path.join(__dirname, "docs", req.url);
  
        // Vérifie si le fichier existe
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            // Le fichier n'existe pas, retourne la page d'erreur 404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            fs.createReadStream(path.join(__dirname, "docs", "404.html")).pipe(res);
          } else {
            // Le fichier existe, passe à la prochaine fonction middleware
            next();
          }
        });
      },
    });
  });

// Tâche pour générer le fichier robots.txt
gulp.task('Robots', (done) => {
    const content = `
      User-agent: *
      Disallow: /private/
      Allow: /public/
      
      Sitemap: http://localhost:3000/seo/sitemap.xml
    `;
    fs.writeFileSync('docs/seo/robots.txt', content);
    done();
});

// Tâche pour générer le sitemap XML
gulp.task('Sitemap', function () {
    return gulp.src('src/pages/**/*.pug', {
        read: false
    })
        .pipe(sitemap({
            siteUrl: 'http://localhost:3000'
        }))
        .pipe(gulp.dest('./docs/seo')); // Le sitemap sera généré dans le dossier docs/seo
});

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
                works: jsonData.works,
                projects: jsonData.projects,
                features: jsonData.features,
                about: jsonData.about,
                process: jsonData.process,
                about_groupes: jsonData.about_groupes,
                benefits: jsonData.benefits,
                team: jsonData.team,
                features_groupes: jsonData.features_groupes,
                pricing: jsonData.pricing,
                info_accordion: jsonData.info_accordion,
                our_blog: jsonData.our_blog.home.blog
            }
        }))
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
        .pipe(cleanCSS())
        .pipe(gulp.dest('docs/assets/css'))
        .pipe(browserSync.stream());
});

// CopyJs
gulp.task("Js", function () {
    return gulp.src('src/assets/js/*.js') // Chemin des fichiers JavaScript source
        .pipe(uglify()) // Minifier le fichier JavaScript
        .pipe(gulp.dest("docs/assets/js")) // Répertoire de destination pour le fichier minifié
        .pipe(browserSync.stream());
});

// Watch tasks
gulp.task("watch", function (done) {
    gulp.series("browserSync")();
    gulp.watch("src/pages/*", gulp.series("CopyPug", "Sitemap"));
    gulp.watch("src/includes/*", gulp.series("CopyIncludes"));
    gulp.watch("src/assets/Scss/*.scss", gulp.series("Scss"));
    gulp.watch("src/assets/js/*.js", gulp.series("Js"));
    gulp.watch('src/pages/**/*', gulp.series('Robots'));
    done();
});

// Default task
gulp.task(
    "default",
    gulp.series(
        "Message",
        "browserSync",
        "CopyPug",
        "CopyIncludes",
        "Scss",
        "Js",
        "Robots",
        "Sitemap",
        "watch"
    )
);
