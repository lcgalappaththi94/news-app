import NewsSection from "./NewsSection.tsx";
import {useContext} from "react";
import {AppContext} from "../store/AppContext.tsx";

export default function NewsView() {
    const {state} = useContext(AppContext);
    return (
        <>
            <div className="container">
                {/* Pinned News */}
                <NewsSection articles={state.pinnedArticles} headerName={"📌 Pinned Articles"}/>
            </div>
            <div className="container">

                {/* Latest / Searched News */}
                <NewsSection articles={state.articles} headerName={"Latest Articles"}/>
            </div>
        </>
    );
}