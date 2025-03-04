import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getConnection } from "../../../lib/db";

const SECRET_KEY = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method != "POST") {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }

  const { username, password } = req.body;

  let connection;

  try {
    // Подключаемся к базе данных
    connection = await getConnection();

    // Ищем пользователя по имени
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // Проверяем пароль
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Создаём JWT токен
    const token = jwt.sign(
      {
        username: user.username,
        id: user.id,
        iat: Math.floor(Date.now() / 1000),
      },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Устанавливаем cookie
    res.setHeader(
      "Set-Cookie",
      serialize("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 часа
        path: "/",
        sameSite: "strict",
      })
    );

    return res
      .status(200)
      .json({ message: "Successful login!", user: user.username });
  } catch (error) {
    console.error("Ошибка:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  } finally {
    if (connection) await connection.end(); // Закрываем соединение
  }
}
//
