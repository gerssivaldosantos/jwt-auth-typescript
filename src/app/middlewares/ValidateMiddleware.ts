import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
class ValidateMiddleware {
    async validateSyntax(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            let user = new (User);
            user.email = email;
            user.password = password;
            const errors = await validate(user);
            if (errors.length > 0) {
                return res.status(400).json({
                    error: "email or password is invalid",
                })
            }
            return next();
        }
        catch (err) {
            return res.status(500).json({
                error: "Internal server error"
            })
        }
    }

    async validateEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(User);
            const user = await repository.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const { is_validated } = user;
            
            if (!is_validated) {
                user.email_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                await repository.save(user);
                
                return res.status(400).json({
                    error: "email is not validated",
                    url: process.env.BASE_URL + "/validate_email/" + user.email_token
                })
            }

            return next();
        }

        catch (err) {
            return res.status(500).json({
                error: err
            })
        }
    }
}

export default new ValidateMiddleware();