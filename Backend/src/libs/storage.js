const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/img')
    },
    filename: function (req, file, cb) {
      var filename = Date.now();
      switch (file.mimetype) {
        case "image/png":
        filename = filename + ".png";
      break;
        case "image/jpeg":
        filename = filename + ".jpeg";
      break;
       default:
      break;
      }
      cb(null,filename);
    }
  })
   
  const upload = multer({ storage: storage })
  module.exports = upload;
