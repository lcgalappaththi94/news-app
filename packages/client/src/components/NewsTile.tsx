import type {NewsArticleTypes} from "../lib/newsArticleTypes.ts";
import {useContext} from "react";
import {AppContext} from "../store/AppContext.tsx";
import {pinArticle, unpinArticle} from "../services/backendApiConnector.ts";
import {getFormattedDate} from "../lib/utils.ts";

type Props = {
    article: NewsArticleTypes;
}

export default function NewsTile({article}: Props) {
    const {webTitle, webUrl, webPublicationDate, source, pinned} = article;
    const {dispatch} = useContext(AppContext);

    const onClickPin = (article: NewsArticleTypes) => {
        if (article.pinned) {
            unpinArticle(article.id).then(() => {
                console.log("Unpinned with value:", article.id);
                dispatch({type: 'unpinArticle', article: article});
            }).catch((err) => {
                console.error("Error unpinning article:", err);
            });
        } else {
            pinArticle(article).then(() => {
                console.log("Pinned with value:", article.id);
                dispatch({type: 'pinArticle', article: article});
            });
        }
    };

    return (
        <div className={`newsTile ${pinned ? "pinned" : ""}`}>
            <h3 className="title">{webTitle}</h3>
            <a
                className="link"
                href={webUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                Read more at {source.toLowerCase()}
            </a>
            {/* Use client's timezone from the browser - auto-detect local*/}
            <p className="meta">
                {getFormattedDate(webPublicationDate)}
            </p>
            <p className="meta"><i>Source: {source}</i></p>

            <button
                className="pinButton"
                onClick={() => {
                    onClickPin(article);
                }}
            >
                {pinned ? "Unpin" : "Pin"}
            </button>

            {pinned && <span className="badge">📌 Pinned</span>}
        </div>
    );
}