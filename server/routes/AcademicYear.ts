import { Router} from "express";
import { getCurrentYear, updateYear } from "../controllers/updateYear";

const academicYearRouter = Router()

academicYearRouter.put("/",updateYear)
academicYearRouter.get("/",getCurrentYear)

export default academicYearRouter