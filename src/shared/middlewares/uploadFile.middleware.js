//External modules
import fs from "fs";
import path from "path";
import multer from "multer";

const uploadDir = path.resolve("public", "uploads", "licenses");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (_req, _file, cb){
        cb(null, uploadDir);
    },
    filename: function (_req, file, cb){
        const extension = path.extname(file.originalname);
        const cleanBaseName = path
          .basename(file.originalname, extension)
          .replace(/[^a-zA-Z0-9-_]/g, "-")
          .toLowerCase();

        cb(null, `${Date.now()}-${cleanBaseName}${extension}`);
    }
})

const fileFilter = (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
        return;
    }

    cb(new Error("Only image uploads are allowed"));
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
})
