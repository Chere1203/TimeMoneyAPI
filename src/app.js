import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

console.log("🔍 DEBUG: SUPABASE_DB_URL =", process.env.SUPABASE_DB_URL);


import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config.js";

import authRoutes from "./routes/auth.routes.js";
import prefsRoutes from "./routes/prefs.routes.js";
import expensesRoutes from "./routes/expenses.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import walletRoutes from "./routes/wallet.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/hostingstart.html", (req, res) => {
  res.send("OK");
});

app.get("/", (req, res) => {
  res.send("API TimeMoney funcionando ✔");
});




app.use(cors());
app.use(express.json());

// Documentación Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/prefs", prefsRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/goal", goalRoutes);
app.use("/api/wallet", walletRoutes);

// Ping básico
app.get("/", (req, res) => {
  res.json({ message: "Time is Money API", docs: "/api/docs" });
});

app.listen(PORT,"0.0.0.0", () => {
  console.log(`✅ API escuchando en http://localhost:${PORT}`);
  console.log(`📚 Swagger UI en http://localhost:${PORT}/api/docs`);
});
