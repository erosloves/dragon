import { serialize } from "cookie";

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", "", {
      httpOnly: true,
      maxAge: -1,
      path: "/",
    })
  );

  return res.status(200).json({ message: "Выход выполнен" });
}
