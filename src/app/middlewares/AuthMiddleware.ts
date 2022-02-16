import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload{
    id: string;
    iat: number;
    exp: number;
}
class AuthMiddleware{
    
    formatToken(token: string){
        return token.replace('Bearer ', '').trim();
    }

    check(req: Request, res: Response, next: NextFunction){

        const { authorization } = req.headers;

        try{
            if(!authorization){
                return res.status(401).json({
                    error: 'Token not provided'
                })
            }

            const secret = process.env.JWT_SECRET_KEY?? "";
            const token = this.formatToken(authorization);
            const data = jwt.verify(token,secret);
            const {id, iat, exp} = data as TokenPayload;
            return next();
        }
       
        catch(err){
            return res.status(401).json({
                error: err
            })
        }
    }
}

export default new AuthMiddleware();