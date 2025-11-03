import {useCallback, useContext, useEffect} from "react";
import NewsView from "./components/NewsView.tsx";
import {getNewsArticles, getPinnedArticles} from "./services/backendApiConnector.ts";
import {debounce} from 'lodash';
import {AppContext} from "./store/AppContext.tsx";
import {AppHeader} from "./components/AppHeader.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import Pagination from "./components/Pagination.tsx";

function App() {
    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        fetchNewsDebounced(state.newsSources.join(','), state.query);
    }, [state.query, state.newsSources, state.page, state.pageSize]);

    useEffect(() => {
        getPinnedArticles().then((articles) => {
            dispatch({
                type: "setPinnedArticles",
                pinnedArticles: articles
            });
        });
    }, []); // only run once on mount


    const fetchNewsDebounced = useCallback(
        debounce((newsSources: string, searchQuery: string) => {
            getNewsArticles(newsSources, {page: state.page, pageSize: state.pageSize}, searchQuery)
                .then(data => {
                    dispatch({type: "setArticles", articles: data?.articles || []});
                    dispatch({type: "setPageInfo", pageInfo: data?.pageInfo || {}});
                }).catch((e) => {
                console.error(e);
            });
        }, 400),
        [state.page, state.pageSize]
    );

    return (
        <div className="app-container">
            <ErrorBoundary>
                <AppHeader/>
                {state.articles ? <Pagination totalItems={state.pageInfo.totalItems}/> : null}
                <NewsView/>
            </ErrorBoundary>
        </div>

    )
}

export default App;
