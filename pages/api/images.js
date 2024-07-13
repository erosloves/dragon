// здесь я получаю список изображений в директории для рендеринга их на странице модели
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { id } = req.query;
  const imgDir = path.join(process.cwd(), `public/models/${id}`);
  const fileNames = fs.readdirSync(imgDir);
  const files = fileNames.map((el) => {
    return `http://localhost:3000/models/${id}/` + el;
  });

  res.status(200).json({ results: files });
}
