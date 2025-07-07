import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

export const SendMail = async (req, res, next) => {
  try {
    const { name, email, title, category, description } = req.body;
    console.log(name, email, title, category, description);

    const mailOption = {
      from: `"Blog Request" <${process.env.MAIL_ID}>`,
      to: process.env.MAIL_ID,
      subject: `New Blog Request from ${name}`,
      html: `
        <h3>New Blog Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
      `,
    };

    await transporter.sendMail(mailOption);

    res.status(200).json({
      success: true,
      message: "Mail sent successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send mail" });
  }
};
