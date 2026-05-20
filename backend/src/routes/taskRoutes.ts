import express from "express";
import protect from "../middlewares/authMiddleware";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} from "../controllers/taskController";

const router = express.Router();

router.route("/").post(protect, createTask).get(protect, getTasks);

router.route("/:id").get(protect, getTaskById).put(protect, updateTask).delete(protect, deleteTask);

export default router;