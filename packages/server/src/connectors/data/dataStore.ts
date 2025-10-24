import {ValidUser} from "../../types/authenticatedRequest";
import {ResponseArticle} from "../../types/newsResponse";

export interface DataStore {
    validateUser(email: string, password: string): ValidUser | null;

    getPinnedArticles(userId: string): ResponseArticle[];

    savePinnedArticle(userId: string, article: ResponseArticle): void;

    deletePinnedArticle(userId: string, articleId: string): void;
}