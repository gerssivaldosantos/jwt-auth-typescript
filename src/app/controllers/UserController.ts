import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

class UserController {
    async store(req: Request, res: Response) {

        const { email, password } = req.body;

        const userRepo = getRepository(User);

        const userExists = await userRepo.findOne({ where: { email } });

        if (userExists) {
            return res.sendStatus(409);
        }

        const user = await userRepo.create({ email, password });

        await userRepo.save(user)

        return res.json(user);
    }
}

export default new UserController();