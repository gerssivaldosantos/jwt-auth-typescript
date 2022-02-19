import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import User from '../models/User';
import bcrypt from 'bcryptjs';

class UserController {

    async store(req: Request, res: Response) {

        let { email, password } = req.body;
        
        const email_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 

        const userRepo = getRepository(User);

        const userExists = await userRepo.findOne({ where: { email } });

        if (userExists) {
            return res.sendStatus(409);
        }
        password = bcrypt.hashSync(password, 8);

        const user = userRepo.create({ email, password, email_token });

        await userRepo.save(user)

        return res.json(user.id);
    }

    async getAll(req: Request, res: Response) {

        const userRepo = getRepository(User);

        const users = await userRepo.find();

        return res.json(users)
    }

    async update(req: Request, res: Response) {
        const userRepo = getRepository(User);
        const { id } = req.params;
        const { email, password } = req.body;
        const user = await userRepo.findOne(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.email = email;
        user.password = bcrypt.hashSync(password, 8);
        
        try {
            await userRepo.save(user);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }

        return res.json(user);


    }

    async delete(req: Request, res: Response) {
        const userRepo = getRepository(User);
        const { id } = req.params;
        const user = await userRepo.findOne(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        try {
            await userRepo.remove(user);
            return res.status(200).json({ message: 'User deleted' });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }


}

export default new UserController();