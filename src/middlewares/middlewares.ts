import {NextFunction, Request} from "express";

export function logMe(req: Request, res: Response, next: NextFunction): void {
    console.log(req.body, req.originalUrl);
    next();
}
