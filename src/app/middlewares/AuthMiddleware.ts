import {Request, Response, NextFunction} from 'express';

class AuthMiddleware{
    check(req: Request, res: Response, next: NextFunction){
        
        if(req.headers.authorization){
            return next();
        }
        else{
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}

export default new AuthMiddleware();