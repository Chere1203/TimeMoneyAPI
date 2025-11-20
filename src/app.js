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

// --- Endpoints de salud para Azure ---
app.get("/", (req, res) => {
  res.status(200).send("API OK");
});

app.get("/health", (req, res) => {
  res.status(200).send("Healthy");
});

app.get("/home", (req, res) => {
  res.status(200).send("Home OK");
});

app.get("/hostingstart.html", (req, res) => {
  res.status(200).send("OK");
});
// --------------------------------------

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/prefs", prefsRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/goal", goalRoutes);
app.use("/api/wallet", walletRoutes);

// 🔚 IMPORTANTE: aquí **NO** hacemos app.listen
// Solo exportamos la app para que server.js la use

export default app;
