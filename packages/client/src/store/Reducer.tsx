import type {NewsArticleTypes} from "../lib/newsArticleTypes.ts";
import type {Action} from "../lib/actionTypes.ts";
import type {NewsSource} from "../lib/newsSourceTypes.ts";

export type AppState = {
    articles: NewsArticleTypes[];
    pinnedArticles: NewsArticleTypes[];
    query: string;
    newsSources: NewsSource[];
    isAuthenticated: boolean;
    page: number;
    pageSize: number;
};

export const initialState: AppState = {
    articles: [],
    pinnedArticles: [],
    query: "",
    newsSources: ["THE_GUARDIAN"],
    isAuthenticated: false,
    page: 1,
    pageSize: 5,
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
            return {...state, newsSources: state.newsSources.concat(action.source)};
        case "unsetNewsSource":
            if (state.newsSources.length <= 1) {
                return state; // prevent removing the last source
            }
            return {...state, newsSources: state.newsSources.filter(source => source !== action.source)};
        case "setPage":
            return {...state, page: action.page};
        case "setPageSize":
            return {...state, pageSize: action.pageSize};
        default:
            return state;
    }
}
