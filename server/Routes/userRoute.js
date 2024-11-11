import express from 'express';
import { user } from '../controller/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();


router.get('/',verifyToken,user)


export default router;