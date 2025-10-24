import {Response, Request, NextFunction} from 'express';


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] ?? '';

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.set('WWW-Authenticate', 'Bearer realm="protected area"');
        res.status(401).json({message: 'Authorization header missing'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = Buffer.from(token, 'base64').toString();
        const [email, password] = decoded.split(':');

        const user = req.app.locals.ctx.db.validateUser(email, password);

        if (user) {
            req.user = user;
            next();
        } else {
            res.set('WWW-Authenticate', 'Bearer realm="protected area"');
            res.status(401).json({message: 'Invalid credentials'});
        }
    } catch (error) {
        res.set('WWW-Authenticate', 'Bearer realm="protected area"');
        res.status(401).json({message: 'Invalid credentials format'});
    }
}
