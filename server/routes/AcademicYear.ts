import { Router} from "express";
import { getCurrentYear, updateYear } from "../controllers/updateYear";
import { requireAuth, requireAuthDirector } from "../middleware/requireAuth";

const academicYearRouter = Router()

academicYearRouter.put("/",requireAuth, requireAuthDirector,updateYear)
academicYearRouter.get("/",requireAuth, requireAuthDirector,getCurrentYear)

export default academicYearRouter