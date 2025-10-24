import NodeCache from "node-cache";
import {SECONDS_ONE_HOUR} from "../../constants";

class InMemoryCache implements CacheConnector {
    readonly inMemoryCache: NodeCache;

    constructor(ttl: number = SECONDS_ONE_HOUR) {
        this.inMemoryCache = new NodeCache({
            stdTTL: ttl,
            checkperiod: 120 // Check TTLs every 2 minutes
        });
    }

    async getWithKey<T>(key: string, refreshFn: () => Promise<T>): Promise<T> {
        let cachedData = this.inMemoryCache.get(key);

        if (cachedData) {
            console.log('Cache hit for key:', key);
            return cachedData as T;
        }

        console.log('Cache miss for key:', key);
        const results = await refreshFn();
        await this.setForKey(key, results);
        return results;
    }

    async setForKey(key: string, value: any, ttl: number = SECONDS_ONE_HOUR): Promise<void> {
        this.inMemoryCache.set(key, value, ttl);
    }
}

export default InMemoryCache;