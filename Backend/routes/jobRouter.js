import express from 'express';
import {getAllJobs,postJob,getmyJobs,updateJob,deleteJob,getSingleJob} from '../controllers/jobController.js'
const router = express.Router();
import {isAuthorized} from '../middlewares/auth.js'

router.get('/getAll', getAllJobs);
router.post('/post',isAuthorized, postJob);
router.get("/getmyjobs", isAuthorized, getmyJobs);
router.put("/update/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);
router.get("/:id", isAuthorized, getSingleJob);
// U need to check all these crud operations
export default router;