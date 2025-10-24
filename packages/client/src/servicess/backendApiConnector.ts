import axios from "axios";
import type {NewsArticleTypes} from "../lib/newsArticleTypes.ts";
import {AUTH_TOKEN_KEY, DEFAULT_USER} from "../lib/constants.ts";

const backendAPI = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

backendAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// backendAPI.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             const token = prompt(`Hi, ${DEFAULT_USER}, Please enter your token:`);
//             if (token) {
//                 console.log("User provided token.");
//                 localStorage.setItem('token', token);
//             } else {
//                 console.log("User cancelled.");
//             }
//         }
//         return Promise.reject(error);
//     }
// );

type PageInfoQuery = {
    page: number;
    pageSize: number;
};

export async function getNewsArticles(newsSources: string, pageInfo: PageInfoQuery, query?: string) {
    const params = {
        query: query?.trim() ? query : undefined,
        newsSources: newsSources.trim() ? newsSources : undefined,
        ...pageInfo
    };
    const response = await backendAPI.get('/articles', {
        params
    });
    return response?.data?.articles ?? [];
}

export async function getPinnedArticles(userId: string = DEFAULT_USER) {
    const response = await backendAPI.get(`/users/${userId}/articles`);
    return response?.data?.articles ?? [];
}

export async function pinArticle(article: NewsArticleTypes, userId: string = DEFAULT_USER) {
    return await backendAPI.post(`/users/${userId}/articles`, article);
}

export async function unpinArticle(articleId: string, userId: string = DEFAULT_USER) {
    return await backendAPI.delete(`/users/${userId}/articles/${encodeURIComponent(articleId)}`);
}