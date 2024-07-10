import { handleLogout } from "@auth0/nextjs-auth0";

export default async function logut(req, res) {
  try {
    await handleLogout(req, res, {
      returnTo: req.query.returnTo || "/adminma",
    });
  } catch (e) {
    res.status(e.status || 400).end(error.message);
  }
}
