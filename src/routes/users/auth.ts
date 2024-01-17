import express from "express";
import { UserCtrl } from "../../controllers";
import { createUser, googleLoginUser, validate } from "../../middlewares";

const router = express.Router();

router.post("/register", validate(createUser), UserCtrl.Auth.register);
router.put("/googleLogin", validate(googleLoginUser), UserCtrl.Auth.googleLogin);
router.post("/", UserCtrl.Auth.auth);

export { router as authRoutes }