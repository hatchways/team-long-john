const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cloudinary = require("cloudinary");
const passport = require("passport");
require("./utils/passport");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const appointmentRouter = require("./routes/appointment");
const meetingRouter = require("./routes/meeting");
const availabilityRouter = require("./routes/availability");

const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

cloudinary.config({
  cloud_name: "calend-app",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const cookieSettings = {
  secret: process.env.SESSION_SECRET,
  maxAge: 7 * 24 * 60 * 60 * 1000, // Session lasts for 7 days
};

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(cookieSettings));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(join(__dirname, "public")));

// Routes
app.get("/", (req, res) => res.send("CalendApp API is running"));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/appointment", appointmentRouter);
app.use("/meeting", meetingRouter);
app.use("/availability", availabilityRouter);

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
