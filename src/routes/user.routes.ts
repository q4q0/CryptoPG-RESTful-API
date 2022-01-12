import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller";

router.get("/", userController.findAllUsers);
router.get("/:id", userController.findUser);
router.post("/", userController.createUser);

export default router;
