import {Request, Response, NextFunction} from 'express';
import User from '../models/User';
import { validate } from 'class-validator';

class ValidateMiddleware {
    async validateSyntax(req: Request, res: Response, next: NextFunction) {
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
}

export default new ValidateMiddleware();