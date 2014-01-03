module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["./assets/css/"]
        },
        files: {
          "./assets/css/main.css"   : "./assets/css/less/_main.less",
          "./assets/css/mobile.css" : "./assets/css/less/_mobile.less",
          "./assets/css/web.css"    : "./assets/css/less/_web.less"
        }
      }
    },
    watch: {
      files: "./assets/css/less/*",
      tasks: ["less"]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
};