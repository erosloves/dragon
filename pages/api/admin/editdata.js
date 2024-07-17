import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  const computeAction = (action) => {
    switch (action) {
      case "params":
        return `select * from models where id = ?`;
      case "avatar":
        return "";
      case "remove":
        return `delete from models where id = ?`;
    }
  };

  try {
    const { id, action } = req.query;
    const query = computeAction(action);
    const values = [id | undefined];
    const [result] = await dbconnection.execute(query, values);
    res.status(200).json({ results: result });

    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
