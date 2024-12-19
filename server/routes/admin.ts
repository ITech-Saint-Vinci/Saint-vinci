import express from "express"
import { requireAnyRole, requireAuth, requireAuthAdmin } from "../middleware/requireAuth"
import { UserRole } from "../contansts"
import { addAStudent, getAllClasses, handleCSVUpload } from "../controllers/admin"
import { fileFilter, storage } from "../middleware/multerMiddleWare"
import multer from "multer"
import { getClasses, postStudent } from "../controllers/admin";
import { inscriptionValidation } from "../middleware/inscriptionValidation";

export const adminRouter = express.Router()

adminRouter.get("/", requireAuth, requireAnyRole([UserRole.Director, UserRole.Admin]), getAllClasses)

adminRouter.post("/:id", requireAuth, requireAuthAdmin, addAStudent)

const upload = multer({ storage, fileFilter });
adminRouter.post("/csv/upload", requireAuth, requireAuthAdmin, upload.single("file"), handleCSVUpload);


adminRouter.get("/classes", getClasses)
adminRouter.post("/", inscriptionValidation, postStudent)