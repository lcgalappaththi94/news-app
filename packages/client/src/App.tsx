import {useCallback, useContext, useEffect} from "react";
import NewsView from "./components/NewsView.tsx";
import {getNewsArticles, getPinnedArticles} from "./servicess/backendApiConnector.ts";
import {debounce, toNumber} from 'lodash';
import {AppContext} from "./store/AppContext.tsx";
import {AppHeader} from "./components/AppHeader.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

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
                .then(articles => {
                    dispatch({type: "setArticles", articles});
                }).catch((e) => {
                console.error(e);
            });
        }, 400),
        [state.page, state.pageSize]
    );

    return (
        <div className="app-container">
            <ErrorBoundary>
                <input type="number"
                       onChange={(e) => dispatch({type: "setPage", page: toNumber(e.target.value)})}/>
                <input type="number" onChange={(e) => dispatch({
                    type: "setPageSize",
                    pageSize: toNumber(e.target.value)
                })}/>
                <AppHeader/>
                <NewsView/>
            </ErrorBoundary>
        </div>

    )
}

export default App;
