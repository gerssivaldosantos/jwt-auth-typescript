import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class AuthController {
    async authenticate(req: Request, res: Response) {
        const userRepo = getRepository(User);
        const { email, password } = req.body;
        const user = await userRepo.findOne({ where: { email } });

        if (!user) {
            {
                return res.status(401).json({ message: 'User not found' });
            }

        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword){
            return res.status(401).json({ message: 'Invalid password' });
        }
        


    }
}