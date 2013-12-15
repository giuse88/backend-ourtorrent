var fs = require('fs');

exports.upload = function(req, res){
  console.log(req.files); 
  fs.readFile(req.files.file.path, function (err, data) {
    var newPath = __dirname + "/../uploads/"+req.files.file.name;
    fs.writeFile(newPath, data, function (err) {
      if (err) throw err;
      res.redirect("back");
    }
    );
  });
};
