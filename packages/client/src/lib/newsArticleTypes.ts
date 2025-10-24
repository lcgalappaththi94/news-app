export type NewsArticleTypes = {
    id: string;
    type: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    source: string;
    pinned: boolean;
};

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