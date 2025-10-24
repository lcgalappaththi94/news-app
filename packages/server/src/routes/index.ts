import {Router} from 'express';
import userRoutes from './userRoutes';
import newsRoutes from './newsRoutes';
import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

router.use('/users', authMiddleware, userRoutes);
router.use('/articles', newsRoutes);

// health check route
router.get('/health', (req, res) => {
    res.status(200).send('API is healthy');
});

export default router;