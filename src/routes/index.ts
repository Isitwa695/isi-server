import express from "express";
import { userRoutes } from "./users";

const router = express.Router();

router.use("/admin", () => console.log("admin routes"));
router.use("/users", userRoutes);

export { router as routes }