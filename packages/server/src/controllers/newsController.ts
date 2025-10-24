import {Request, Response} from "express";
import {getNewsArticles} from '../services/newsService';
import {NewsResponse} from "../types/newsResponse";
import {NEWS_SOURCE} from "../types/newsSources";

type QueryParams = {
    newsSources?: string; // Comma-separated string of news sources
    query?: string;
    page?: number;
    pageSize?: number;
}

export const getNews = async (req: Request, res: Response<NewsResponse>) => {
    const {newsSources, query, page, pageSize}: QueryParams = req.query;

    const newsSourcesSet: Set<NEWS_SOURCE> = new Set([NEWS_SOURCE.GUARDIAN]);
    if (newsSources) {
        newsSources.split(',').forEach(source => {
            const trimmedSource = source.trim().toUpperCase();
            if (trimmedSource in NEWS_SOURCE) {
                newsSourcesSet.add(NEWS_SOURCE[trimmedSource as keyof typeof NEWS_SOURCE]);
            }
        });
    }

    const newsResponse = await getNewsArticles(newsSourcesSet, query, {
        page: page ?? 1,
        size: pageSize ?? 10
    }, req.app.locals.ctx);
    return res.status(200).json(newsResponse);
};