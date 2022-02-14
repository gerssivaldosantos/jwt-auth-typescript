import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    email: string;
    @Column()
    password: string;
     
}

export default User;