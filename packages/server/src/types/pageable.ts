export type PageInfo = {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    hasNextPage: boolean
    totalPages: number
};

export type PageInfoInput = {
    page: number,
    size: number
};

export type PaginatedResult<T> = {
    pageInfoRes: PageInfo;
    results: T[];
};

