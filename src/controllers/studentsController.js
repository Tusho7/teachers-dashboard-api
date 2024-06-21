import Student from "../models/Student.js";
import { calculateNextPaymentDate, calculateEighthLessonDate } from "../utils/helpers.js";

export const getStudents = async (_, res) => {
  try {
    const students = await Student.findAll();

    const formattedStudents = students.map(student => ({
      ...student.toJSON(),
      start_date: student.start_date.toISOString().split('T')[0], 
      payment_date: student.payment_date.toISOString().split('T')[0],
      next_payment_date: student.next_payment_date.toISOString().split('T')[0], 
      eighth_lesson_date: student.eighth_lesson_date.toISOString().split('T')[0], 
    }));

    res.status(200).json(formattedStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const add_student = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      start_date,
      phone_number,
      facebook_profile,
      how_much_pays,
      payment_status,
      days_per_week,
      days_of_week,
      payment_date
    } = req.body;

    if (!days_of_week) {
      return res.status(400).json({ message: "Days of week must be provided" });
    }

    if (payment_status === "გადახდილი" && !payment_date) {
      return res.status(400).json({ message: "გთხოვთ შეიყვანოთ გადახდის თარიღი 'გადახდილი'" });
    }

    const calculatedPaymentDate = payment_date ? new Date(payment_date) : new Date(start_date);
    console.log(payment_date);


    const newStudent = await Student.create({
      first_name,
      last_name,
      start_date,
      phone_number,
      facebook_profile,
      how_much_pays,
      payment_status: payment_status || 'გადაუხდელი',
      days_per_week,
      days_of_week,
      payment_date: calculatedPaymentDate,
      next_payment_date: calculateNextPaymentDate(start_date, days_per_week, days_of_week),
      eighth_lesson_date: calculateEighthLessonDate(start_date, days_per_week, days_of_week),
    });

    const formattedStudent = {
      ...newStudent.toJSON(),
      start_date: newStudent.start_date.toISOString().split('T')[0],
      payment_date: newStudent.payment_date.toISOString().split('T')[0],
      next_payment_date: newStudent.next_payment_date.toISOString().split('T')[0],
      eighth_lesson_date: newStudent.eighth_lesson_date.toISOString().split('T')[0],
    };

    res.status(201).json(formattedStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const update_student = async (req, res) => {
  const { studentId } = req.params;
  const {
    first_name,
    last_name,
    start_date,
    phone_number,
    facebook_profile,
    how_much_pays,
    payment_status,
    days_per_week,
    attendance_count,
    days_of_week,
  } = req.body;

  try {
    let student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.first_name = first_name || student.first_name;
    student.last_name = last_name || student.last_name;
    student.start_date = start_date || student.start_date;
    student.phone_number = phone_number || student.phone_number;
    student.facebook_profile = facebook_profile || student.facebook_profile;
    student.how_much_pays = how_much_pays || student.how_much_pays;
    student.days_per_week = days_per_week || student.days_per_week;

    if (payment_status !== undefined) {
      student.payment_status = payment_status;
    }

    if (start_date !== undefined || days_per_week !== undefined) {
      student.payment_date = new Date(); 

      const daysUntilNextPayment = 8 * Math.ceil(8 / student.days_per_week);
      const nextPaymentDate = new Date(student.payment_date);
      nextPaymentDate.setDate(nextPaymentDate.getDate() + daysUntilNextPayment);
      student.next_payment_date = nextPaymentDate;
    }

    if (attendance_count !== undefined) {
      student.attendance_count = attendance_count;
    }

    if (days_of_week !== undefined) {
      student.days_of_week = days_of_week;
    }

    await student.save();

    res.status(200).json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Server error" });
  }
};
