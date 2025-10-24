import {PageInfoInput, PaginatedResult} from "./types/pageable";

export function paginateResults<T>(results: T[], pageInfo: PageInfoInput): PaginatedResult<T> {
    const totalItems = results.length;
    const {page, size} = pageInfo;
    const totalPages = Math.ceil(totalItems / size);

    return {
        pageInfoRes: {
            totalItems,
            itemsPerPage: size,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
        },
        results: results.slice((page - 1) * size, page * size),
    };
}