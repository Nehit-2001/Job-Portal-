import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName, description } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company Name is required",
        success: false,
      });
    }
    if (!description) {
      return res.status(400).json({
        message: "Description is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company name already exists",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      description,
      userId: req.id,
    });
    return res.status(200).json({
      message: "Company created successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllComapanies = async (req, res) => {
  try {
    const userId = req.id; // Used for loggedin user
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "No comapanies found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

//get company by id
export const getcompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

//update company details
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location, logo } = req.body;
    const file = req.file;

    //cloudinary
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(400).json({
        message: "Company Not Found",
      });
    }
    return res.status(200).json({
      message: "Compnay Details Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};
