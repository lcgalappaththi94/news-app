import axios from 'axios';
import {NewsAPIConnector} from "./newsAPIConnector";
import {NewsOrgApiResponse, NewsResponse} from "../../types/newsResponse";
import {NEWS_SOURCE} from "../../types/newsSources";
import {PageInfoInput} from "../../types/pageable";

class NewsOrgAPIConnector implements NewsAPIConnector {
    readonly newsOrgApi;

    constructor() {
        this.newsOrgApi = axios.create({
            baseURL: process.env.NEWSORG_API_URL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async getNews(query: string, pageInfo: PageInfoInput): Promise<NewsResponse> {
        try {
            const response = await this.newsOrgApi.get<NewsOrgApiResponse>(`/v2/everything`, {
                params: {
                    'apiKey': process.env.NEWSORG_API_KEY,
                    'q': query ?? 'latest',
                    'page': pageInfo.page,
                    'pageSize': pageInfo.size,
                },
            });
            const data: NewsOrgApiResponse = response.data;
            const totalPages = Math.ceil(data.totalResults / pageInfo.size);
            return {
                articles: data.articles.map((article) => ({
                    id: article.title,
                    type: 'article',
                    webPublicationDate: article.publishedAt,
                    webTitle: article.title,
                    webUrl: article.url,
                    source: NEWS_SOURCE.NEWS_ORG
                })),
                pageInfo: {
                    totalItems: data.totalResults,
                    itemsPerPage: pageInfo.size,
                    currentPage: pageInfo.page,
                    totalPages,
                    hasNextPage: pageInfo.page < totalPages,
                }
            };
        } catch (err) {
            console.error('Error fetching news articles:', err);
            throw err;
        }
    }

}

export default NewsOrgAPIConnector;