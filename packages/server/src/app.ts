import 'dotenv/config';
import express, {json, urlencoded} from 'express';
import cors from 'cors';
import {notFound, errorHandler} from './middleware/errorMiddleware';
import apiRoutes from './routes/index';
import {createContext} from "./context";

const app = express();

// Create and attach application context
app.locals.ctx = createContext();

// Cross-origin resource sharing
// Allows http://localhost:5173/ for frontend development
app.use(cors({origin: 'http://localhost:5173'}));

// Body parser
app.use(json());
app.use(urlencoded({extended: true}));

// Routes
app.use('/api', apiRoutes);

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

const port = process.env.APP_PORT ?? 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});