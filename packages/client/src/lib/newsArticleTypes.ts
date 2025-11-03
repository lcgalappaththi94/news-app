import type {ResponseArticle} from "news-app-server/src/types/newsResponse.ts";

export type NewsArticleTypes = {
    pinned?: boolean;
} & ResponseArticle;

type PageInfo = {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    hasNextPage: boolean
    totalPages: number
};

export type NewsResponse = {
    pageInfo: PageInfo,
    articles: NewsArticleTypes[]
};