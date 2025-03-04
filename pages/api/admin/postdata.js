// pages/api/admin/postdata.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }

  let dbconnection;

  try {
    dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      connectTimeout: 30000,
    });

    const { lastId, name, height, bust, waist, hip, shoes, eyes, hair, inst } =
      req.body;

    // Проверяем числовые поля
    const numericFields = { height, bust, waist, hip, shoes };
    for (const [field, value] of Object.entries(numericFields)) {
      if (value === "" || isNaN(Number(value))) {
        throw new Error(`Поле ${field} должно быть числом`);
      }
    }

    const query = `
      INSERT INTO \`models\`
      (\`id\`, \`name\`, \`height\`, \`bust\`, \`waist\`, \`hip\`, \`shoes\`, \`eyes\`, \`hair\`, \`inst\`)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      lastId + 1,
      name,
      Number(height), // Убеждаемся, что это число
      Number(bust),
      Number(waist),
      Number(hip),
      Number(shoes),
      eyes,
      hair,
      inst,
    ];

    await dbconnection.execute(query, values);

    res
      .status(200)
      .json({ status: "OKIS", message: "Данные успешно сохранены" });
  } catch (error) {
    console.error("Ошибка при сохранении данных:", error);
    res.status(500).json({
      status: "ERROR",
      message: "Ошибка сервера при сохранении данных",
      error: error.message,
    });
  } finally {
    if (dbconnection) {
      await dbconnection.end();
    }
  }
}
