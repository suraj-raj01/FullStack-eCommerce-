import UserModel from "../../models/auth/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


export const createUser = async (req, res) => {
    try {
        const { email, password, ...rest } = req.body;
        // console.log(req.body)
        // ✅ Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // ✅ Check existing user
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // ✅ Hash password (better salt rounds)
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create user
        const user = await UserModel.create({
            email,
            password: hashedPassword,
            ...rest,
        });

        // ✅ Remove password from response
        const userObj = user.toObject();
        delete userObj.password;

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: userObj,
        });

    } catch (error) {
        console.error("Error creating user:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
            .populate("roleId").sort({ updatedAt: -1 })

        res.status(200).json({
            data: users,
            message: "User data fetched successfully",
            status: 200,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
            status: 500,
        });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id).populate('roleId');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: user, message: "User fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}
export const searchUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.find({
            $or: [
                { email: { $regex: id, $options: "i" } },
                { name: { $regex: id, $options: "i" } }
            ]
        }).populate('roleId');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: user, message: "User fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        if (!id) {
            return res.status(400).json({ message: "User id is required" })
        }

        const existingUser = await UserModel.findById(id)

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        // ✅ correct update
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $set: data }, // ⭐ important
            { new: true, runValidators: true }
        )

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        })
    } catch (error) {
        console.error("Error updating user:", error)
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Fixed: Added token parameter and proper error handling
async function sendPasswordResetEmail(email, token) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <div style="margin: 30px 0; text-align: center;">
            <a href="https://e-commerce-mern-lovat-gamma.vercel.app/reset-password" 
               style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            This link will expire in 15 minutes for security reasons. 
          </p>
          <p style="color: #666; font-size: 14px;">
            If you didn't request this password reset, please ignore this email.
          </p>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw to handle in calling function
    }
}

export const verifyEmail = async (req, res) => {
    const { email } = req.body;
    console.log(email, "email")
    try {
        // Input validation
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(404).json({ message: "No account found with this email address" });
        }

        res.status(200).json({
            message: "Email verified successfully",
            exists: true
        });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({
            message: "Unable to verify email",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Input validation
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(404).json({ message: "No account found with this email address" });
        }

        // Fixed: Added JWT_SECRET and expiration time
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        // Generate a password reset token with expiration
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // Fixed: Pass token to email function
        await sendPasswordResetEmail(user.email, token);

        res.status(200).json({
            message: "Password reset email sent successfully",
            email: email
        });
    } catch (error) {
        console.error('Forgot password error:', error);

        // Handle specific errors
        if (error.message.includes('JWT_SECRET')) {
            res.status(500).json({ message: "Server configuration error" });
        } else if (error.message.includes('Error sending email')) {
            res.status(500).json({ message: "Failed to send reset email. Please try again." });
        } else {
            res.status(500).json({
                message: "Unable to process password reset request",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

// Additional function to handle password reset (you'll need this too)
export const resetPassword = async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;

    try {
        // Input validation
        if (!token || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        ;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.error('Reset password error:', error);

        if (error.name === 'JsonWebTokenError') {
            res.status(400).json({ message: "Invalid reset token" });
        } else if (error.name === 'TokenExpiredError') {
            res.status(400).json({ message: "Reset token has expired" });
        } else {
            res.status(500).json({ message: "Unable to reset password" });
        }
    }
};

export const updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        if (!email || !newPassword) {
            return res.status(400).json({ message: "Email and new password are required!" });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        // await user.save();
        await UserModel.updateOne({
            email: email
        }, {
            password: hashedPassword
        });
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({ message: "Unable to update password" });
    }
};


const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Both fields are required!" });
        }

        const isUser = await UserModel.findOne({ email }).populate("roleId");
        if (!isUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, isUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const payload = {
            id: isUser._id,
            email: isUser.email,
            role: isUser.roleId.role,
        };

        // Generate JWT token
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).json({
            message: "User login successful!",
            token,
            user: isUser,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
