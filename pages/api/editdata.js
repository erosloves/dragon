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

  const { id, action } = req.query;

  const computeAction = (action) => {
    switch (action) {
      case "params":
        return `select * from models where id = ${id}`;
      case "avatar":
        return "";
      case "remove":
        return `delete from models where id = ${id}`;
    }
  };

  try {
    const query = computeAction(action);

    const [q] = await dbconnection.execute(query);
    res.status(200).json({ status: `removed` });
    dbconnection.end();
  } catch (e) {
    console.log(e);
  }
}
