// здесь я получаю список изображений в директории для рендеринга их на странице модели
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export default function handler(req, res) {
  const { id } = req.query;
  const imgDir = path.join(process.cwd(), `public/models/${id}`);
  const fileNames = fs.readdirSync(imgDir);
  const files = fileNames.map((el) => {
    return `${process.env.SITE_DOMAIN}/models/${id}/` + el;
  });

  res.status(200).json({ results: files });
}
