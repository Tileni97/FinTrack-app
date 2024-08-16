import express from "express";
import cors from "cors";  // Add this line
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import financialRecordRoutes from "./routes/financialRecordRoutes.js";

const app = express();

// Add CORS middleware
app.use(cors());  // Add this line

app.use(express.json());

// Routes
app.use("/api/financialRecords", financialRecordRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Error handling middleware should be after routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = ENV_VARS.PORT;

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});