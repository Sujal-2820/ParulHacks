const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config/config-jwt");
const User = require("../model/user");
const router = express.Router();
const nodemailer = require("nodemailer");

function generateVerificationToken() {
  return Math.random().toString(36).slice(2, 15);
}

router.post("/signup", async (req, res) => {
  console.log(req.body.email);
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();

    // Generate a verification token and store it in the user record
    // const verificationToken = generateVerificationToken();
    // user.verificationToken = verificationToken;
    // await user.save();

    // Send an email to the user with a verification link
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    //   const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'katherine.fritsch@ethereal.email',
    //         pass: 'nN7YBbu21x5DKd9BvQ'
    //     }
    // });
    /*
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "Shivam Yadav 😎 <shivam@123>",
      to: user.email,
      subject: "Verify Your Email",
      html: `<p>Please click <a href=" http://localhost:3000/api/verify?token=${verificationToken}">here</a> to verify your email address.</p>`,
    };

    await transporter.sendMail(mailOptions);
  */
    console.log("done");

    res.status(201).send({
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error registering user." });
  }

  // Verify a user's email address

  // Helper function to generate a verification token
});
router.get("/verify", async (req, res) => {
  try {
    // Look up the user record that corresponds to the verification token
    const user = await User.findOne({ verificationToken: req.query.token });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Mark the user as verified in the database
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    const message = {
      message: "Email verification successful.",
      token: token,
    };
    res.send(message);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error verifying email address." });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("login called...");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }
    console.log(process.env);
    const token = jwt.sign({ id: user._id }, process.env.jwt_Secret);
    let message = {
      name: user.username,
      token: token,
    };
    res.json(message);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Clear the token from client-side storage
    const token = req.headers.authorization.split(" ")[1];
    jwt.sign(token, process.env.jwt_Secret, { expiresIn: 1 }, (logout, err) => {
      if (logout) {
        res.send({ msg: "You have been Logged Out" });
      } else {
        res.send({ msg: "Error" });
      }
    });
  }
);
router.get(
  "/recordings",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
