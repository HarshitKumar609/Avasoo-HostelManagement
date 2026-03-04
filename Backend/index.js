import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./config/db.js";
import adminAuthRoute from "./routes/adminAuthRoute.js";
import roomRoute from "./routes/roomRoute.js";
import studentRoute from "./routes/studentRoute.js";
import allocationRoomRoute from "./routes/allocationRoomRoute.js";
import noticeRoute from "./routes/noticeRoute.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import stripeWebhookRoutes from "./routes/stripeWebhookRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/webhooks", stripeWebhookRoutes);

// Middlewares
app.use(express.json());
app.use(cors());

// All the routes
app.use("/api/admin/auth", adminAuthRoute);
app.use("/api/student/auth", studentRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/allocations", allocationRoomRoute);
app.use("/api/notice", noticeRoute);
app.use("/api/complaints", complaintRoutes);
app.use("/api/dashboardStatus", dashboardRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/payments", paymentRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).send("Backend Running 🚀");
});

// Start server
const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Database connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.error("Database connection failed ❌:", error.message);
    process.exit(1);
  }
};

startServer();
