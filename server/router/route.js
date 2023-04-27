import {Router} from "express"
import  * as controller from "../controllers/controller.js";
const router=Router();



//question route api 

router.route('/questions')
.get(controller.getQuestions)
.post(controller.insertQuestions)
.delete(controller.dropQuestions)

router.route('/result')
.get(controller.getResult)
.post(controller.storeResult)
.delete(controller.dropResult)

router.route('/user')
.get(controller.getUserResult);



export default router;