import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.query;
    const dirPath = path.join(process.cwd(), `/public/models`, id);
    if (() => !fs.stat(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    cb(null, `public/models/${id}`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("files", 20);

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        res.status(500).json({ error: `Something went wrong: ${err.message}` });
        return reject(err);
      }

      res.status(200).json("success");

      return resolve();
    });
  });
}
