const gulp = require("gulp");
const gutil = require("gulp-util");
const babel = require("gulp-babel");
const rollup = require("rollup");
const rollupTypescript = require("rollup-plugin-typescript");
const uglify = require("gulp-uglify");
const moduleName = "LaunchDSPAd";

gulp.task("build", function () {
  return rollup
    .rollup({
      input: "./src/App.ts",
      plugins: [rollupTypescript(), babel()]
    })
    .then(function (bundle) {
      bundle.write({
        format: "iife",
        moduleName: moduleName,
        dest: `./dist/${moduleName}.js`,
        sourceMap: true
      });
    });
});

// babel es6 -> es5
gulp.task("babel", ["build"], function () {
  return gulp
    .src(`./dist/${moduleName}.js`)
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .on("error", function (err) {
      gutil.log(gutil.colors.red("[Error]"), err.toString());
    })
    .pipe(gulp.dest("./dist"));
});

// 编译并压缩js
gulp.task("convertJS", ["babel"], function () {
  return gulp
    .src(`./dist/${moduleName}.js`)
    // .pipe(
    //   uglify({
    //     mangle: {
    //       reserved: [moduleName, "require", "exports", "module", "$"]
    //     } //排除混淆关键字
    //   })
    // )
    .on("error", function (err) {
      gutil.log(gutil.colors.red("[Error]"), err.toString());
    })
    .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["convertJS"]);