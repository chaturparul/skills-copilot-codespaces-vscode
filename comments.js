// Create web server
var http = require('http');
var fs = require('fs');

// Load the comments from the file
var comments = JSON.parse(fs.readFileSync('comments.json'));

// Function to handle POST requests
function handlePost(request, response) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    var newComment = JSON.parse(data);
    comments.push(newComment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    response.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
    response.end();
  });
}

// Function to handle GET requests
function handleGet(request, response) {
  response.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
  response.end(JSON.stringify(comments));
}

// Create the server
http.createServer(function(request, response) {
  switch(request.method) {
    case 'POST':
      handlePost(request, response);
      break;
    case 'GET':
      handleGet(request, response);
      break;
    default:
      response.writeHead(501, 'Not Implemented', {'Content-Type': 'text/plain'});
      response.end();
  }
}).listen(8080);

console.log('Server running on port 8080');