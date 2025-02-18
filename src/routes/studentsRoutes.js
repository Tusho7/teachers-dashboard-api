import express from "express";
import {
  add_student,
  getStudents,
  getEntrantStudents,
  fromAboadStudents,
  getStudentsByPaymentStatus,
  update_student,
  total_students,
  delete_student,
  getStudentById,
  getEntrantStudentsById,
  fromAboadStudentsById,
  totalStudentsById
} from "../controllers/studentsController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/get_students",  getStudents);
router.get("/entrant_students", authMiddleware, getEntrantStudents);
router.get("/abroad_students", authMiddleware, fromAboadStudents);
router.get("/get_students/payment_status/:status", authMiddleware, getStudentsByPaymentStatus);
router.get("/total_students", authMiddleware, total_students);
router.post("/add_student", authMiddleware,  add_student);
router.put("/update_student/:studentId", authMiddleware, update_student);
router.delete("/students/:studentId", authMiddleware, delete_student);


router.get('/students/:userId', authMiddleware,  getStudentById);
router.get("/entrant_students/:userId", authMiddleware, getEntrantStudentsById);
router.get("/abroad_students/:userId", authMiddleware, fromAboadStudentsById)
router.get("/total_students/:userId",  totalStudentsById);

export default router;
