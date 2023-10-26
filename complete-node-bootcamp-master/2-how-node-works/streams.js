const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //   // Solution 1 - Will not work at scale as it will have the server load the entire file every time this request is made
  //   fs.readFile('test-file.txt', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //   // Solution 2 - Using Streams, however may have issue with backpressure
  //   const readable = fs.createReadStream('test-file.txt');
  //   readable.on('data', (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on('end', () => {
  //     res.end();
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not found!');
  //   });

  // Solution 3 - Using pipe. Simple but may have to default to Solution 1 or 2 for more customizable solutions
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  // readableSource.pipe(writableDestination)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
