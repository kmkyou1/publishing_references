/*
 * force grunt tasks
 * https://github.com/gruntjs/grunt/issues/810#issuecomment-27363230
 */

module.exports = function(grunt) {

  var previous_force_state = grunt.option("force");

  grunt.registerTask('force', 'run task with --force', function(set){
    if (set === "on"){
      grunt.option("force", true);
    }else if (set === "off"){
      grunt.option("force", false);
    }else if (set === "restore"){
      grunt.option("force", previous_force_state);
    };
  });

};