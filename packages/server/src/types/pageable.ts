export type PageInfo = {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    totalPages: number
    hasNextPage: boolean
};

export type PageInfoInput = {
    page: number,
    size: number
};

export type PaginatedResult<T> = {
    pageInfoRes: PageInfo;
    results: T[];
};
