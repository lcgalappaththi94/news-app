import {NEWS_SOURCE} from "./newsSources";
import {PageInfo} from "./pageable";

export type GuardianApiResponse = {
    response: {
        status: string;
        userTier: string;
        total: number;
        startIndex: number;
        pageSize: number;
        currentPage: number;
        pages: number;
        orderBy: string;
        results: GuardianArticle[];
    };
};

type GuardianArticle = {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
};

export type NewsOrgApiResponse = {
    status: string;
    totalResults: number;
    articles: NewsOrgArticle[];
};

export type NewsOrgArticle = {
    source: {
        id: string | null;
        name: string;
    },
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}


export type ResponseArticle = {
    id: string;
    type: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    source: NEWS_SOURCE;
};

export type NewsResponse = {
    pageInfo: PageInfo,
    articles: ResponseArticle[]
};