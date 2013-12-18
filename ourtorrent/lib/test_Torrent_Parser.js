var torrentParser = require( './torrentParser.js'); 

var main = function(){
  console.log("Welcome to OURTorrent!!!"); 
  
  var torrentFile = torrentParser.parseFile(process.argv[2]);  

  if (!torrentFile)
    console.log("Error creating torrent Parser"); 

  console.log("Tracker        : " + torrentFile.tracker); 
  console.log("Comment        : " + torrentFile.comment); 
  console.log("File           : " + torrentFile.name); 
  console.log("Size           : " + torrentFile.size + " B"); 
  console.log("Piece Size     : " + torrentFile.pieceSize); 
  console.log("Piece Number   : " + torrentFile.pieceNumber); 
  console.log("Last Piece Size: " + torrentFile.sizeLastPiece); 
  console.log("Pieces : " ); 
  console.log(torrentFile.pieces);  
  
}

if (require.main === module) {
     main();
}
