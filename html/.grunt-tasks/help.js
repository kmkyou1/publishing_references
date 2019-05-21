/*
 * list grunt tasks
 *
 */

module.exports = function(grunt) {

  grunt.registerTask('help', 'Grunt task 설명', function(){
    var help = '\nGrunt Task 정보\n\n' +
               'grunt' + ' (default)'.yellow + ' : grunt sass, watch\n' +
               'grunt' + ' dist'.yellow + ' : 작업 결과물 산출\n' +
               'grunt' + ' sass'.yellow + ' : SASS\n' +
               'grunt' + ' scss'.yellow + ' : SASS, autoprefixer, csscomb, cssmin\n' +
               'grunt' + ' csslint'.yellow + ' : CSS 오류검사\n' +
               'grunt' + ' imgmin'.yellow + ' : 이미지 minify\n' +
               'grunt' + ' watch'.yellow + ' : watch\n' +
               '\n\nGrunt 관련 정보\n\n' +
               '영문' + ' http://gruntjs.com/getting-started' + '\n' +
               '한글' + ' http://gruntjs-kr.herokuapp.com/getting-started'
    grunt.log.write(help);
  });

};