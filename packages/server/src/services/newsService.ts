import {NewsResponse, ResponseArticle} from "../types/newsResponse";
import {NewsAPIConnector} from "../connectors/api/newsAPIConnector";
import {AppContext} from "../context";
import {NEWS_SOURCE} from "../types/newsSources";
import {paginateResults} from "../utils";
import {PageInfoInput} from "../types/pageable";


export async function getNewsArticles(sources: Set<NEWS_SOURCE>, query: string | undefined, pageInfo: PageInfoInput, ctx: AppContext): Promise<NewsResponse> {
    const promises: any[] = [];

    const cacheKey: string = `news:${Array.from(sources).sort().join(',')}:${query ?? ''}:${pageInfo.page}:${pageInfo.size}`;

    const aggregatedResults = await ctx.cache.getWithKey(cacheKey, async () => {
        for (const source of sources) {
            const service: NewsAPIConnector | null = ctx.newsServices[source];
            if (service) {
                promises.push(service.getNews(query, {page: 1, size: 20}));
            }
        }
        const responses: ResponseArticle[][] = await Promise.all(promises);

        return responses.reduce(
            (acc, response) => acc.concat(response),
            [] as ResponseArticle[]
        );
    });

    const {pageInfoRes, results} = paginateResults<ResponseArticle>(aggregatedResults, pageInfo);
    return {
        pageInfo: pageInfoRes,
        articles: results
    };
}