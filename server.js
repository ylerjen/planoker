// Server used for Heroku

//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// rewrite all non-static URLs back to index.html
app.configure(function() {
    app.use('/', express.static(__dirname + '/'));
});
// history API generated paths rewriting
app.get('*', function(request, response, next) {
    response.sendfile(__dirname + '/index.html');
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);