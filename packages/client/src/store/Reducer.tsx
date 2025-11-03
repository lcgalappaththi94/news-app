import type {NewsArticleTypes} from "../lib/newsArticleTypes.ts";
import type {Action, PageInfo} from "../lib/actionTypes.ts";
import {NEWS_SOURCE} from "news-app-server/src/types/newsSources.ts";

export type AppState = {
    articles: NewsArticleTypes[];
    pinnedArticles: NewsArticleTypes[];
    query: string;
    newsSources: NEWS_SOURCE[];
    isAuthenticated: boolean;
    page: number;
    pageSize: number;
    pageInfo: PageInfo;
};

export const initialState: AppState = {
    articles: [],
    pinnedArticles: [],
    query: "",
    newsSources: [NEWS_SOURCE.GUARDIAN],
    isAuthenticated: false,
    page: 1,
    pageSize: 5,
    pageInfo: {
        totalItems: 0,
        itemsPerPage: 5,
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false
    }
}

export function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "setArticles":
            return {...state, articles: action.articles};
        case "setPinnedArticles":
            return {
                ...state,
                pinnedArticles: action.pinnedArticles.map((a: NewsArticleTypes) => ({...a, pinned: true}))
            };
        case "pinArticle":
            action.article.pinned = true;
            return {
                ...state,
                pinnedArticles: state.pinnedArticles.concat(action.article),
                articles: state.articles.map((a) =>
                    a.id === action.article.id ? {...a, pinned: false} : a
                )
            };
        case "unpinArticle":
            action.article.pinned = false;
            return {
                ...state,
                pinnedArticles: state.pinnedArticles.filter(
                    (pa) => pa.id !== action.article.id
                )
            };
        case "setSearchQuery":
            return {...state, query: action.query};
        case "setNewsSource":
            return {
                ...state,
                newsSources: state.newsSources.concat(action.source),
                pageSize: state.pageSize + 5,
            };
        case "unsetNewsSource":
            if (state.newsSources.length <= 1) {
                return state; // prevent removing the last source
            }
            return {
                ...state,
                newsSources: state.newsSources.filter(source => source !== action.source),
                pageSize: Math.max(5, state.pageSize - 5),
            };
        case "setPage":
            return {...state, page: action.page};
        case "setPageSize":
            return {...state, pageSize: action.pageSize};
        case "setPageInfo":
            return {...state, pageInfo: action.pageInfo};
        default:
            return state;
    }
}
