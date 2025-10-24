import {Router} from 'express';
import {
    savePinnedArticleForUser,
    deletePinnedArticleFromUser,
    getPinnedArticlesForUser
} from '../controllers/userController';

const router = Router();

router.get('/:user_id/articles', getPinnedArticlesForUser);
router.post('/:user_id/articles', savePinnedArticleForUser);
router.delete('/:user_id/articles/:article_id', deletePinnedArticleFromUser);

export default router;
