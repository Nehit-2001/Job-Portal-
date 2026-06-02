import express from "express"
import authenticatedToken from "../middleware/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controller/application.controller.js";

const router = express.Router();

router.route("/apply/:id").post(authenticatedToken, applyJob);
router.route("/get").get(authenticatedToken, getAppliedJobs);
router.route("/:id/applicants").get(authenticatedToken, getApplicants);
router.route("/status/:id/update").post(authenticatedToken, updateStatus);

export default router;