// Server used for Heroku

//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// history API generated paths rewriting
app.get('*', function(request, response, next) {
    response.sendFile(__dirname + '/dist/index.html');
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);