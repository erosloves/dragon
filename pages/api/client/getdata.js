// pages/api/client/getdata.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }

  let dbconnection;

  const computeQueryType = (key) => {
    switch (key) {
      case "selectAll":
        return "SELECT * FROM models";
      case "selectById":
        return "SELECT * FROM models WHERE id = ?";
      case "lastId":
        return "SELECT MAX(id) AS lastId FROM models";
      case "nameById":
        return "SELECT id AS id FROM models WHERE name = ?";
      default:
        throw new Error("Неверный тип запроса");
    }
  };

  try {
    // Создаём подключение с увеличенным тайм-аутом
    dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      connectTimeout: 30000, // 30 секунд на подключение
    });

    const { type, id } = req.query;

    if (!type) {
      throw new Error('Параметр "type" обязателен');
    }

    const query = computeQueryType(type);
    let values = [];

    // Устанавливаем параметры только для запросов, где они нужны
    if (type === "selectById" || type === "nameById") {
      if (!id) {
        throw new Error('Параметр "id" обязателен для этого типа запроса');
      }
      values = [id];
    }

    const [results] = await dbconnection.execute(query, values);

    // Для lastId возвращаем 0, если таблица пуста
    if (type === "lastId") {
      const lastId = results[0].lastId || 0;
      return res.status(200).json({ results: [{ lastId }] });
    }

    res.status(200).json({ results });
  } catch (error) {
    console.error("Ошибка в /api/client/getdata:", error);
    res.status(500).json({
      message: "Ошибка сервера при получении данных",
      error: error.message,
    });
  } finally {
    if (dbconnection) {
      await dbconnection.end();
    }
  }
}
