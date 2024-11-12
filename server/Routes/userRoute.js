import express from "express";
import {
  getAllUsers,
  updateUser,
  user,
  deleteUser,
  createUser,
} from "../controller/userController.js";
import verifyToken from "../middleware/verifyToken.js";
import adminProtect from "../middleware/AdminProtect.js";
const router = express.Router();

router.get("/getUsers", adminProtect, getAllUsers);
router.post("/", adminProtect, createUser);
router.get("/", verifyToken, user);
router.put("/", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
