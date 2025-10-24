import {NewsResponse, ResponseArticle} from "../types/newsResponse";
import {AppContext} from "../context";
import {paginateResults} from "../utils";
import {PageInfoInput} from "../types/pageable";

export function getPinnedArticles(userId: string, pageInfo: PageInfoInput, ctx: AppContext): NewsResponse {
    const pinnedArticles = ctx.db.getPinnedArticles(userId);

    const {pageInfoRes, results} = paginateResults<ResponseArticle>(pinnedArticles, pageInfo);
    return {
        pageInfo: pageInfoRes,
        articles: results
    };
}


export function pinArticle(userId: string, article: ResponseArticle, ctx: AppContext) {
    ctx.db.savePinnedArticle(userId, article);
}

export function unPinArticle(userId: string, articleId: string, ctx: AppContext) {
    ctx.db.deletePinnedArticle(userId, articleId);
}