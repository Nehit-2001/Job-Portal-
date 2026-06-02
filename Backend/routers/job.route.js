import express from "express";
import authenticatedToken from "../middleware/isAuthenticated.js";
import {
  getAdminJob,
  getAllJobs,
  getJobById,
  jobPost,
} from "../controller/job.controller.js";

const router = express.Router();

router.route("/post").post(authenticatedToken, jobPost);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(authenticatedToken, getAdminJob);
router.route("/get/:id").get(getJobById);

export default router;
