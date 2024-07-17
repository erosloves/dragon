import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      await new Promise((resolve, reject) => {
        upload.array("files")(req, res, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
      const { id } = req.query;
      const files = req.files;
      const uploadDir = path.join("/var/www/files/models", `${id}`);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      await Promise.all(
        files.map(async (file) => {
          const { buffer, originalname } = file;
          const webpImage = await sharp(buffer)
            .toFormat("jpg", { quality: 80 })
            .toBuffer();

          const filePath = path.join(
            uploadDir,
            originalname.replace(/\.\w+$/, ".jpg")
          );
          await fs.promises.writeFile(filePath, webpImage);
        })
      );

      res
        .status(200)
        .json({ message: "Images uploaded and compressed successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
