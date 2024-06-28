import { Op } from "sequelize";
import Student from "../models/Student.js";

export const getMonthlyRevenue = async (req, res) => {
  const { month, year, paymentStatus, userId } = req.query;

  if (!month || !year) {
    return res
      .status(400)
      .json({ message: "Month and year are required parameters." });
  }

  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    let whereClause = {
      userId: userId,
      payment_date: {
        [Op.between]: [startDate, endDate],
      },
    };

    if (paymentStatus && ["გადაუხდელი", "გადახდილი"].includes(paymentStatus)) {
      whereClause.payment_status = paymentStatus;
    } else if (
      paymentStatus &&
      !["გადაუხდელი", "გადახდილი"].includes(paymentStatus)
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid paymentStatus. Allowed values are 'გადაუხდელი' or 'გადახდილი'.",
        });
    }

    const students = await Student.findAll({
      where: whereClause,
    });

    let totalGEL = 0;
    let totalUSD = 0;
    let totalEURO = 0;

    students.forEach((student) => {
      const amountStr = student.how_much_pays.replace(/[^\d.-]/g, "");
      const amount = parseFloat(amountStr);
      const currency = student.currency.toLowerCase();

      if (currency === "gel") {
        totalGEL += amount;
      } else if (currency === "usd") {
        totalUSD += amount;
      } else if (currency === "eur") {
        totalEURO += amount;
      }
    });

    res.status(200).json({
      totalRevenue: {
        GEL: totalGEL,
        USD: totalUSD,
        EURO: totalEURO,
      },
    });
  } catch (error) {
    console.error("Error calculating monthly revenue:", error);
    res.status(500).json({ message: "Server error" });
  }
};
