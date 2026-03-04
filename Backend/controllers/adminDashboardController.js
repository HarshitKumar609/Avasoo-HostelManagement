import Student from "../Models/Student.js";
import Complaint from "../Models/complaintSchema.js";
import Notice from "../Models/noticeSchema.js";
import Room from "../Models/Room.js";

// Dashboard Stats
export const dashboardStats = async (req, res) => {
  try {
    const [totalStudents, activeComplaints, totalNotices, roomStats] =
      await Promise.all([
        Student.countDocuments(),
        Complaint.countDocuments({ status: "Pending" }),
        Notice.countDocuments(),
        Room.aggregate([
          {
            $group: {
              _id: null,
              totalCapacity: { $sum: "$capacity" },
              totalOccupied: { $sum: "$occupied" },
            },
          },
        ]),
      ]);

    const totalCapacity = roomStats[0]?.totalCapacity || 0;
    const totalOccupied = roomStats[0]?.totalOccupied || 0;

    const occupancyPercentage =
      totalCapacity === 0
        ? 0
        : Math.round((totalOccupied / totalCapacity) * 10000) / 100;

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        activeComplaints,
        totalNotices,
        rooms: {
          totalCapacity,
          totalOccupied,
          occupancyPercentage,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
