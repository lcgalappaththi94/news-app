import type {NewsArticleTypes} from "../lib/newsArticleTypes.ts";
import NewsTile from "./NewsTile.tsx";

type Props = {
    headerName: string;
    articles: NewsArticleTypes[];
}

export default function NewsSection(props: Props) {
    return <div className="news-section">
        <div>
            <h2>{props.headerName}</h2>
        </div>
        <div>
            {
                props.articles.length === 0 ? (
                    <div>No articles found</div>
                ) : (
                    props.articles.map((item) =>
                        <NewsTile key={item.id} article={item}/>)
                )
            }
        </div>
    </div>;
}