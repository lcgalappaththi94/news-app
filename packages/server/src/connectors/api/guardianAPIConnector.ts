import axios from 'axios';
import {NewsAPIConnector} from "./newsAPIConnector";
import {GuardianApiResponse, ResponseArticle} from "../../types/newsResponse";
import {NEWS_SOURCE} from "../../types/newsSources";
import {PageInfoInput} from "../../types/pageable";

class GuardianAPIConnector implements NewsAPIConnector {
    readonly guardianApi;

    constructor() {
        this.guardianApi = axios.create({
            baseURL: process.env.GUARDIAN_API_URL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async getNews(query: string, pageInfo: PageInfoInput): Promise<ResponseArticle[]> {
        try {
            const response = await this.guardianApi.get<GuardianApiResponse>(`/search`, {
                params: {
                    'api-key': process.env.GUARDIAN_API_KEY,
                    'type': 'article',
                    'q': query,
                    'page': pageInfo.page,
                    'page-size': pageInfo.size,
                },
            });
            const data: GuardianApiResponse = response.data;
            return data.response.results.map((article) => ({
                id: article.id,
                type: article.type,
                webPublicationDate: article.webPublicationDate,
                webTitle: article.webTitle,
                webUrl: article.webUrl,
                source: NEWS_SOURCE.GUARDIAN
            }));
        } catch (err) {
            console.error('Error fetching news articles:', err);
            throw err;
        }
    }

}

export default GuardianAPIConnector;