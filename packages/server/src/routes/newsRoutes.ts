import express, {Router} from "express";
import {getNews} from "../controllers/newsController";

const router: Router = express.Router();

router.get("/", getNews);

export default router;