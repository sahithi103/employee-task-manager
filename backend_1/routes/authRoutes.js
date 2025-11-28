import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Health check for auth router
router.get('/', (req, res) => {
	res.json({ ok: true, routes: ['/register (POST)', '/login (POST)'] });
});

router.post('/register', register);
router.post('/login', login);

export default router;
