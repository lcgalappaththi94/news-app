import InMemoryDataStore from './connectors/data/inMemoryDataStore';
import InMemoryCache from './connectors/cache/inMemoryCache';
import GuardianAPIConnector from './connectors/api/guardianAPIConnector';
import {NewsAPIConnector} from "./connectors/api/newsAPIConnector";
import {NEWS_SOURCE} from "./types/newsSources";
import NewsOrgAPIConnector from "./connectors/api/newsOrgAPIConnector";

export type AppContext = {
    db: InMemoryDataStore;
    cache: InMemoryCache;
    newsServices: Record<NEWS_SOURCE, NewsAPIConnector | null>;
}

export function createContext(): AppContext {
    return {
        db: new InMemoryDataStore(),
        cache: new InMemoryCache(),
        newsServices: {
            [NEWS_SOURCE.GUARDIAN]: new GuardianAPIConnector(),
            [NEWS_SOURCE.NEWS_ORG]: new NewsOrgAPIConnector(),
            [NEWS_SOURCE.BBC]: null,
            [NEWS_SOURCE.CNN]: null,
        },
    };
}
