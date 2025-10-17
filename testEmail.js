import nodemailer from "nodemailer";

async function testEmail() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // ایمیلی که App Password براش ساختی
      pass: process.env.EMAIL_PASS, // رمز ۱۶ رقمی
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // می‌تونی ایمیل خودت رو بزاری برای تست
      subject: "Test Email from Analytube ✅",
      text: "اگر این ایمیل رو می‌بینی، یعنی App Password درسته 🎉",
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
}

testEmail();
