import type {NewsArticleTypes} from "./newsArticleTypes.ts";
import type {NewsSource} from "./newsSourceTypes.ts";

export type PageInfo = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
};

export type Action =
    | { type: "setArticles", articles: NewsArticleTypes[] }
    | { type: "setPinnedArticles", pinnedArticles: NewsArticleTypes[] }
    | { type: "pinArticle", article: NewsArticleTypes }
    | { type: "unpinArticle", article: NewsArticleTypes }
    | { type: "setSearchQuery"; query: string }
    | { type: "setNewsSource"; source: NewsSource }
    | { type: "unsetNewsSource"; source: NewsSource }
    | { type: "setPage"; page: number }
    | { type: "setPageSize"; pageSize: number }
    | { type: "setPageInfo"; pageInfo: PageInfo };