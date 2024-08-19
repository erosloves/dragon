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
      const file = req.files;
      const uploadDir = path.join(process.env.STORAGE_DIR, `${id}`);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const { buffer } = file;
      console.dir(typeof file);
      await new Promise(async () => {
        const webpImage = await sharp(buffer)
          .toFormat("jpg", { quality: 80 })
          .toBuffer();

        const filePath = path.join(uploadDir, "title.jpg");
        fs.promises.writeFile(filePath, webpImage);
      });
      //   const webpImage = await sharp(buffer)
      //     .toFormat("jpg", { quality: 80 })
      //     .toBuffer();

      //   const filePath = path.join(uploadDir, "title.jpg");
      //   fs.promises.writeFile(filePath, webpImage);

      res.status(200).json({
        message: `Pictures of ${id}'s success loaded. The model was created!`,
      });
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
