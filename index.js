var net = require('net');
var fs = require('fs');

var server = net.createServer(function (c) {
  c.on('data', function (buffer) {
    var packetSize =  buffer.readIntLE(0, 4);
    var actualSize = buffer.length;
    // console.log('got data>', buffer.toString());
    console.log('size in packet', packetSize);
    console.log('size actual', actualSize);
    console.log('head:', buffer.slice(0, 4));
    c.write(new Buffer([0x11]));
    console.log('sent response');

    fs.writeFileSync('packet.bin', buffer);
  });
});

server.listen(20163, function () {
  console.log('server lisetning.');
});
