import multer from "multer";
import FormData from "form-data";
import fetch from "node-fetch";

// Настраиваем multer для хранения файлов в памяти
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Отключаем встроенный bodyParser Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Обрабатываем входящие файлы с помощью multer
    await new Promise((resolve, reject) => {
      upload.array("files")(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    // Проверяем наличие файлов
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files provided" });
    }

    // Получаем query-параметры name и id
    const { name, id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Parameter 'id' is required" });
    }

    // Создаем FormData для пересылки на FastAPI
    const formData = new FormData();
    req.files.forEach((file) => {
      formData.append("files", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    });
    formData.append("id", id);
    formData.append("name", name || "");

    // Отправляем запрос на FastAPI сервер
    const fastApiResponse = await fetch("http://thedragonmm.com:8000/upload/", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    const result = await fastApiResponse.json();
    if (!fastApiResponse.ok) {
      throw new Error(result.error || "Failed to upload images to FastAPI");
    }

    // Возвращаем ответ от FastAPI клиенту
    res.status(200).json(result); // Возвращаем оригинальный ответ от FastAPI
  } catch (error) {
    console.error("Error in postimages handler:", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
