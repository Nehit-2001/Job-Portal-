import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routers/user.route.js";
import companyRoute from "./routers/company.route.js";
import jobRoute from "./routers/job.route.js";
import applicationRoute from "./routers/application.route.js";
import connectDB from "./utils/db.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({});
const app = express();

// Middleware only once
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
    origin: ["http://localhost:5173"],
    credentials: true,
}
app.use(cors(corsOption));

// Routes
app.use("/api/users", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);



// -------Deployment Code-------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // ✅ Serve frontend build in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("/{*splat}", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
//   });
// }

const PORT = process.env.PORT || 5001;



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running in port ${PORT}`);
});