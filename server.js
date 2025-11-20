import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ API escuchando en http://0.0.0.0:${PORT}`);
  console.log(`📚 Swagger UI en http://0.0.0.0:${PORT}/api/docs`);
});
