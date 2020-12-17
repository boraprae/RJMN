//import
const multer = require("multer");

const options = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, "public/imgupload/");
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname);
    }
    
});

const upload = multer({storage: options}).single("proImgFile");

module.exports = upload;