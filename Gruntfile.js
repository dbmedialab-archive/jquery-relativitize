module.exports = function(grunt) {

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['*.js']
		},
		uglify: {
			plugin: {
				options: {
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
					mangle: false,
					sourceMap: '<%= pkg.name %>.sourcemap.js'
				},
				files: {
					'<%= pkg.name %>.min.js': [
						'jquery-relativitize.js'
					]
				}
			}
		}
	});
	
	// Default task(s).
	grunt.registerTask('default', [
		'jshint',
		'uglify'
	]);
	
};
