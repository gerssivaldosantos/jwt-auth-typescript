import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken'
class AuthController {
    async authenticate(req: Request, res: Response) {
        const userRepo = getRepository(User);
        const { email, password } = req.body;
        const user = await userRepo.
        createQueryBuilder('user').
        select().
        addSelect("user.password").
        where("user.email = :email", { email }).
        getOne();

        
        if (!user) {
            {
                return res.status(401).json({ message: 'User not found' });
            }

        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const secret = 'secret';

        const token = jwt.sign({ id: user.id }, secret , { expiresIn: '1d' })

        return res.json({
            user,
            token
        });


    }
}


export default new AuthController()