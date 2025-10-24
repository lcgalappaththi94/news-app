import {Request, Response} from 'express';
import {pinArticle, unPinArticle, getPinnedArticles} from "../services/userService";
import {NewsResponse, ResponseArticle} from "../types/newsResponse";

export const savePinnedArticleForUser = async (req: Request, res: Response) => {
    const {user_id} = req.params;
    pinArticle(user_id, req.body as ResponseArticle, req.app.locals.ctx);
    res.status(201).send();
};

export const deletePinnedArticleFromUser = async (req: Request, res: Response) => {
    const {user_id, article_id} = req.params;
    unPinArticle(user_id, article_id, req.app.locals.ctx);
    res.status(204).send();
};

export const getPinnedArticlesForUser = async (req: Request, res: Response<NewsResponse>) => {
    const {user_id} = req.params;
    const newsResponse = getPinnedArticles(user_id, {
        page: 1,
        size: 10
    }, req.app.locals.ctx);
    res.status(200).json(newsResponse);
};
