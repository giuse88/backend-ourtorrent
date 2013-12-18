var fs=require('fs'); 
var bencode = require('bencode');

module.exports =  {

  parseFile : function (torrentFile) {

  if (!torrentFile){
      return null; 
  }
  
  //COSTANT
  var SLICE_SIZE = 20;

  //PRIVATE  
  var context = this; 
  var decodedData = bencode.decode(fs.readFileSync(torrentFile));

  var get_torrent_piece = function (pieces) {
    var pieces_array = new Array(); 
 
    for (var i=0; i < pieces.length/SLICE_SIZE; i++)
      pieces_array[i] = pieces.toString('hex', i*SLICE_SIZE, (i+1)*SLICE_SIZE);
  
    return pieces_array;  
  }
  
  // PUBLIC  
  this.size = decodedData.info.length;
  this.name = decodedData.info.name.toString();
  this.comment = decodedData.comment.toString(); 
  this.announce = decodedData.announce.toString(); 
  this.pieceSize =  decodedData.info['piece length']; 
  this.pieceNumber = this.size / this.pieceSize;  
  this.sizeLastPiece = this.size % this.pieceSize;
  this.pieces = get_torrent_piece(decodedData.info.pieces);
  this.tracker = decodedData.announce.toString();
  this.error = null; 

  return this;
  } 

};
