const multer  = require('multer')
const path = require('path')


const statusStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = '';

        if(req.baseUrl.includes('/status')){
            folder = './public/statusFiles/';
        } 
        else if(req.baseUrl.includes('/users')){
            folder = './public/profilePictures/';
        }
       cb(null, folder);
    },
    filename: function(req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ 
    storage: statusStorage,
    checkFileType: function(req, file, cb){
        const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
    
        if(mimetype && extname){
        return cb(null, true);
        } else {
        return cb(new Error('Only images and videos are allowed!'));
        }
    } 
});

module.exports = upload;
// module.exports = {
//     statusUpload: upload(statusStorage),
//     profilUpload: upload(profilStorage),
// }