import React, {useContext, useMemo} from "react";
import {AppContext} from "../store/AppContext";
import {toNumber} from "lodash";

type PaginationProps = {
    totalItems: number;
    initialPageSize?: number;
};

const Pagination = ({totalItems, initialPageSize = 5}: PaginationProps) => {
        const {
            state: {pageInfo: {itemsPerPage: pageSize, currentPage, hasNextPage}, newsSources},
            dispatch
        } = useContext(AppContext);

        const totalPages = Math.ceil(totalItems / pageSize);

        const handlePrev = () => {
            dispatch({type: "setPage", page: Math.max(currentPage - 1, 1)});
        };

        const handleNext = () => {
            dispatch({type: "setPage", page: toNumber(currentPage) + 1});
        };

        const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newSize = parseInt(e.target.value, 10);
            dispatch({type: "setPageSize", pageSize: newSize});
            dispatch({type: "setPage", page: 1});
        };

        const pageSizeOptions = useMemo(() => [5, 10, 15].map(option => {
            const pageSize = option * newsSources.length;
            return <option key={pageSize} value={pageSize}>{pageSize}</option>;
        }), [newsSources]);

        return (
            <div style={{display: "flex", alignItems: "center", gap: "8px", margin: "20px 0"}}>
                <button onClick={handlePrev} disabled={currentPage === 1}>
                    Previous
                </button>

                <span>Page {currentPage} of {totalPages}</span>

                <button onClick={handleNext} disabled={!hasNextPage}>
                    Next
                </button>

                <label style={{marginLeft: "16px"}}>
                    Page size:
                    <select value={pageSize ?? initialPageSize} onChange={handlePageSizeChange}>
                        {pageSizeOptions}
                    </select>
                </label>
            </div>
        );
    }
;

export default Pagination;
