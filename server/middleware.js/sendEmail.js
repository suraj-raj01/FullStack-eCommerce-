import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail({ to, subject, html }) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

async function verifyEmail(email, role) {
    if (!email || !role) {
      return { success: false, error: "Missing required fields" };
    }
  
    let user = null;
  
    if (role === "Vendor") {
      user = await prisma.vendor.findFirst({ where: { email } });
    } else if (role === "Admin") {
      user = await prisma.admin.findFirst({ where: { email } });
    } else {
      return { success: false, error: "Invalid role" };
    }
  
    if (!user) {
      return { success: false, error: "User not found" };
    }
  
    return { success: true, user };
  }

module.exports = { sendEmail, verifyEmail };