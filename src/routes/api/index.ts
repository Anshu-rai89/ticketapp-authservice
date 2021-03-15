import express from 'express';
import users from './user'
const router=express.Router();

router.use('/users',users);

export default router;