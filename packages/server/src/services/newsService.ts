import {NewsResponse} from "../types/newsResponse";
import {NewsAPIConnector} from "../connectors/api/newsAPIConnector";
import {AppContext} from "../context";
import {NEWS_SOURCE} from "../types/newsSources";
import {PageInfoInput} from "../types/pageable";


export async function getNewsArticles(sources: Set<NEWS_SOURCE>, query: string | undefined, pageInfo: PageInfoInput, ctx: AppContext): Promise<NewsResponse> {
    const {page, size} = pageInfo;
    const sourcesCount = sources.size;
    console.log('sourcesCount', sourcesCount);

    const cacheKey: string = `news:${Array.from(sources).sort().join(',')}:${query ?? ''}:${page}:${size}`;

    // min page size =5 when sources count <=1
    const pageSizePerSource = sourcesCount <= 1 ? Math.max(size, 1) : Math.max(Math.floor(size / sourcesCount), 1);

    // const {pageInfoRes, results} = paginateResults<ResponseArticle>(aggregatedResults, pageInfo);
    return await ctx.cache.getWithKey(cacheKey, async () => {
        const promises: Promise<NewsResponse>[] = [];
        for (const source of sources) {
            const service: NewsAPIConnector | null = ctx.newsServices[source];
            if (service) {
                console.log(`Fetching news from source: ${source}, page: ${page}, size: ${pageSizePerSource}`);
                promises.push(service.getNews(query, {page, size: pageSizePerSource}));
            }
        }
        const responses: NewsResponse[] = await Promise.all(promises)

        return responses.reduce(
            (acc, {articles, pageInfo}) => {
                acc.articles = acc.articles.concat(articles)
                acc.pageInfo.totalItems += pageInfo.totalItems;
                acc.pageInfo.totalPages += pageInfo.totalPages;
                acc.pageInfo.hasNextPage = acc.pageInfo.hasNextPage || pageInfo.hasNextPage;
                return acc;
            },
            {
                articles: [],
                pageInfo: {
                    totalItems: 0,
                    itemsPerPage: size,
                    currentPage: page,
                    totalPages: 0,
                    hasNextPage: false,
                }
            } as NewsResponse
        );
    });
}