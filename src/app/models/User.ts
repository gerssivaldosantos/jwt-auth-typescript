import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator'
import bcrypt from 'bcryptjs';
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

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
     
}

export default User;