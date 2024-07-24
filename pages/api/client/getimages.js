// здесь я получаю список изображений в директории для рендеринга их на странице модели
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  const { id } = req.query;
  const response = await fetch(`${process.env.STORAGE_URL}?id=${id}`);
  const files = await response.json();
  res.status(200).json({ results: files });
}
