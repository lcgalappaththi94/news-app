import {AppContext} from "../context";

declare global {
    namespace Express {
        interface Request {
            user?: ValidUser;
        }

        interface Application {
            locals: {
                ctx: AppContext;
            };
        }
    }
}