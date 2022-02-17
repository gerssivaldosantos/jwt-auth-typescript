import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsEmail()
    @Column()
    email: string;

    @Length(6, 40)
    @Column({select: false})
    password: string;

    @Column()
    email_token: string;

    @Column()
    is_validated: boolean;
     
}

export default User;