/*global module:false*/
module.exports = function(grunt) {

	grunt.util.linefeed = "\n";

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON("package.json"),
		banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
			"<%= grunt.template.today('yyyy-mm-dd') %>\n" +
			"<%= pkg.homepage ? '* ' + pkg.homepage + '\\n' : '' %>" +
			"* Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author %>;" +
			" Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */\n",
		// Task configuration.
		concat: {
			options: {
				banner: "<%= banner %>",
				stripBanners: true
			},
			dist: {
				src: [
					"lib/<%= pkg.name %>.js",
					"js/**/*.js"
				],
				dest: "dist/<%= pkg.name %>.js"
			}
		},
		uglify: {
			options: {
				banner: "<%= banner %>"
			},
			dist: {
				src: "<%= concat.dist.dest %>",
				dest: "dist/<%= pkg.name %>.min.js"
			}
		},
		lineending: {
			dist: {
				options: {
					eol: "lf"
				},
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify-es");
	grunt.loadNpmTasks("grunt-lineending");

	// Default task.
	grunt.registerTask("default", ["concat", "uglify", "lineending"]);

};