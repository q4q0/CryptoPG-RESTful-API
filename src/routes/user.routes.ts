import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller";

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

export default router;
