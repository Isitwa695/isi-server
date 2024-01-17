import express from "express";
import { authRoutes } from "./auth";
import { siteRoutes } from "./site";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/site", siteRoutes);

export { router as userRoutes }