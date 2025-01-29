import multer from "multer";
import path from "path";
import fs from 'fs'
import { Request } from "express";


const uploadDir = path.join(__dirname, 'uploads')

if (!fs.existsSync(uploadDir)) {

  fs.mkdirSync(uploadDir, { recursive: true })

}
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadDir)

  },

  filename: (req, file, cb) => {

    cb(null, Date.now() + '-' + file.originalname)
    
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); 
  } else {
    cb(new Error("Only image files are allowed!")); 
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
