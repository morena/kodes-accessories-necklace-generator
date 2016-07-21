// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jquery: 	   'lib/jquery-1.12.3.min',
        text: 		   'lib/text',
        domtoimage:  'lib/domtoimage',
        fileSaver:   'lib/fileSaver'
    },
    shim: {
    	bootstrap: ['jquery']
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['main', 'compose', 'jquery']);
