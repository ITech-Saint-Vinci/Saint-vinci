import { Router} from "express";
import { getCurrentYear, updateYear } from "../controllers/updateYear";
import { requireAuth, requireAuthDirector } from "../middleware/requireAuth";
import { updateYearValidation } from "../middleware/directorValidation";

const academicYearRouter = Router()

academicYearRouter.put("/",requireAuth, requireAuthDirector,updateYearValidation, updateYear)
academicYearRouter.get("/",requireAuth, requireAuthDirector,getCurrentYear)

export default academicYearRouter