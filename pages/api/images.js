// здесь я получаю список изображений в директории для рендеринга их на странице модели
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  const { id } = req.query;
  const response = await fetch(
    `http://files.erosloves.space/getimages.php?id=22`
  );
  const files = await response.json();
  res.status(200).json({ results: files });
  // const imgDir = path.join(process.cwd(), `public/models/${id}`);
  // const fileNames = fs.readdirSync(imgDir);
  // const files = fileNames.map((el) => {
  //   return `${process.env.SITE_DOMAIN}/models/${id}/` + el;
  // });
  // const files = `http://files.erosloves.space/models/`;
}
