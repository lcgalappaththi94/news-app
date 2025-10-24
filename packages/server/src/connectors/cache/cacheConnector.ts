interface CacheConnector {
    getWithKey(key: string, refreshFn: any): any

    setForKey(key: string, value: any, ttlSeconds: number): void
}