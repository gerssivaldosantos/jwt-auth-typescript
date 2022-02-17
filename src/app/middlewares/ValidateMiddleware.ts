import {Request, Response, NextFunction} from 'express';
import User from '../models/User';
import { validate } from 'class-validator';

class ValidateMiddleware {
    async validateSyntax(req: Request, res: Response, next: NextFunction) {
        try{
            const { email, password } = req.body;
            let user = new(User);
            user.email = email;
            user.password = password;
            const errors = await validate(user);
            if (errors.length > 0) {
                return res.status(400).json({
                    error:"email or password is invalid",
                })
            }
            return next();
        }
        catch(err){
            return res.status(500).json({
                error: "Internal server error"
            })
        }
    }
}

export default new ValidateMiddleware();