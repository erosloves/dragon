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

  const body = JSON.parse(req.body);
  const { name, height, bust, waist, hip, shoes, eyes, hair } = body;

  try {
    const query = `INSERT INTO \`models\`
      ( \`name\`, \`height\`, \`bust\`, \`waist\`, \`hip\`, \`shoes\`, \`eyes\`, \`hair\`)
      VALUES ( \'${name}\', ${height}, ${bust}, ${waist}, ${hip}, ${shoes}, \'${eyes}\', \'${hair}\');`;
    await dbconnection.execute(query);
    dbconnection.end();
    console.log("ADDED");
  } catch (e) {
    console.log(e);
  }
  res.status(200).json({ status: "OKIS" });
}
