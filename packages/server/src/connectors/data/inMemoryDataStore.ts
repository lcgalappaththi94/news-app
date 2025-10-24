import {ValidUser, AuthUser} from '../../types/authenticatedRequest';
import {ResponseArticle} from "../../types/newsResponse";
import {DataStore} from './dataStore';

class InMemoryDataStore implements DataStore {
    private readonly articles: Record<string, Record<string, ResponseArticle>>;
    private readonly users: Record<string, AuthUser>;

    constructor() {
        this.articles = {};
        this.users = {
            'user1@portable.com.au': {id: 'user1', password: 'password1'},
            'user2@portable.com.au': {id: 'user2', password: 'password2'}
        };
    }

    getPinnedArticles(userId: string): ResponseArticle[] {
        const userArticles = this.articles[userId] ?? {};
        return Object.values(userArticles);
    }

    validateUser(email: string, password: string): ValidUser | null {
        const user = this.users[email];
        if (user && user.password === password) {
            return {id: user.id, email: email} as ValidUser;
        }
        return null;
    }

    deletePinnedArticle(userId: string, articleId: string): void {
        const userArticles = this.articles[userId];
        if (!userArticles) return;

        // remove the article from the record
        delete userArticles[articleId];

        // if the record is now empty, remove the whole user entry
        if (Object.keys(userArticles).length === 0) {
            delete this.articles[userId];
        } else {
            this.articles[userId] = userArticles;
        }
    }

    savePinnedArticle(userId: string, article: ResponseArticle): void {
        const userArticles = this.articles[userId] ?? {};
        userArticles[article.id] = article;
        this.articles[userId] = userArticles;
    }
}

export default InMemoryDataStore;