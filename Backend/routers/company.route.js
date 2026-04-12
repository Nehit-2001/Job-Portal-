import express from "express"

import authenticatedToken from "../middleware/isAuthenticated.js";
import { getAllComapanies, getcompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";

const router = express.Router();

router.route("/get").get(authenticatedToken, getAllComapanies);
router.route("/register").post(authenticatedToken, registerCompany);
router.route("/get/:id").get(authenticatedToken, getcompanyById);
router.route("/update/:id").put(authenticatedToken, updateCompany);

export default router;