import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();

// Explicitly type the route handlers as RequestHandler
router.post('/register', async (req: Request, res: Response) => {
    await AuthController.register(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
    await AuthController.login(req, res);
});

export default router;
