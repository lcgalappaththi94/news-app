import * as React from "react";
import {AppContext} from "../store/AppContext.tsx";
import {type NewsSource, options, type SourceOption} from "../lib/newsSourceTypes.ts";
import {useCallback} from "react";

export function AppHeader() {
    const {state, dispatch} = React.useContext(AppContext);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("Enter pressed with value:", state.query);
            dispatch({type: "setSearchQuery", query: state.query});
        }
    };

    const onClickCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch({type: "setNewsSource", source: e.target.value as NewsSource});
        } else {
            dispatch({type: "unsetNewsSource", source: e.target.value as NewsSource});
        }
    }, [])

    return (
        <div>
            <h1>Portable News App</h1>
            <form>
                <fieldset>
                    <legend>Search News [{state.newsSources.join(' | ')}]</legend>
                    <input type={"text"} value={state.query} placeholder="Type something to search..."
                           className={"search-input"}
                           onChange={(e) => {
                               dispatch({type: "setSearchQuery", query: e.target.value})
                           }}
                           onKeyDown={handleKeyDown}
                    />
                    {options.map((opt: SourceOption) => (
                        <label key={opt.value}>
                            <input
                                type="checkbox"
                                value={opt.value}
                                checked={state.newsSources.includes(opt.value)}
                                disabled={!opt.enabled}
                                onChange={onClickCheckbox}
                            />
                            {opt.label}
                        </label>
                    ))}
                </fieldset>
            </form>
        </div>
    );
}