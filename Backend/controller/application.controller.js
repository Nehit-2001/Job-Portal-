import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Invalid Job Id",
        success: false,
      });
    }

    //check if Apllicant already applied in this job or not
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    // console.log("Existing Application:", existingApplication);
    // const existingApplication = await Application.findOne({job:jobId, applicant:userId});
    if (existingApplication) {
      return res
        .status(400)
        .json({
          message: "You have already applied for this job",
          success: false,
        });
    }

    //check if job exists or not
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: "Job not found", success: false });
    }

    //create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.application.push(newApplication._id);
    await job.save({ validateBeforeSave: false });

    return res
      .status(201)
      .json({ message: "Application Submitted", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//Already applied jobs
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!applications) {
      res
        .status(404)
        .json({ message: "Application Not Found", success: false });
    }

    res.status(200).json({ applications, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

//Get all the applicants
export const getApplicants = async (req, res) => {
  console.log("Job ID:", req.params.id);
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "Server Error", success: false });
  }
};

//Update Job Status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Invalid Status", success: false });
    }

    //Find the application by applicant id
    const application = await Application.findById({ _id: applicationId });
    if (!application) {
      return res
        .status(404)
        .json({ message: "Apllication not found", success: false });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();

    return res
      .status(200)
      .json({ message: "Application status updated", success: true });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "Server Error", success: false });
  }
};
