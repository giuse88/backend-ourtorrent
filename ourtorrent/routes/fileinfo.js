// file info
var torrentParser = require( '../lib/torrentParser.js'); 
Torrent = require("/Users/giuseppe/WebstormProjects/node-torrent/lib/torrent/torrent");
var port = 6881;
var endPort = port + 8;
 
function padId(id) {
    var newId = new Buffer(20);
    newId.write(id, 0, 'ascii');
    var start = id.length;
    for (var i = start; i < 20; i++) {
        newId[i] = Math.floor(Math.random() * 255);
    }
    return newId;
}



function handle_torrent(fileName, socket) {

  console.log("Test torrent.js class");
  var torrent = new Torrent(padId("PES"), port, ".", fileName, null);
  torrent.on(Torrent.READY, function() {torrent.start();});
  torrent.on(Torrent.PIECE_COMPLETE, function(piece) {
       var obj = {
                  'hash'   : piece.hash, 
                  'index'  : piece.index, 
                  'offset' : piece.offset, 
                  'length' : piece.length,
                  'data'   : piece.data
                }; 
       socket.emit('update', obj); 
       console.log("HASH   : "  + piece.hash);
       console.log("INDEX  : "  + piece.index);
       console.log("OFFSET : "  + piece.offset);
       console.log("LENGTH : "  + piece.length);
  }); 

};


exports.getFileInfo = function(req, res){
  var file_name = req.params.name || '';
  file_name = "uploads/" + file_name ; 
  console.log("Uploaded : " + file_name); 
  var torrentFile = torrentParser.parseFile(file_name);   
  var local_url = "/" + torrentFile.hash; 
  torrentFile.url = "http://localhost/" + torrentFile.hash; 

  var downloadChannel = io.of(local_url).on('connection', function (socket) {
    console.log("Client connected");  
    socket.on('ready', function(data) {
      console.log("Client ready to download : ", data.msg);  
      //socket.emit('update', {msg:'okay'});  
      handle_torrent(file_name, socket); 
    });
  });
   
  res.render('fileinfo', { torrent :torrentFile});
};
