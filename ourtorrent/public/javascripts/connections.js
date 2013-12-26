// HELLO 
//

function connectToServer (url) {
  console.log("Connecting to " + url + "..."); 
  var socket = io.connect(url);
    socket.on('update', function (data) {
      console.log('Received new piece from the server'); 
      console.log("Index  : " + data.index);
      console.log("Hash   : " + data.hash); 
      console.log("Offset : " + data.offset); 
      //console.log("Data   : " + data.data); 
      $('li:contains("'+ data.hash +'")').css('background-color', 'green');
    });
    socket.emit('ready', {msg:'sample.torrent'});
}
