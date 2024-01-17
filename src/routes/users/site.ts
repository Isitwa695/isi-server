import express from "express";
import { UserCtrl } from "../../controllers";
import { createPost, validate } from "../../middlewares";
import { authMiddleware } from "../../middlewares/auth";

const router = express.Router();

router.post("/create", authMiddleware, UserCtrl.Site.create);
router.get("/get", authMiddleware, UserCtrl.Site.get);
router.get("/get/:id", authMiddleware, UserCtrl.Site.getById);

export { router as siteRoutes }