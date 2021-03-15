import express from 'express';
import {curruntUser} from '../../controllers/userController';
const router=express.Router();

router.get('/curruntUser',curruntUser);

export default router;