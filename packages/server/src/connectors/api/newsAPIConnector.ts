import {ResponseArticle} from "../../types/newsResponse";
import {PageInfoInput} from "../../types/pageable";

export interface NewsAPIConnector {
    getNews(query: string | undefined, pageInfo: PageInfoInput): Promise<ResponseArticle[]>;
}