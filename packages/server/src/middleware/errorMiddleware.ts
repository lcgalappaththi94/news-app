import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404);
    next(new Error(`Not Found - ${req.originalUrl}`));
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
