// file info
var torrentParser = require( '../lib/torrentParser.js'); 

exports.getFileInfo = function(req, res){
  var file_name = req.params.name || '';
  file_name = "uploads/" + file_name ; 
  console.log("Uploaded : " + file_name); 
  var torrentFile = torrentParser.parseFile(file_name); 
  res.render('fileinfo', { torrent :torrentFile});
};
