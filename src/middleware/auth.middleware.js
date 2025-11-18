import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config.js";

export function authRequired(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "Token requerido" });

  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token)
    return res.status(401).json({ error: "Formato de autorización inválido" });

  try {
    const payload = jwt.verify(token, jwtConfig.secret);
    req.user = { id: payload.sub };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}
