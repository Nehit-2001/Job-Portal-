import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//For new User Registration code
export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, roll } = req.body();
    if (!fullname || !email || !password || !phoneNumber || !roll) {
      return res.status(404).json({
        message: "Required field is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        message: "Email already exists",
        success: false,
      });
    }

    //Convert password into hashes
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      roll,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: `Account created successfully ${fullname}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error registration failed",
      success: false,
    });
  }
};

//Already exist User login code
export const login = async (req, res) => {
  try {
    const { email, password, roll } = req.body();
    if (!email || !password || !roll) {
      return res.status(404).json({
        message: "Required field is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    //Check If User role
    if (user.role !== role) {
      return res.status(403).json({
        message: "You don't have the necessary role to access this resource",
        success: false,
      });
    }

    //Token Generate
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.roll,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: strict,
      })
      .json({
        message: `Welcome Back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).jsson({
      message: "Server error login failed",
      success: false,
    });
  }
};

//logout User code
export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logot successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error logout failed",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body();
    const file = req.files;
    if (!fullname || !email || !bio || !phoneNumber || !skills) {
      return res.status(404).json({
        message: "Required field is missing",
        success: false,
      });
    }

    //Cloudinary upload

    const skillsArray = skills.split(",");
    const userId = req.id; //middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.bio = bio;
    user.skills = skillsArray;

    //resume
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.roll,
      profile: user.profile,
    };

    return res.status(200).json({
        message:"Profile Updated Successfully",
        user,
        success:true
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error Profile Update failed",
      success: false,
    });
  }
};
