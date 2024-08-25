import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const storage = multer.memoryStorage(); // Хранение файла в памяти
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Отключаем стандартный bodyParser, чтобы multer мог работать с формами
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Обработка загрузки файлов с помощью multer
      await new Promise((resolve, reject) => {
        upload.single("file")(req, res, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });

      const { id } = req.query;
      const file = req.file; // Используйте req.file для одиночного файла

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { buffer } = file; // Получаем buffer файла
      const uploadDir = path.join(process.env.STORAGE_DIR, `${id}`);

      // Создание директории, если ее нет
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Обработка изображения с помощью sharp
      const webpImage = await sharp(buffer)
        .toFormat("jpg", { quality: 80 })
        .toBuffer();

      // Сохранение файла
      const filePath = path.join(uploadDir, "title.jpg");
      await fs.promises.writeFile(filePath, webpImage);

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
