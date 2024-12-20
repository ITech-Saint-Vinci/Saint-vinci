import express from "express";
import { requireAuth, requireAuthAdmin } from "../middleware/requireAuth";
import { addAStudent, handleCSVUpload } from "../controllers/admin";
import { fileFilter, storage } from "../middleware/multerMiddleWare";
import multer from "multer";

export const adminRouter = express.Router();

adminRouter.post("/:id", requireAuth, requireAuthAdmin, addAStudent);

const upload = multer({ storage, fileFilter });
adminRouter.post(
  "/csv/upload",
  requireAuth,
  requireAuthAdmin,
  upload.single("file"),
  handleCSVUpload
);
