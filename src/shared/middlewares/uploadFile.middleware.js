//External modules
import multer from 'multer'
//Internal modules

const storage = multer.diskStorage({
    
    destination: function (req, file, cb){
        if(!file) {
            return cb(new Error("Error in file upload "), false)
        }else{
            cb(null, "./public/idealbilar/assets")
        }
    },
    filename: function (req, file, cb){
        const cleanName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
        cb(null, cleanName)
    }
})


//export

export const upload = multer({
    storage,
})