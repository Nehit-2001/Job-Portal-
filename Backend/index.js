import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routers/user.route.js";
import companyRoute from "./routers/company.route.js";
import jobRoute from "./routers/job.route.js";
import applicationRoute from "./routers/application.route.js"
import connectDB from "./utils/db.js";
dotenv.config({});
const app = express();
app.use(express.json())
app.use(cookieParser());

const corsOption = {
    origin: ["http://localhost:5173"],
    credentials: true,
}

app.use(cors(corsOption));

//get API
// app.get("/", (req, res)=>{
//     return res.status(200).json({
//         message:"Welcome to the API",
//         timesamp: new Date().toISOString(),
//         success: true,
//     });
// });

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



const PORT = process.env.PORT || 5001;

//api's calling
app.use("/api/users", userRoute);
//API calling like this
// "http://localhost:5011/api/user/register"
// "http://localhost:5011/api/user/login"
// "http://localhost:5011/api/user/profile/update"

//Compani API calling
//Company routes
app.use("/api/company", companyRoute);

//Jobs API
app.use("/api/job", jobRoute);

//Apllication API
app.use("/api/application", applicationRoute);
app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running in port ${PORT}`);
});
