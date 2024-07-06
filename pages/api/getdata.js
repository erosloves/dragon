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
  const computeQueryType = (key) => {
    switch (key) {
      case "selectAll":
        return "SELECT * from naruto_characters";
      case "selectById":
        return "SELECT * from naruto_characters WHERE id = ?";
      case "lastId":
        return "SELECT MAX(id) as lastId from naruto_characters";
      default:
        break;
    }
  };
  try {
    const { type, id } = req.query;

    const query = computeQueryType(type);
    const values = [id | undefined];
    const [results] = await dbconnection.execute(query, values);
    res.status(200).json({ results: results });
    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
