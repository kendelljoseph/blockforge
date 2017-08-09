// Task Runner
// -----------
module.exports = (grunt) => {
  grunt.initConfig({
    pkg: `<json:package.json>`,
    watch: {
      "default": {
        options: {
          spawn    : false,
          interrupt: true
        },
        files: [
          `${process.cwd()}/demos/artprize/stylesheets/*.scss`
        ],
        tasks: [`sass`]
      }
    },
    sass: {
      dist: {
        files: [
          {
            expand: true,
            cwd   : `${process.cwd()}/demos/artprize/stylesheets`,
            src   : [`*.scss`],
            dest  : `${process.cwd()}/demos/artprize/stylesheets`,
            ext   : `.css`
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks(`grunt-contrib-watch`);
  grunt.loadNpmTasks(`grunt-contrib-sass`);
  return grunt.registerTask(`default`, [`sass`,`watch`]);
};