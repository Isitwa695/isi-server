import express from "express";
import { AdminCtrl, UserCtrl } from "../../controllers";
import { adminLogin, createUser, validate } from "../../middlewares";

const router = express.Router();

router.put("/login", validate(adminLogin), AdminCtrl.Auth.login);

export { router as authRoutes }